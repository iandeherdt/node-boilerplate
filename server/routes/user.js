const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/_helpers');

router.get('/user', authHelpers.validateToken, (req, res) => {
  res.json({status: 'success'});
});

router.get('/admin', authHelpers.adminRequired, (req, res) => {
  res.json({status: 'success'});
});

module.exports = router;