'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const uuid = require('uuid');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

router.get('/', csrfProtection, (req, res, next) => {
  res.render('register', {
    message: "no message",
    csrfToken: req.csrfToken()
  });
});

router.post('/', csrfProtection, (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  var message = "";
  User.findOne({
    where: { password: password }
  }).then((user) => {
    if (user) {
      message = "そのパスワードはすでに使われています";
      res.render('register', {
        message: message
      });
    } else {
      const userId = uuid.v4();
      const createdAt = new Date();
      User.create({
        userId: userId,
        username: username,
        password: password,
        createdAt: createdAt
      }).then((user) => {
        req.login(user, function(err) {
          if (err) { return next(err) }
          return res.redirect('/')
        });
      });
    }
  });
});

module.exports = router;