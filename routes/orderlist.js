const express=require('express')
const controllers=require('../controllers/orderlist')
const router=express.Router()
router.post('/create',controllers.CreateOrderList).get('/all/:orderid',controllers.AllList).get('/orderlist/:id',controllers.List).put('/update/:id',controllers.UpdateList).delete('/delete/:id',controllers.DeleteList)
module.exports=router