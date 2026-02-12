const express=require('express')
const controllers=require('../controllers/user')
const router=express.Router()
router.post('/',controllers.Register).get('/all',controllers.GetUssers).get('/get/:id',controllers.Getuser).put('/update/:id',controllers.UpdateUsers).delete('/delete/:id',controllers.DeleteUser).post('/login',controllers.Login).post('/verify',controllers.VerifyOTP).get('/logout',controllers.Logout)
module.exports=router