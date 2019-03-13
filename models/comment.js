'use strict';

const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Comment = loader.database.define('comments', {
  commentId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  novelId: {
    type: Sequelize.UUID,
    allowNull: false
  },
  createdBy: {
    type: Sequelize.UUID,
    allowNull: false
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false,
});

module.exports = Comment;