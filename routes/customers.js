const express=require('express')
const controllers=require('../controllers/customers')
const router=express.Router()
router.post('/create',controllers.Create_Customer).get('/all',controllers.All_Customer).get('/customer/:id',controllers.SingleCustomer).put('/update/:id',controllers.UpdateCustomer).delete('/delete/:id',controllers.DeleteCustomer)
module.exports=router