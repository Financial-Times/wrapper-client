About
-----

This is a reference web app which grabs an FT wrapper and populates it with third party content and renders the result in a web browser.

It uses the `ft-node-modules/wrapper` and `ft-node-modules/logger` modules available at https://github.com/Financial-Times/ft-node-modules.

It also does some cool stuff like:
 - clustering the web workers up to the available CPUs - this also works on Heroku as each Dyno has 4 cores,
 - provides an API-first approach to retrieve and process wrappers using Swagger API
 - uses doT templating with some regex config changes to easily process the `<!--ft.code.variable-->` style FT wrapper variables

This app is also deployed to Heroku http://wrapper-client.herokuapp.com/docs and uses:
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

There are two endpoints
 - GET a wrapper
 - POST a JSON model (see `api/sampleData.js`) to a wrapper and get the resulting HTML

Sample CURL request to process a wrapper with a model
------
    curl "http://wrapper-client.herokuapp.com/page/code-sample?api_key=dev" -H "Content-Type: application/json" --data-binary "{\"headWrapperCss\":\"\",\"footWrapperJs\":\"\",\"code\":{\"metaTitle\":\"<title>Wrapper page title BLAH BLAH</title>\",\"metaDescription\":\"A wrapper page blah blah\",\"metaKeywords\":\"keyword1 keyword2\",\"css\":\"<style type='text/css'>.mystyle {background-color:pink;}</style>\",\"js\":\"<script>console.log('My head script')</script>\",\"head\":\"\",\"meta\":\"<meta name='other1' content='value1'/><meta name='other2' content='value2'/>\",\"foot\":\"<script>console.log('My foot script')</script>\",\"dfpSiteName\":\"dfpSiteName\",\"dfpZoneName\":\"dfpSiteName\"},\"content\":{\"contentWell\":\"<div><p class='mystyle'>Main content well</p></div>\",\"rightRailContentWell\":\"<div><p>Right hand content well</p></div>\",\"secondColumn\":\"<div><p>Second column content well</p></div>\",\"header\":\"<header>This is the header</header>\",\"wide\":\"wide\",\"navigation\":\"<nav>This is the navigation</nav>\"}}"


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


