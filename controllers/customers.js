const { validate } = require('uuid')
const customers=require('../models/customers')
exports.Create_Customer=async (req,res) => {
    try {
        const { name,Gst,mobile_number,email,City, State,Location,Country,Transportation_Mode,Remark,registernumber_number}=req.body
        if(!name||!Gst||!mobile_number||!City||!State||!Location||!Transportation_Mode||!Remark||!registernumber_number)
        {
            return res.status(400).json({message:'required or missing field'})
        }
        const createcustomer=await customers.create({ name,Gst,mobile_number,email,City, State,Location,Country,Transportation_Mode,Remark,registernumber_number})
        res.status(200).json({message:'customer is',createcustomer})
    } catch (error) {
        res.status(500).json({message:'some error is occured',error:error.message})
    }
}
exports.All_Customer=async (req,res) => {
    try {
        const customer=await customers.findAll()
        if (customer.length === 0) {
            return res.status(500).json({message:'customer is not found'})
        }
        res.status(200).json({message:'customer is ',customer})
    } catch (error) {
        res.status(500).json({message:'some error is occured ',errro:error.message})
    }
}
exports.SingleCustomer=async (req,res) => {
    try {
        const {id}=req.params
        if(!validate(id))
        {
            return res.status(401).json({message:'id is Invalid'})
        }
        const customer=await customers.findByPk(id)
        if (!customer) {
            return res.status(500).json({message:'customer is not found'})
        }
        res.status(200).json({message:'customer is ',customer})
    } catch (error) {
        res.status(500).json({message:'some error is occured ',errro:error.message})
    }
}
exports.UpdateCustomer=async (req,res) => {
     try {
        const {id}=req.params
        if(!validate(id))
        {
            return res.status(401).json({message:'id is Invalid'})
        }
        const customer=await customers.findByPk(id)
        if (!customer) {
            return res.status(500).json({message:'customer is not found'})
        }
        const updateCustomer=await customers.update(req.body,{
            where:{id:id}
        })
        if(!updateCustomer)
        {
            return res.status(401).json({message:'customer cannot be updated'})
        }
        res.status(200).json({message:'customer is ',updateCustomer})
    } catch (error) {
        res.status(500).json({message:'some error is occured ',errro:error.message})
    }
}
exports.DeleteCustomer=async (req,res) => {
     try {
        const {id}=req.params
        if(!validate(id))
        {
            return res.status(401).json({message:'id is Invalid'})
        }
        const customer=await customers.findByPk(id)
        if (!customer) {
            return res.status(500).json({message:'customer is not found'})
        }
        const updateCustomer=await customers.destroy({
            where:{id:id}
        })
        if(!updateCustomer)
        {
            return res.status(401).json({message:'customer cannot be updated'})
        }
        res.status(200).json({message:'customer is ',updateCustomer})
    } catch (error) {
        res.status(500).json({message:'some error is occured ',errro:error.message})
    }
}