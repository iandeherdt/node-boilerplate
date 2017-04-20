const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/_helpers');
const passport = require('../auth/local');

router.post('/register', (req, res, next)  => {
  return authHelpers.createUser(req, res)
  .then((response) => {
    passport.authenticate('local', (err, user, info) => {
      if (user) { handleResponse(res, 200, 'success'); }
    })(req, res, next);
  })
  .catch((err) => { handleResponse(res, 500, 'error'); });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { console.log(err); return handleResponse(res, 500, 'error'); }
    if (!user) { return handleResponse(res, 404, 'User not found'); }
    if (user) {
      req.logIn(user, function (err) {
        if (err) { console.log(err); return handleResponse(res, 500, 'error'); }
        return handleResponse(res, 200, 'success');
      });
    }
  })(req, res, next);
});

function handleResponse(res, code, statusMsg) {
  return res.status(code).json({status: statusMsg});
}

module.exports = router;