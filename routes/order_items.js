const express=require('express')
const controllers=require('../controllers/order_items')
const router=express.Router()
router.post('/create',controllers.createProducttoAnOrder).get('/all',controllers.getAllOrders).get('/single/:id',controllers.getSingleOrder).put('/update/:id',controllers.updateOrder).delete('/update/:id',controllers.deleteOrder)
module.exports=router