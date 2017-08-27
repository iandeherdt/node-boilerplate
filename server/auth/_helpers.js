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

function createUser (req, res, next) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return knex('users').where({username: req.body.username}).first().then((user) => {
    if (user){
      return next(Boom.badRequest('Cannot insert duplicate user.'));
    } else {
      return knex('users')
        .insert({
          username: req.body.username,
          password: hash,
          name: req.body.name,
          email: req.body.email,
          firstname: req.body.firstname,
          admin: req.body.admin,
          street: req.body.street,
          house: req.body.house,
          bus: req.body.bus,
          postal: req.body.postal,
          city: req.body.city,
          country: req.body.country,
        })
        .returning('*');
    }
  });
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
  const resettoken = req.query.token;
  if (!resettoken) {
    return next(Boom.badRequest('No reset token provided.'));
  }
  knex('users').where({resetid: resettoken}).first()
    .then((user) => {
      if (!user){
        return next(Boom.notFound('Reset token not valid.'));
      }
      const expiration = moment(user.resetexpiration);
      if(moment().isAfter(expiration)){
        return next(Boom.badRequest('Reset token expired'));
      } else if(req.body.password === req.body.confirmpassword){
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(req.body.password, salt);
        knex('users').where({id: user.id})
          .update('password', hash)
          .then(res.end);
      }
    });
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
        const resettoken = buffer.toString('hex');
        return knex('users').where({email: email})
          .update('resetid', resettoken)
          .update('resetexpiration', moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'))
          .then(() => {
            return sendEmail({
              from:'ian.de.herdt@telenet.be',
              to:'ian.deherdt@gmail.com',
              subject:'Reset your password',
              html: `<span>follow this link to reset your password: http://localhost:4000/resetpassword?token=${resettoken}</span>`
            }, req, res, next);
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