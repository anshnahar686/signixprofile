const express=require('express')
const controllers=require('../controllers/dailyattendence_log')
const router=express.Router()
router.post('/create',controllers.create_Attendence_Logs).get('/all',controllers.AllLogs).get('/attendence_log/:id',controllers.Logs).put('/update/:id',controllers.UpdateLogs).delete('/delete/:id',controllers.DeleteLogs)
module.exports=router