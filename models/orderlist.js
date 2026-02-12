const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

const orderList = sequelize.define('order_list', {

  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },

  order_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  itemId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  itemName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },

  Unit_price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    defaultValue: 0.00,
    validate: {
      isDecimal: true,
      notNull: true
    }
  },

  Tax: {
    type: DataTypes.DECIMAL(5,2),
    allowNull: false,
    validate: {
      min: 0,
      max: 100,
      isDecimal: true
    }
  },

  Discount: {
    type: DataTypes.DECIMAL(5,2),
    allowNull: true,
    validate: {
      min: 0,
      max: 100,
      isDecimal: true
    }
  },

  status: {
    type: DataTypes.ENUM(
      'PENDING',
      'APPROVED',
      'SHIPPED',
      'DELIVERED',
      'CANCELLED',
      'RETURNED'
    ),
    allowNull: false,
  },

  Quantity: {   // ✅ fixed spelling
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      isInt: true,
      notNull: true
    }
  },

  Payment_mode_id: {
    type: DataTypes.UUID,
    allowNull: true
  }

}, {
  timestamps: false
});

module.exports = orderList;
