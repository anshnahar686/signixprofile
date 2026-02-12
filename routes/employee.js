const express=require('express')
const controllers=require('../controllers/employees/empcontrollers.js')
const router=express.Router()
router.post('/create',controllers.CreateEmployee).get('/all',controllers.AllEmployees).get('/emp/:id',controllers.SingleEmployee).put('/update/:id',controllers.UpdateEmployee).delete('/delete/:id',controllers.DeleteEmployee)
module.exports=router