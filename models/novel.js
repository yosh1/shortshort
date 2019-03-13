'use strict';

const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Novel = loader.database.define('novels', {
  novelId: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  genre: {
    type: Sequelize.INTEGER,
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
  indexs: [
    {
      fields: ['createdBy']
    }
  ]
});

module.exports = Novel;