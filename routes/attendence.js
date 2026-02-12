const express=require('express')
const controllers=require('../controllers/attendence')
const router=express.Router()
router.post('/create',controllers.CreateAttendce).get('/all',controllers.AllAttendence).get('/attendence/:id',controllers.Attendences).put('/update/:id',controllers.UpdateAttendence).delete('/delete/:id',controllers.DeleteAttendence)
module.exports=router