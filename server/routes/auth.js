const express = require('express');
const router = express.Router();
const config = require('../config/config');
const authHelpers = require('../auth/_helpers');
const passport = require('../auth/local');
const jwt = require('jwt-simple');

router.post('/register', (req, res, next)  => {
  return authHelpers.createUser(req, res)
  .then((response) => {
    passport.authenticate('local', (err, user, info) => {
      if (user) {
        var token = jwt.encode(user, config.jwtSecret);
        res.json({ token });
      }else {
        handleResponse(res, 404, 'User not found');
      }
    })(req, res, next);
  })
  .catch((err) => { 
    handleResponse(res, 500, 'error'); 
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      handleResponse(res, 500, 'error');
      return;
    }
    if (!user) { 
      handleResponse(res, 404, 'User not found');
      return;
    }
    if (user) {
      req.logIn(user, function (err) {
        if (err) { 
          handleResponse(res, 500, 'error');
          return;
        }
        var token = jwt.encode(user, config.jwtSecret);
        res.json({ token });
        return;
      });
    }
  })(req, res, next);

  router.get('/logout', authHelpers.loginRequired, (req, res, next) => {
    req.logout();
    handleResponse(res, 200, 'success');
    return;
  });
});

function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

module.exports = router;