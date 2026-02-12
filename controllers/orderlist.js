const { validate } = require('uuid')
const orderList=require('../models/orderlist')
const { customers } = require('../models')
exports.CreateOrderList=async (req,res) => {
    try {
        console.log(req.body)
        const{productId,productName,Unit_price,Tax,Discount,Quanity,status,Payment_mode_id,order_id}=req.body
        if(!productName||!Unit_price||!Tax||!Quanity)
        {
            return res.status(401).json({message:'required fields are not found'})
        }
        const createlist =await orderList.create({productId,productName,Unit_price,Tax,Discount,Quanity,status,Payment_mode_id,order_id})
        res.status(200).json({message:'orderlist is created',createlist})

    } catch (error) {
         res.status(500).json({message:'orderlist is created',error})
    }
}
exports.AllList=async (req,res) => {
    const {orderid}=req.params
console.log("Dfs")
    const alllist=await orderList.findAll()
        const customer=await customers.findByPk(alllist.customer_id)
        console.log(customer)
    if(alllist.length === 0)
    {
        return res.status(500).json({message:'order list is not find'})
    }
    res.status(200).json({message:'all order list',alllist})
}
exports.List=async (req,res) => {
 try {
    const {id}=req.params
    console.log(id)
    if(!validate(id))
    {
        return res.status(500).json({message:'id is invalid'})
    }
    const findlist=await orderList.findByPk(id)
    if(!findlist)
    {
         return res.status(500).json({message:'orderlist is not find'})
    }
      res.status(200).json({message:'all order list',findlist})
 } catch (error) {
    res.status(500).json({message:'some error is occured',error:error.message})
 }   
}
exports.UpdateList=async (req,res) => {
try {
       const id=req.params.id
    if(!validate(id))
    {
        return res.status(500).json({message:'id is invalid'})
    }
    const findlist=await orderList.findByPk(id)
    if(!findlist)
    {
         return res.status(500).json({message:'orderlist is not find'})
    }
    const updatelist=await orderList.update(req.body,{
        where:{id:id}
    })
    if(!updatelist)
    {
        return res.status(500).json({message:"list can't be updated",updatelist})
    }
    res.status(200).json({message:"updated list",updatelist})

    
} catch (error) {
     res.status(500).json({message:"list can't be updated",error:error.message})
}    
}
exports.DeleteList=async (req,res) => {
try {
       const id=req.params.id
    if(!validate(id))
    {
        return res.status(500).json({message:'id is invalid'})
    }
    const findlist=await orderList.findByPk(id)
    if(!findlist)
    {
         return res.status(500).json({message:'orderlist is not find'})
    }
    const updatelist=await orderList.destroy({
        where:{id:id}
    })
    if(!updatelist)
    {
        return res.status(500).json({message:"list can't be updated",updatelist})
    }
    res.status(200).json({message:"list is deleted",updatelist})

    
} catch (error) {
     res.status(500).json({message:"some error is occured",error:error.message})
}    
}