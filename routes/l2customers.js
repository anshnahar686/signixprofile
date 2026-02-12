const express=require('express')
const controllers=require('../controllers/l2customers/l2customers')
const router=express.Router()
router.post('/create',controllers.CreateUser).get('/all',controllers.AllCustomers).get('/customer/:id',controllers.SingleCustomer).put('/update/:id',controllers.UpdateCustomer).delete('/delete/:id',controllers.DeleteCustomer)
module.exports=router