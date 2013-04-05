About
-----

This is a reference web app which grabs an FT wrapper and populates it with third party content and renders the result in a web browser.

It uses the `ft-node-modules/wrapper` and `ft-node-modules/logger` modules available at https://github.com/Financial-Times/ft-node-modules.

It also does some cool stuff like:
 - clustering the web workers up to the available CPUs - this also works on Heroku as each Dyno has 4 cores,
 - provides an API to retrieve and process wrappers using Swagger API (coming soon)
 - uses doT templating with some regex config changes to easily process the `<!--ft.code.variable-->` style FT wrapper variables

This app is also deployed to Heroku http://wrapper-client.herokuapp.com (e.g. http://wrapper-client.herokuapp.com/wrapper/ftalphaville) and uses:
 - Nodefly for realtime monitoring `heroku addons:open nodefly`
 - Nodetime for process monitoring `heroku addons:open nodetime`
 - Loggly for logging `heroku addons:open loggly` or https://financialtimes.loggly.com/
 - Blitz for load testing `heroku addons:open blitz`
 - Loader.io for load testing `heroku addons:open loaderio`

Use cases
---------
You are a known FT third-party supplier of content and you have been set up with one of more wrappers provided by the FT.
You will have been given a url for each wrapper that serves the raw wrapper with placeholder variables for you to insert your content.
By cloning this app and deploying it to your servers, you will be able to create

Running
-------
    npm install
    node app.js

Usage
-----
Use the API to make requests

    http://localhost:5000/docs


Todo
----
Wrapper validation
Force wrapper refresh
404 on wrapper
Tests
ft.com subdomain (for cookies)

Heroku Load testing
-------------------
On one dyno, with a clustered web node, this app bombs out at about 3200 concurrent requests (http://ldr.io/13pSYJt)
 - H11 (backlog too deep) errors occur with one dyno https://devcenter.heroku.com/articles/http-routing
 - R14 (memory quote exceeded) errors also occur.

The effect of this is that the web becomes unresponsive until the backlog clears or the Dynos are restarted by Heroku.

Scaling up the web processes prior to hitting load alleviates this.  During load it doesn't seem to do much.


