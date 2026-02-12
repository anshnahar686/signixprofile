const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');




const ProductList = sequelize.define('product_lists', {

  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  cDt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  item_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alias_name: {
    type: DataTypes.STRING
  },
  item_code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  EAN: {
    type: DataTypes.STRING,
    unique: true
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  seqno: {
    type: DataTypes.INTEGER,
   
  
  },
  ItemInCase: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  ecessAmount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  MRP: {
    type: DataTypes.DECIMAL(10, 2)
  },
  sales_Price: {
    type: DataTypes.DECIMAL(10, 2)
  },
  LRP: {
    type: DataTypes.DECIMAL(10, 2)
  },
  LCP: {
    type: DataTypes.DECIMAL(10, 2)
  },
  MRP_Case_: {
    type: DataTypes.DECIMAL(10, 2)
  },
  sales_Price_Case_Unit: {
    type: DataTypes.DECIMAL(10, 2)
  },
  LPR_Case_Unit: {
    type: DataTypes.DECIMAL(10, 2)
  },
  for_sale: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  for_purchase: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  for_issue: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  for_recieve: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  latitude: {
    type: DataTypes.DECIMAL(9, 6)
  },
  longitude: {
    type: DataTypes.DECIMAL(9, 6)
  },
  case_unit_stock_type:{
     type: DataTypes.ENUM('Serial (System)','Serial (User)','Batch','Retail')
  },
  base_unit_stock_type:{
     type: DataTypes.ENUM('Serial (System)','Serial (User)','Batch','Retail')
  },
  description: {
    type: DataTypes.TEXT
  },
  pic: {
    type: DataTypes.STRING
  },
  banner: {
    type: DataTypes.STRING
  },
  technical_details: {
    type: DataTypes.STRING
  }



}, {
  timestamps: false
});
module.exports = ProductList;
