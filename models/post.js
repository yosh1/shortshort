'use strict';

const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Post = loader.database.define('posts', {
  postId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: Sequelize.TEXT,
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
  indexes: [
    {
      fields: ['createdBy']
    }
  ]
});

module.exports = Post;