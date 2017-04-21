const bcrypt = require('bcryptjs');
const knex = require('../db/connection');
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createUser (req) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return knex('users')
  .insert({
    username: req.body.username,
    password: hash
  })
  .returning('*');
}

function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({status: 'Please log in'});
  return next();
}

function adminRequired(req, res, next) {
  if (!req.user) {
    res.status(401).json({status: 'Please log in'});
    return;
  };
  return knex('users').where({username: req.user.username}).first()
  .then((user) => {
    if (!user.admin){
      res.status(401).json({status: 'You are not authorized'});
      return;
    }
    return next();
  })
  .catch((err) => {
    res.status(500).json({status: 'Something bad happened'});
    return;
  });
}

module.exports = {
  comparePass,
  createUser,
  loginRequired,
  adminRequired
};