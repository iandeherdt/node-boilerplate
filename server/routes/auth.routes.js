const express = require('express');
const router = express.Router();
const authHelpers = require('../auth/auth.helpers');
const passport = require('../auth/strategies');
const jwt = require('jsonwebtoken');
const Boom = require('boom');
const createTokenInfo = require('../utils/createTokenInfo');

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(Boom.notFound('The supplied credentials are invalid.'));
    }
    if (user) {
      const userInfo = createTokenInfo(user);
      const token = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '12h' });
      return res.json({ token, user: userInfo });
    }
  })(req, res, next);
});

router.get('/login/facebook', passport.authenticate('facebook'));

router.get('/login/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    const userInfo = createTokenInfo(req.user);
    const token = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '12h' });
    // Successful authentication, redirect to success page to pass token.
    res.redirect(`/authComplete?token=${token}&id=${req.user.id}&user=${req.user.name}&registered=${!!req.user.registered}`);
  }
);

router.post('/password/forgot', authHelpers.forgotPassword);

router.put('/password/reset', authHelpers.resetPassword);

router.put('/account/activate', authHelpers.activateAccount);

module.exports = router;