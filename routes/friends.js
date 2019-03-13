'use strict';

const express = require('express');
const router = express.Router();
const Friend = require('../models/friend');
const authenticationEnsurer = require('./authentication-ensurer');

router.post('/follow/:followId/followed/:followedId/create', authenticationEnsurer, (req, res, next) => {
  const followId = req.params.followId;
  const followedId = req.params.followedId;
  Friend.findOne({
    where: {
      followId: followId,
      followedId: followedId
    }
  }).then((friend) => {
    if (friend) {
      res.json({ status: 'OK' });
    } else {
      Friend.create({
        followId: followId,
        followedId: followedId
      }).then(() => {
        res.json({ status: 'OK' });
      });
    }
  });
});

router.post('/follow/:followId/followed/:followedId/delete', authenticationEnsurer, (req, res, next) => {
  const followId = req.params.followId;
  const followedId = req.params.followedId;
  Friend.findOne({
    followId: followId,
    followedId: followedId
  }).then((friend) => {
    if (friend) {
      friend.destroy();
      res.json({ status: 'OK' });
    } else {
      res.json({ status: 'OK' });
    }
  });
});

module.exports = router;