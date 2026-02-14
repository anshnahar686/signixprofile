const express=require('express')
const controllers=require('../controllers/department')

const router=express.Router()
router.post('/create',controllers.createDepartment).get('/all',controllers.allDepartments).get('/department/:id',controllers.departments).put('/update/:id',controllers.Updatedepartments).delete('/delete/:id',controllers.Deletedepartments)
module.exports=router