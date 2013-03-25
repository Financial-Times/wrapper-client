// Add Nodefly real time process monitoring
require('nodefly').profile(
    process.env.NODEFLY_APPLICATION_KEY,
    [process.env.APPLICATION_NAME, 'Heroku']
);

// Add NodeTime process monitoring
if (process.env.NODETIME_ACCOUNT_KEY) {
    require('nodetime').profile({
        accountKey: process.env.NODETIME_ACCOUNT_KEY,
        appName: 'Wrapper client' // optional
    });
}

// Create a cluster of processes based on the available cores.
// Note, Heroku has 4 cores per Dyno, so these can be utilised (up to the memory limits)
// See load reports http://ldr.io/13pQRVX - one CPU and http://ldr.io/13pSYJt - four CPUs using cluster
var cluster = require("cluster"),
    numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; ++i)
        cluster.fork();
} else {
    var express = require("express"),

        // require the FT logging module
        logger = require("ft-node-modules/logger").init({
            loggly: {
                logglyKey: "28e914ff-2027-43ca-b1d5-d9624dbe8e49",
                logglyDomain: "financialtimes",
                logLevel: "info"
            }
        }),

        // require the FT wrapper module
        wrapper = require("ft-node-modules/wrapper"),
        model = require("./model"),

        // templating framework to process wrapper into HTML
        dot = require("express-dot");

    //dot.setGlobals({
    //    // global configuration
    //    // default is false, set true in production environment to cache partials
    //    partialCache: false,
    //    layout: false
    //});

    var app = express();

    app.configure(function () {
        // set views folder
        app.set('views', __dirname + '/views');

        // doT engine
        app.set('view engine', 'dot');
        app.engine('dot', dot.__express);

        app.use(express.logger());
        app.use(express.compress());
        app.use(express.methodOverride());

        app.use(express.static('public'))

    });

    /**
     * Validate parameters
     * http://expressjs.com/api.html#app.param
     */
    app.param(function (name, fn) {
        if (fn instanceof RegExp) {
            return function (req, res, next, val) {
                var captures;
                if (captures = fn.exec(String(val))) {
                    req.params[name] = captures;
                    next();
                } else {
                    next('route');
                }
            }
        }
    });

    app.param("uuid", /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(\.html)?$/);

    app.get("/cms/s/:uuid", function (req, res) {
        res.send("UUID: " + req.params.uuid);
    });

    app.param("id", /^[a-z0-9]+$/);
    app.get('/wrapper/:id', function (request, response) {
        var wrapperId = request.params.id,
            result;

        wrapper.fetch(wrapperId, function (err, html) {
            console.info("Fetched " + request.params.id);
            result = wrapper.process(html, model.populate());
            response.send(result);
        });
    });

    app.get('/', function (request, response) {
        //response.send("Wrapper client running");
        response.render("index", {});
    });

    var port = process.env.PORT || 5000;
    app.listen(port, function () {
        console.info("Listening on " + port);
    });
}