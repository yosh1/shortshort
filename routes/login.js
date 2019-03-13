'use strict';

const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

router.get('/', csrfProtection, (req, res, next) => {
  const from = req.query.from;
  if (from) {
    res.cookie('loginFrom', from, { expires: new Date(Date.now() + 600000) });
  }
  res.render('login', {
    csrfToken: req.csrfToken()
  });
});

module.exports = router;