const express = require('express');
const router = express.Router();
const knex = require('../db/connection');
const Boom = require('boom');
const authHelpers = require('../auth/_helpers');
const mapUser = require('../mappers/map-user');
router.get('/user/:id', authHelpers.validateToken, (req, res, done) => {
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

router.get('/user', authHelpers.validateToken, (req, res) => {
  res.json({status: 'success'});
});

router.get('/admin', authHelpers.adminRequired, (req, res) => {
  res.json({status: 'success'});
});

router.put('/user/:id', (req, res, done) => {
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

module.exports = router;