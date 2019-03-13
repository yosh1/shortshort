'use strict';

const express = require('express');
const router = express.Router();
const authenticationEnsurer = require('./authentication-ensurer');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
var Comment = require('../models/comment');

router.post('/:novelId/users/:userId/comments', csrfProtection, authenticationEnsurer, (req, res, next) => {
  const novelId = req.params.novelId;
  const createdBy = req.params.userId;
  const content = req.body.content;
  const updatedAt = new Date();
  Comment.upsert({
    content: content,
    novelId: novelId,
    createdBy: createdBy,
    updatedAt: updatedAt
  }).then(() => {
    res.redirect(`/novels/${novelId}`);
  });
});

router.post('/:novelId/users/:userId/comments/delete', authenticationEnsurer, csrfProtection, (req, res, next) => {
  const novelId = req.params.novelId;
  const userId = req.params.userId;
  Comment.findOne({
    where: {
      novelId: novelId,
      createdBy: userId
    }
  }).then((comment) => {
    if (comment) {
      if (comment.createdBy === req.user.userId) {
        comment.destroy();
        res.redirect(`/novels/${novelId}`);
      } else {
        res.redirect(`/novels/${novelId}`);
      }
    } else {
      res.redirect(`/novels/${novelId}`);
    }
  });
});

module.exports = router;