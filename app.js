var express = require("express"),
    wrapper = require("./wrapper");


var app = express();


app.get('/', function (request, response) {
    response.send("Wrapper client running");
});

app.get('/wrapper/:id', function (request, response) {
    var wrapperId = request.params.id,
        model = {
            headWrapperCss: "==============================headWrapperCss",
            mainContentWell: "==============================mainContentWell",
            rightRailContentWell: "==============================rightRailContentWell",
            footWrapperJs: "==============================footWrapperJs",
            codefoot: "==============================codefoot"
        },
        result;

    wrapper.fetch(wrapperId, function (err, html) {
        console.log("Fetched " + request.params.id);
        result = wrapper.process(html, model);
        response.send(result);
    });
});


var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Listening on " + port);
});
