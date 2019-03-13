'use strict';

const express = require('express');
const router = express.Router();
const authenticationEnsurer = require('./authentication-ensurer');
const Novel = require('../models/novel');
const User = require('../models/user');
const Comment = require('../models/comment');
const Good = require('../models/good');
const uuid = require('uuid');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

router.get('/new', authenticationEnsurer, csrfProtection, (req, res, next) => {
  res.render('new', {
    csrfToken: req.csrfToken()
  });
});

router.post('/new', authenticationEnsurer, csrfProtection, (req, res, next) => {
  const novelId = uuid.v4();
  /* ToDo 100字以上4000字以内を受け付ける */ 
  const novel = {
    novelId: novelId,
    title: req.body.title,
    content: req.body.content,
    genre: req.body.genre,
    createdBy: req.user.userId,
    updatedAt: new Date()
  };
  Novel.create(novel).then((novel) => {
    if (!novel) { res.redirect('/novels/new') };
    res.redirect('/novels/' + novel.novelId);
  });
});

router.get('/:novelId', csrfProtection, (req, res, next) => {
  const novelId = req.params.novelId;
  Novel.findOne({
    include: [
      {
        model: User,
        attributes: ['userId', 'username']
      }
    ],
    where: { novelId: novelId }
  }).then((novel) => {
    Good.findAll({
      where: { novelId: novelId }
    }).then((goods) => {
      Comment.findAll({
        include: [
          {
            model: User,
            attributes: ['userId', 'username']
          }
        ],
        where: { novelId: novelId }
      }).then((comments) => {
        if (req.isAuthenticated()) {
          Good.findOne({
            where: {
              userId: req.user.userId,
              novelId: novel.novelId
            }
          }).then((good) => {
            if (good) {
              var className = "good-delete-button";
            } else {
              var className = "good-create-button";
            }
            Comment.findOne({
              where: { createdBy: req.user.userId }
            }).then((comment) => {
              res.render('novel', {
                novel: novel,
                goodCount: goods.length,
                isMine: isMine(novel, req),
                user: req.user,
                className: className,
                comments: comments,
                comment: comment,
                csrfToken: req.csrfToken()
              });
            });
          });
        } else {
          res.set()
          res.render('novel', {
            novel: novel,
            goodCount: goods.length,
            isMine: true,
            comments: comments,
            user: req.user,
            csrfToken: req.csrfToken()
          });
        }
      });
    });
  });
});

function isMine(novel, req) {
  return novel.createdBy === req.user.userId;
};

module.exports = router;