const path = require('path');
const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const routeConfig = require('./server/config/route-config.js');
const app = express();
// *** load environment variables *** //
require('dotenv').config();
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 4000 : process.env.PORT;
// *** app middleware *** //
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// uncomment if using express-session
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/dist'));

routeConfig.init(app);
app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
const server = app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

module.exports = app;