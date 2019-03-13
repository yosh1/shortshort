'use strict';

const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Good = loader.database.define('goods', {
  userId: {
    type: Sequelize.UUID,
    allowNull: false
  },
  novelId: {
    type: Sequelize.UUID,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false,
  indexed: [
    {
      fields: ['userId', 'novelId']
    }
  ]
});

module.exports = Good;