const bcrypt = require('bcryptjs');
const knex = require('../db/connection');
const passport = require('passport');
const Boom = require('boom');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const moment = require('moment');
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

function resetPassword(req, res, next){
  const sessionid = req.params.id;

}

function forgotPassword(req, res, next){
  const email = req.body.email;
  if (!email) {
    return next(Boom.badRequest('No email supplied'));
  }
  return knex('users').where({email: email}).first()
    .then((user) => {
      if (!user){
        return next(Boom.notFound('Email not found.'));
      }
      crypto.randomBytes(48, function(err, buffer) {
        if(err){
          next(err);
        }
        const resetid = buffer.toString('hex');
        return knex('users').where({email: email})
          .update('resetid', resetid)
          .update('resetexpiration', moment().add(1, 'hour').format("YYYY-MM-DD HH:mm:ss"))
          .then((result) => {
            return sendEmail({
              from:'ian.de.herdt@telenet.be',
              to:'ian.deherdt@gmail.com',
              subject:'Reset your password',
              html: `<span>follow this link to reset your password: http://localhost:4000/auth/password/reset?id=${resetid}</span>`
            }, next);
          });
      });
      
    })
    .catch(next);
}


module.exports = {
  comparePass,
  createUser,
  validateToken,
  adminRequired,
  forgotPassword,
  resetPassword
};