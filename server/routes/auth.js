const express = require('express');
const router = express.Router();
const config = require('../config/config');
const authHelpers = require('../auth/_helpers');
const passport = require('../auth/strategies');
const jwt = require('jsonwebtoken');
const Boom = require('Boom');
function createTokenInfo(user){
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    facebookId: user.facebookId,
    googleId: user.googleId
  };
}
router.post('/register', (req, res, next) => {
  return authHelpers.createUser(req, res)
  .then(() => {
    passport.authenticate('local', (err, user) => {
      if (user) {
        const userInfo = createTokenInfo(user);
        const token = jwt.sign(userInfo, config.jwtSecret);
        res.json({ token, user: userInfo });
      }else {
        return next(Boom.notFound('User not found'));
      }
    })(req, res, next);
  })
  .catch(next);
});

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
    res.redirect(`/authComplete?token=${token}&user=${req.user.name}&registered=${!!req.user.registered}`);
  }
);

module.exports = router;