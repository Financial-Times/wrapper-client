About
-----

This is a reference web app which grabs an FT wrapper and populates it with third party content and renders the result in a web browser.

It uses the `ft-node-modules/wrapper` and `ft-node-modules/logger` modules available at `https://github.com/Financial-Times/ft-node-modules`.

It also does some cool stuff like:
 - clustering the web workers up to the available CPUs - this also works on Heroku as each Dyno has 4 cores,
 - provides and API to retrieve and process wrappers using Swagger API (coming soon)
 - uses doT templating with some regex config changes to easily process the `<!--ft.code.variable-->` style FT wrapper variables

This app is also deployed to Heroku `http://wrapper-client.herokuapp.com/wrapper/ftalphaville` and uses:
 - Nodefly for realtime monitoring `heroku addons:open nodefly`
 - Nodetime for process monitoring `heroku addons:open nodetime`
 - Loggly for logging `https://financialtimes.loggly.com/`
 - Blitz for load testing `heroku addons:open blitz`
 - Loader.io for load testing `heroku addons:open loaderio`


Running
-------
    npm install
    node app.js

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

Heroku Load testing
-------------------
On one dyno, with a clustered web node, this app bombs out at about 3200 concurrent requests (`http://ldr.io/13pSYJt`)
H11 (backlog too deep) errors occur with one dyno https://devcenter.heroku.com/articles/http-routing
R14 (memory quote exceeded) errors also occur.

The effect of this is that the web becomes unresponsive until the backlog clears or the Dynos are restarted by Heroku.

Scaling up the web processes prior to hitting load alleviates this.  During load it doesn't seem to do much.


