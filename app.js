var express = require('express');
var stormpath = require('express-stormpath');

var app = express();

//console.log("1");

app.set('views', './views');
app.set('view engine', 'jade');

var stormpathMiddleware = stormpath.init(app, {
  apiKeyFile: './apiKey.properties',
  application: 'https://api.stormpath.com/v1/applications/3fC3dUsIO4KFOO19CC9DgW',
  secretKey: 'some_long_random_string',
  expandCustomData: true,
  enableForgotPassword: true
});

app.use(stormpathMiddleware);

app.get('/', function(req, res) {
  res.render('home', {
    title: 'Welcome'
  });
});

//ubacujem dodatnu mini aplikaciju iz profile.js 
/* To je Express 4.0 funkcionalnost: 
A router is an isolated instance of middleware and routes.
Routers can be thought of as "mini" applications, capable only
of performing middleware and routing functions. Every express
application has a built-in app router.
*/
app.use('/profile',require('./profile')());

app.listen(process.env.PORT || 3000);