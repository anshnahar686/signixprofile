const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// MODELS
const customers = require('./customers')
const orders = require('./order')
const orderList = require('./orderlist')
const products = require('./product')

// CUSTOMER → ORDERS
customers.hasMany(orders, {
  foreignKey: 'customer_id',
  as: 'orders'
});
orders.belongsTo(customers, {
  foreignKey: 'customer_id',
  as: 'customer'
});

// ORDER → ORDER LIST
orders.hasMany(orderList, {
  foreignKey: 'order_id',
  as: 'items'
});
orderList.belongsTo(orders, {
  foreignKey: 'order_id',
  as: 'order'
});

// PRODUCT → ORDER LIST
products.hasMany(orderList, {
  foreignKey: 'itemId',   // must match DB constraint
  as: 'orderItems'
});
orderList.belongsTo(products, {
  foreignKey: 'itemId',   // must match DB constraint
  as: 'item'
});

module.exports = {
  sequelize,
  customers,
  orders,
  orderList,
  products
};