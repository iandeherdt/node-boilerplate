const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const authHelpers = require('./auth.service');
const init = require('./passport');
const knex = require('../db/connection');
const jwt = require('jsonwebtoken');
const options = {};
const Boom = require('boom');
init();

passport.use(new LocalStrategy(options, (username, password, done) => {
  knex('users').where({ username }).first()
    .then((user) => {
      if (!user){
        return done(Boom.notFound('User not found'), false);
      }
      if (!authHelpers.comparePass(password, user.password)) {
        return done(Boom.badRequest('Incorrect password'), false);
      } else {
        return done(null, user);
      }
    })
    .catch(done);
}));

passport.use(new BearerStrategy((token, done) => {
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
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
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `${process.env.SERVICE_URL}/auth/login/facebook/callback`
},
function(accessToken, refreshToken, profile, done) {
  knex('users').where({ facebookId: profile.id }).first()
    .then((user) => {
      if (!user){
        const facebookUser = {
          facebookId: profile.id,
          name: profile.displayName,
        };
        knex('users').insert(facebookUser)
          .then(function (id) {
            const newUser = Object.assign({}, facebookUser, {id});
            return done(null, newUser);
          }).catch(done);
      } else {
        return done(null, user);
      }
    }).catch(done);
}
));


module.exports = passport;