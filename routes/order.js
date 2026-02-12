const express=require('express')
const controllers=require('../controllers/orders')
const router=express.Router()
router.post('/create',controllers.CreateOrder).get('/all',controllers.AllOrders).get('/order/:id',controllers.Order).put('/update/:id',controllers.UpdateOrder).delete('/delete/:id',controllers.DeleteOrder)
module.exports=router 