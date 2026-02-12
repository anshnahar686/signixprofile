const express=require('express')
const controllers=require('../controllers/category')
const image=require('../authentication/imageconfg')
const router=express.Router()
router.post('/create',image.Image,controllers.CreateAttendce).get('/all/:id',controllers.Attendences).get('/all',controllers.AllAttendence).delete('/delete/:id', controllers.DeleteAttendence).put('/update/:id',image.Image,controllers.updateCategory)
module.exports=router