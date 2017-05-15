const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const authHelpers = require('./_helpers');
const config = require('../config/config');
const init = require('./passport');
const knex = require('../db/connection');
const jwt = require('jsonwebtoken');
const options = {};

init();

passport.use(new LocalStrategy(options, (username, password, done) => {
  knex('users').where({ username }).first()
    .then((user) => {
      if (!user){
        return done(null, false);
      } 
      if (!authHelpers.comparePass(password, user.password)) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    })
    .catch(done);
}));

passport.use(new BearerStrategy((token, done) => {
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return done(err);
    }
    knex('users').where({ username: decoded.username }).first()
      .then((user) => {
      if (!user){
        return done(null, false);
      } else {
        return done(null, user);
      }
    })
    .catch(done);
  });
}));


module.exports = passport;