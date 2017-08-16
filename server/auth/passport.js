const passport = require('passport');
const knex = require('../db/connection');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((id, done) => {
    //temp fix until i know what is going on.
    if(id && id.id){
      id = id.id;
    }
    knex('users').where({id}).first()
      .then((user) => {
        done(null, user);
      })
      .catch(done);
  });
};