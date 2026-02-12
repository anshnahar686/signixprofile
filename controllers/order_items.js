const { orders, orderList } = require('../models');
const sequelize = require('../config/connection');
const { customers } = require('../models')



exports.createProducttoAnOrder = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      customer_id,
      orderDate,
      createDate,
      updateDate,
      note,
      status,
      items
    } = req.body;

    // Create Order
    const order = await orders.create({
      customer_id,
      orderDate,
      createDate,
      updateDate,
      note,
      status
    }, { transaction });

    // Create Items
    const orderItems = items.map(item => ({
      order_id: order.id,
      itemId: item.itemId,          // must match product_lists.id
      productName: item.productName,
      Unit_price: item.Unit_price,
      Quanity: item.Quanity,
      Tax: item.Tax,
      Discount: item.Discount,
      status: item.status
    }));

    await orderList.bulkCreate(orderItems, { transaction });

    await transaction.commit();

    res.status(201).json({
      message: "Order created successfully",
      orderId: order.id
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};


// GET ALL ORDERS
// GET ALL ORDERS
exports.getAllOrders = async (req, res) => {
  try {
    const allOrders = await orders.findAll({
      include: [
        {
          model: orderList,
          as: "items"
        },
        {
          model: customers,
          as: "customer"
        }
      ],
      order: [["createDate", "DESC"]]
    });

    res.status(200).json(allOrders);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};


// GET SINGLE ORDER
exports.getSingleOrder = async (req, res) => {

    try {

        const { id } = req.params;

        const order = await orders.findByPk(id, {

            include: [
                {
                    model: orderList,
                    as: "items"
                }
            ]

        });

        if (!order) {

            return res.status(404).json({
                message: "Order not found"
            });

        }

        res.status(200).json(order);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};



// UPDATE ORDER
exports.updateOrder = async (req, res) => {

    const transaction = await sequelize.transaction();

    try {

        const { id } = req.params;

        const order = await orders.findByPk(id);

        if (!order) {

            await transaction.rollback();

            return res.status(404).json({
                message: "Order not found"
            });

        }

        const {
            customer_id,
            orderDate,
            updateDate,
            note,
            status,
            items
        } = req.body;

        await order.update({
            customer_id,
            orderDate,
            updateDate,
            note,
            status
        }, { transaction });


        await orderList.destroy({
            where: { order_id: id },
            transaction
        });


        const newItems = items.map(item => ({
            order_id: id,
            productId: item.productId,
            productName: item.productName,
            Unit_price: item.Unit_price,
            Quanity: item.Quanity,
            Tax: item.Tax,
            Discount: item.Discount,
            status: item.status
        }));

        await orderList.bulkCreate(newItems, { transaction });

        await transaction.commit();

        res.status(200).json({
            message: "Order updated successfully"
        });

    } catch (error) {

        await transaction.rollback();

        res.status(500).json({
            error: error.message
        });

    }

};




// DELETE ORDER
exports.deleteOrder = async (req, res) => {

    const transaction = await sequelize.transaction();

    try {

        const { id } = req.params;

        await orderList.destroy({
            where: { order_id: id },
            transaction
        });

        await orders.destroy({
            where: { id },
            transaction
        });

        await transaction.commit();

        res.status(200).json({
            message: "Order deleted successfully"
        });

    } catch (error) {

        await transaction.rollback();

        res.status(500).json({
            error: error.message
        });

    }

};
