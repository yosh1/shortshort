'use strict';

const express = require('express');
const router = express.Router();
var Good = require('../models/good');
const authenticationEnsurer = require('./authentication-ensurer');

router.post('/:novelId/users/:userId/goods/create', authenticationEnsurer, (req, res, next) => {
  const userId = req.params.userId;
  const novelId = req.params.novelId;
  const createdAt = new Date();
  Good.findOne({
    where: {
      userId: userId,
      novelId: novelId
    }
  }).then((good) => {
    if (good) {
      res.json({ status: 'OK' });
    } else {
      Good.create({
        userId: userId,
        novelId: novelId,
        createdAt: createdAt
      }).then(() => {
        res.json({ status: "OK" });
      });
    }
  });
});

router.post('/:novelId/users/:userId/goods/delete', authenticationEnsurer, (req, res, next) => {
  const userId = req.params.userId;
  const novelId = req.params.novelId;
  Good.findOne({
    where: {
      userId: userId,
      novelId: novelId
    }
  }).then((good) => {
    if (good) {
      return good.destroy();
    } else {
      return null;
    }
  }).then(() => {
    res.json({ status: 'OK' });
  });
});

module.exports = router;