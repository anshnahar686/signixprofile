const express=require('express')
const controllers=require('../controllers/roles')

const router=express.Router()
router.post('/create',controllers.createRoles).get('/all',controllers.allroles).get('/role/:id',controllers.roles).put('/update/:id',controllers.Updateroles).delete('/delete/:id',controllers.Deleteroles)
module.exports=router