const { validate } = require('uuid')
const orders=require('../models/order')
const customers=require('../models/customers')
const { where } = require('sequelize')
exports.CreateOrder=async (req,res) => {
    console.log(req.body)
    try {
        const {customer_id,orderDate, createDate, updateDate,note,status}=req.body
        if(!customer_id||!orderDate)
        {
            return res.status(401).json({message:'all fields are required'})
        }
        const orederss=await orders.create( {customer_id,orderDate, createDate, updateDate,note,status})
        res.status(200).json({message:'orders are created',orederss})
    } catch (error) {
         res.status(500).json({message:'some error is occured',error:error.message})
    }
}
exports.AllOrders=async (req,res) => {
    try {
        const orderss=await orders.findAll({ include: [
    {
      model: customers,
      as: "customer",
      attributes: ["id", "name", "email"] // only needed fields
    }
  ]})
        if(orderss.length === 0)
        {
            return res.status(401).json({message:'orders are not found'})
        }
         res.status(200).json({message:'all orders',orderss})
    } catch (error) {
         res.status(500).json({message:'some error is occured',error:error.message})
    }
}
exports.Order=async (req,res) => {
 try {
       const {id}=req.params
    if(!validate(id))
    {
        return res.status(401).json({message:'order id is invalid'})
    }
    const findOrder=await orders.findByPk(id)
    if(!findOrder)
    {
        return res.status(400).json({
            message:'order does not find'
        })
    }
    res.status(200).json({message:'order is',findOrder})
 } catch (error) {
    res.status(500).json({message:'some error is occured',error:error.message})
 }
}
exports.UpdateOrder=async (req,res) => {
 try {
       const {id}=req.params
    if(!validate(id))
    {
        return res.status(401).json({message:'order id is invalid'})
    }
    const findOrder=await orders.findByPk(id)
    if(!findOrder)
    {
        return res.status(400).json({
            message:'order does not find'
        })
    }
    const updateorder=await orders.update(req.body,{
       where:{ id:id}
    })
    if(!updateorder){
        res.status(200).json({message:'order can`t be updated',updateorder})
    }
    res.status(200).json({message:'order is',updateorder})
 } catch (error) {
    res.status(500).json({message:'some error is occured',error:error.message})
 }
}
exports.DeleteOrder=async (req,res) => {
 try {
       const {id}=req.params
    if(!validate(id))
    {
        return res.status(401).json({message:'order id is invalid'})
    }
    const findOrder=await orders.findByPk(id)
    if(!findOrder)
    {
        return res.status(400).json({
            message:'order does not find'
        })
    }
    const updateorder=await orders.destroy({
      where:{  id:id}
    })
    if(!updateorder){
        res.status(200).json({message:'order can`t be updated',updateorder})
    }
    res.status(200).json({message:'order is',updateorder})
 } catch (error) {
    res.status(500).json({message:'some error is occured',error:error.message})
 }
}