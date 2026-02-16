const express=require('express')
const controllers=require('../controllers/attendence_log')
const images=require('../authentication/attendence.js')
const router=express.Router()
router.post('/create',images.Image,controllers.CreateLogs).get('/all',controllers.AllLogs).get('/attendence_log/:id',controllers.Logs).put('/update/:id',controllers.UpdateLogs).delete('/delete/:id',controllers.DeleteLogs)
module.exports=router