require('nodefly').profile(
    process.env.NODEFLY_APPLICATION_KEY,
    [process.env.APPLICATION_NAME,'wrapper-client']
);

var express = require("express"),
    logger = require("ft-node-modules/logger").init({
        loggly: {
            logglyKey: "28e914ff-2027-43ca-b1d5-d9624dbe8e49",
            logglyDomain: "financialtimes",
            logLevel: "info"
        }
    }),
    wrapper = require("ft-node-modules/wrapper"),
    model = require("./model");

var app = express();


app.get('/', function (request, response) {
    response.send("Wrapper client running");
});

app.get('/wrapper/:id', function (request, response) {
    var wrapperId = request.params.id,
        result;

    wrapper.fetch(wrapperId, function (err, html) {
        console.info("Fetched " + request.params.id);
        result = wrapper.process(html, model.populate());
        response.send(result);
    });
});


var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.info("Listening on " + port);
});
