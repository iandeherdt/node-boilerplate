const express = require('express');
const router = express.Router();
const knex = require('../db/connection');
const Boom = require('boom');
const authHelpers = require('../auth/_helpers');
const mapUser = require('../mappers/map-user');
const emailService = require('../utils/emailService');
const jwt = require('jsonwebtoken');
router.get('/admin', authHelpers.validateToken, authHelpers.adminRequired, (req, res) => {
  res.json({status: 'success'});
});

router.get('/:id', authHelpers.validateToken, (req, res, done) => {
  if(!req.params.id){
    return done(Boom.badRequest('no id supplied'));
  } else {
    knex('users')
      .where({ id: Number(req.params.id) })
      .first()
      .then((user) => {
        if(user){
          return res.json(user);
        } else {
          return done(Boom.notFound('user not found'));
        }
      })
      .catch((err) => {
        return done(err);
      });
  }
});

router.get('/', authHelpers.validateToken, (req, res) => {
  res.json({status: 'success'});
});

router.put('/:id', (req, res, done) => {
  if(!req.params.id){
    return done(Boom.badRequest('no id supplied'));
  } else {
    //TODO check security
    return knex('users').where('id', Number(req.params.id)).first().then((row) => {
      const newUser = Object.assign({}, row, mapUser(req.body));
      return knex('users')
        .where({ id: Number(req.params.id) })
        .update(newUser)
        .update('updated_at', knex.fn.now())
        .then((result) => {
          return res.json(`updated ${result} rows`);
        });
    }).catch(done);
  }
});

router.post('/', (req, res, next) => {
  return authHelpers.createUser(req, res, next)
    .then(() => {
      const token = jwt.sign({username: req.body.username}, process.env.JWT_SECRET, { expiresIn: '12h' });
      return emailService.send({
        from:'ian.de.herdt@telenet.be',
        to: req.body.username,
        subject:'Activate your account',
        html: `<span>follow this link to activate your account: ${process.env.SERVICE_URL}activateaccount?token=${token}</span>`
      }, req, res, next);
    })
    .catch(next);
});

module.exports = router;