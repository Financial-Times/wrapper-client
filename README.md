About
-----

This is a reference web app which grabs an FT wrapper and populates it with third party content and renders the result in a web browser.

It uses the `ft-node-modules/wrapper` and `ft-node-modules/logger` modules available at `https://github.com/Financial-Times/ft-node-modules`.

It also does some cool stuff like:
 - clustering the web workers up to the available CPUS - this also works on Heroku as each Dyno has 4 cores,
 - provides and API to retrieve and process wrappers using Swagger API (coming soon)
 - uses Dot templating with some regex config changes to process the `<!--ft.code.variable-->` style FT wrapper variables

This app is also deployed to Heroku `http://wrapper-client.herokuapp.com/wrapper/ftalphaville` and uses:
 - Nodefly for realtime monitoring `heroku addons:open nodefly`
 - Nodetime for process monitoring `heroku addons:open nodetime`
 - Loggly for logging `https://financialtimes.loggly.com/`
 - Blitz for load testing `heroku addons:open blitz`
 - Loader.io for load testing `heroku addons:open loaderio`


Running
-------
    npm install
    `node app.js` or `foreman start`

Usage
-----
Check the app is up and running
    http://localhost:5000

Request a wrapper (in this case `ftalphaville`) and process it
    http://localhost:5000/wrapper/ftalphaville

Note the data used to populate the wrapper in this example app comes from `model.js`. In the real-world, your app will need to populate the model with your content.

Todo
----
Wrapper validation
404 on wrapper
Tests
ft.com subdomain (for cookies)
Swagger api


