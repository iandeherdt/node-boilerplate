const express = require('express');
const router = express.Router();
const config = require('../config/config');
const authHelpers = require('../auth/_helpers');
const passport = require('../auth/strategies');
const jwt = require('jsonwebtoken');
const Boom = require('Boom');
const createTokenInfo = require('../utils/createTokenInfo');
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(Boom.badImplementation());
    }
    if (!user) {
      return next(Boom.notFound('User not found'));
    }
    if (user) {
      const userInfo = createTokenInfo(user);
      const token = jwt.sign(userInfo, config.jwtSecret);
      return res.json({ token, user: userInfo });
    }
  })(req, res, next);
});

router.get('/logout', authHelpers.validateToken, (req, res, next) => {//eslint-disable-line
  req.logout();
  return res.json({status: 'success'});
});

router.get('/login/facebook', passport.authenticate('facebook'));

router.get('/login/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    const userInfo = createTokenInfo(req.user);
    const token = jwt.sign(userInfo, config.jwtSecret);
    // Successful authentication, redirect to success page to pass token.
    res.redirect(`/authComplete?token=${token}&id=${req.user.id}&user=${req.user.name}&registered=${!!req.user.registered}`);
  }
);

router.post('/password/forgot', authHelpers.forgotPassword);

router.post('/password/reset', authHelpers.resetPassword);

module.exports = router;