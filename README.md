About
-----

This is a reference web app which grabs an FT wrapper and populates it with third party content and renders the result in a web browser.

Note, this app is also deployed to Heroku and uses
 - Nodefly for monitoring `heroku addons:open nodefly`
 - Loggly for logging `https://financialtimes.loggly.com/`
 - Blitz for load testing


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

Note the data used to populate the wrapper in this example app comes from `model.js`

Heroku
------
    http://wrapper-client.herokuapp.com/wrapper/ftalphaville


Todo
----
Wrapper validation
404 on wrapper
Tests
ft.com subdomain (for cookies)


