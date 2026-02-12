const express=require('express')
const controllers=require('../controllers/product')
const images=require('../authentication/item')
const router=express.Router()
router.post('/create',images.Image,controllers.CreateProducts).get('/all',controllers.AllProducts).get('/product/:id',controllers.Products).put('/update/:id',controllers.UpdateProducts).delete('/delete/:id',controllers.DeleteProducts)
module.exports=router