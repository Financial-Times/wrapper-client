var request = require("request"),
    doT = require("dot");

// have to specify all settings otherwise strip doesn't work
doT.templateSettings = {
    evaluate: /\{\{([\s\S]+?)\}\}/g,
    //interpolate: /\{\{=([\s\S]+?)\}\}/g,
    interpolate: /<!--(ft\.[\s\S]+?)-->/g,
    encode: /\{\{!([\s\S]+?)\}\}/g,
    use: /\{\{#([\s\S]+?)\}\}/g,
    define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
    conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
    iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
    varname: 'ft',
    strip: false,
    append: true,
    selfcontained: false
};

var cache = {};


exports.fetch = function (wrapperId, callback) {

    var root = "http://www.ft.com/thirdpartywrapper/",
        url = root + wrapperId,
        cachedHtml = cache[wrapperId];


    if (!cachedHtml) {
        console.log("Fetching wrapper", url);
        request(url, function (err, response, body) {
            //if (!error && response.statusCode == 200) {

            // cache wrapper
            cache[wrapperId] = body;

            process.nextTick(function () {
                callback(err, body);
            });
            //}
        });
    } else {
        process.nextTick(function () {
            callback(null, cache[wrapperId]);
        });
    }

};


exports.process = function (wrapperHtml, model) {

    wrapperHtml = wrapperHtml.replace(/<!--ft-replace:/g, "<!--ft."); // legacy
    wrapperHtml = wrapperHtml.replace(/<!--ft:/g, "<!--ft."); // convert "ft:" to object notation "ft."
    wrapperHtml = wrapperHtml.replace(/(<!--.*):(.*-->)/g, RegExp.$1 + "." + RegExp.$2); // handle : in variable names

    var tempFn = doT.template(wrapperHtml),
        result = tempFn(model);

    return result;

}
