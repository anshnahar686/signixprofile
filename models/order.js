const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');


;
 


const orders = sequelize.define('order', {

  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  customer_id: {
    type: DataTypes.UUID,
    allowNull: false
  },

  orderDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  createDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },

  updateDate: {
    type: DataTypes.DATE,
  },

  note: {
    type: DataTypes.TEXT,
  },

  status: {
    type: DataTypes.ENUM('Pending', 'Processing', 'Completed', 'Cancelled'),
    defaultValue: 'Pending'
  }

}, {
  timestamps: false
});


// belongs to customer


module.exports = orders;
