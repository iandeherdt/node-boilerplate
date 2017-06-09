const path = require('path');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const routeConfig = require('./server/config/route-config.js');
const app = express();
// *** load environment variables *** //
require('dotenv').config();
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 4000 : process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use(express.static(__dirname + '/dist'));

routeConfig.init(app);
app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
app.use(require('./server/utils/errorHandler'));
app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

module.exports = app;