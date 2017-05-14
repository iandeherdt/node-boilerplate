const express = require('express');
const router = express.Router();
const config = require('../config/config');
const authHelpers = require('../auth/_helpers');
const passport = require('../auth/local');
const jwt = require('jwt-simple');

function createTokenInfo(user){
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email 
  }
}
router.post('/register', (req, res, next)  => {
  return authHelpers.createUser(req, res)
  .then((response) => {
    passport.authenticate('local', (err, user, info) => {
      if (user) {
        const userInfo = createTokenInfo(user);
        const token = jwt.encode(userInfo, config.jwtSecret);
        res.json({ token, user: userInfo });
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
      return handleResponse(res, 500, 'error');
    }
    if (!user) { 
      return handleResponse(res, 404, 'User not found');
    }
    if (user) {
      req.logIn(user, function (err) {
        if (err) { 
          return handleResponse(res, 500, 'error');
        }
        const userInfo = createTokenInfo(user);
        const token = jwt.encode(userInfo, config.jwtSecret);
        return res.json({ token, user: userInfo });
      });
    }
  })(req, res, next);
});

router.get('/logout', authHelpers.loginRequired, (req, res, next) => {
  req.logout();
  return res.json({status: 'success'})
});

function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

module.exports = router;