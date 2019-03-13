'use strict';

const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const User = loader.database.define('users', {
  userId: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  comment: {
    type: Sequelize.STRING
  },
  createdAt: {
    type: Sequelize.DATE,
    alloNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = User;