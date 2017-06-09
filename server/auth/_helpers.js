const bcrypt = require('bcryptjs');
const knex = require('../db/connection');
const passport = require('passport');
const Boom = require('boom');
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createUser (req) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return knex('users')
  .insert({
    username: req.body.username,
    password: hash,
    name: req.body.name,
    email: req.body.email
  })
  .returning('*');
}

function validateToken(req, res, next) {
  passport.authenticate('bearer',
    function(err, user) {
      if(err){
        return next(Boom.badImplementation(err));
      }
      if (user) {
        req.user = user;
        return next();
      } else {
        return next(Boom.unauthorized('Please log in.'));
      }
    })(req, res, next);
}

function adminRequired(req, res, next) {
  if (!req.user) {
    return next(Boom.unauthorized('Please log in.'));
  }
  return knex('users').where({username: req.user.username}).first()
  .then((user) => {
    if (!user.admin){
      return next(Boom.unauthorized('You are not authorized.'));
    }
    return next();
  })
  .catch(next);
}

module.exports = {
  comparePass,
  createUser,
  validateToken,
  adminRequired
};