const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

const order_items = sequelize.define("order_items", {
  order_id: DataTypes.UUID,
  item_id: DataTypes.UUID,
  item_name: DataTypes.STRING,
  UomQty: DataTypes.FLOAT,
  Size: DataTypes.FLOAT,
  mrp: DataTypes.FLOAT,
  Qty: DataTypes.FLOAT,
  Unit_price: DataTypes.FLOAT,
  Rate_Inc_Tax: DataTypes.FLOAT,
  Rate_Tax_Extra: DataTypes.FLOAT,
  Tax: DataTypes.FLOAT,
  Discount: DataTypes.FLOAT,
  Taxable_Value: DataTypes.FLOAT,
  Short_Narration: DataTypes.TEXT
});

module.exports = order_items;
