const bcrypt = require('bcryptjs');
const knex = require('../db/connection');
const passport = require('passport');
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
        return next(err);
      }
      if (user) {
        req.user = user;
        return next();
      } else {
        return res.status(401).json({ status: 'Please log in', code: 'unauthorized' });
      }
    })(req, res, next);
}

function adminRequired(req, res, next) {
  if (!req.user) {
    return res.status(401).json({status: 'Please log in'});
  }
  return knex('users').where({username: req.user.username}).first()
  .then((user) => {
    if (!user.admin){
      return res.status(401).json({status: 'You are not authorized'});
    }
    return next();
  })
  .catch(() => {
    return res.status(500).json({status: 'Something bad happened'});
  });
}

module.exports = {
  comparePass,
  createUser,
  validateToken,
  adminRequired
};