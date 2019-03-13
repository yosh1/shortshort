'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Friend = require('../models/friend');

router.get('/:userId', (req, res, next) => {
  const userId = req.params.userId;
  User.findOne({
    where: { userId: userId }
  }).then((user) => {
    if (!user) {
      const err = new Error('指定されたユーザが存在しません');
      err.status = 404;
      next(err);
    } else {
      Friend.findAll({
        where: { followId: userId }
      }).then((follows) => {
        Friend.findAll({
          where: { followedId: userId }
        }).then((followers) => {
          if (req.isAuthenticated()) {
            var followsList = [];
            follows.forEach((follow) => {
              followsList.push(follow.followedId);
            });
            const isFollowed = followsList.indexOf(req.user.userId) >= 0;
            var followersList = [];
            followers.forEach((follower) => {
              followersList.push(follower.followId);
            });
            const isFollow = followersList.indexOf(req.user.userId) >= 0;
            if (isFollow) {
              var idName = "friend-delete-button";
              var text = "フォロー解除する";
            } else {
              var idName = "friend-create-button";
              var text = "フォローする"
            }
            console.log(idName);
            res.render('user', {
              user: req.user,
              pageuser: user,
              follows: follows.length,
              followers: followers.length,
              isFollowed: isFollowed,
              idName: idName,
              text: text,
              isMe: req.user.userId === user.userId
            });
          } else {
            res.render('user', {
              user: req.user,
              pageuser: user,
              follows: follows.length,
              followers: followers.length,
              idName: idName,
              text: text,
              isMe: false
            });
          }
        });
      });
    }
  });
});

router.get('/:userId/follows', (req, res, next) => {
  const followId = req.params.userId;
  User.findOne({
    where: { userId: followId }
  }).then((user) => {
    Friend.findAll({
      include: [
        {
          model: User,
          attributes: ['userId', 'username', ]
        }
      ],
      where: { followId: followId }
    }).then((follows) => {
      var followsList = [];
      follows.forEach((follow) => {
        followsList.push(follow.followedId);
      });
      res.render('friend', {
        friends: followsList,
        user: user
      });
    });
  })
});

module.exports = router;