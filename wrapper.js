var request = require("request"),
    doT = require("dot"),
    ftUtils = require("ft-node-modules/lib/utils.js");

var cache = {},

    config = {
        wrapperRoot: "http://www.ft.com/thirdpartywrapper/",
        wrapperUpdateMs: 3600000 // 1 hr
    };

// The initialise the logger; merge default and passed config then setup the winston transports
exports.init = function (passedConfig) {
    "use strict";
    config = ftUtils.mergeConfig(config, passedConfig);
    console.info("[WRAPPER] Using config", config);
};

/**
 * Fetch a wrapper from FT.com.  This module handle caching of the wrapper and (TODO re-fetches it hourly).
 * @param wrapperId The wrapper id.  Follows the URL convention "http://www.ft.com/thirdpartywrapper/<wrapperid>" e.g. "http://www.ft.com/thirdpartywrapper/ftalphaville"
 * @param callback Passes the retrieved wrapper html back
 */
exports.fetch = function (wrapperId, callback) {

    var url = config.wrapperRoot + wrapperId,
        cachedHtml = cache[wrapperId];


    if (!cachedHtml) {
        console.info("[WRAPPER] Fetching", url);
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
        console.info("[WRAPPER] Using cached", wrapperId);
        process.nextTick(function () {
            callback(null, cache[wrapperId]);
        });
    }

};

exports.process = function (wrapperHtml, model) {

    //wrapperHtml = wrapperHtml.replace(/<!--ft-replace:/g, "<!--ft."); // legacy
    //wrapperHtml = wrapperHtml.replace(/<!--ft:/g, "<!--ft."); // convert "ft:" to object notation "ft."
    console.info("[WRAPPER] Processing");

    wrapperHtml = wrapperHtml.replace(/(<!--.*):(.*-->)/g, "$1.$2"); // handle : in variable names

    var tempFn = doT.template(wrapperHtml, {
            interpolate: /<!--(ft\.[\s\S]+?)-->/g,
            varname: 'ft'
        }),
        result = tempFn(model);

    return result;

}
