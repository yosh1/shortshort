'use strict';

const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Friend = loader.database.define('friends', {
  followId: {
    type: Sequelize.UUID,
    allowNull: false
  },
  followedId: {
    type: Sequelize.UUID,
    alloNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false,
  indexes: [
    {
      fields: ['followId', 'followedId']
    }
  ]
});

module.exports = Friend;