const express = require('express');
const router = express.Router();
const knex = require('../db/connection');
const Boom = require('boom');
const authHelpers = require('../auth/_helpers');

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
    knex('users')
      .where({ id: Number(req.params.id) })
      //.orWhere({ facebookId: req.body.id })
      .update(req.body)
      .then((result) => {
        return res.json(`updated ${result} rows`);
      })
      .catch(done);
   
  }
});

module.exports = router;