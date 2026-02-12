const { validate } = require("uuid")
const employee = require('../models/employees')
const Attendence = require('../models/attendence')
exports.CreateAttendce = async (req, res) => {
    try {
        const { employee_id, date, checkInTime, checkoutTime, status } = req.body
        if (!employee_id || !date || !checkInTime || !checkoutTime) {
            return res.status(400).json({ message: 'fields are missing' })
        }
        if (!validate(employee_id)) {
            return res.status(404).json({ message: 'id is invalid' })
        }
        const f_employee = await employee.findByPk(employee_id)
        if (!f_employee) {
            return res.status(404).json({ message: 'employee is not found' })
        }
        const attendences = await Attendence.create({ employee_id, date, checkInTime, checkoutTime, status })
        res.status(201).json({ message: 'attendence', attendences })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}
exports.AllAttendence = async (req, res) => {
    try {
        const attendence = await Attendence.findAll()
        if (attendence.length === 0) {
            return res.status(404).json({ message: 'attendence history is not found' })
        }
        res.status(200).json({ message: 'attendence is', attendence })

    } catch (error) {
        return res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}
exports.Attendences=async (req, res) => {
    try {
        const {id}=req.params
        if(!validate(id))
        {
            return res.status(400).json({message:'id is invalid'})
        }
        const result=await Attendence.findByPk(id)
        if(!result)
        {
             return res.status(401).json({message:'attendence is not found'})
        }
        res.status(200).json({message:'attendence is',result})
    } catch (error) {
         return res.status(500).json({message:'some error is occured',error:error.message})
    }
}
exports.UpdateAttendence=async (req,res) => {
        try {
        const {id}=req.params
        if(!validate(id))
        {
            return res.status(400).json({message:'id is invalid'})
        }
        const result=await Attendence.findByPk(id)
        if(!result)
        {
             return res.status(401).json({message:'attendence is not found'})
        }
        const updateattendence=await Attendence.update(req.body,{where:{id:id}})
        if(updateattendence === 0)
        {
               return res.status(404).json({message:'can"t update the update the attendence  '})
        }
        res.status(200).json({message:'attendence is',updateattendence})
    } catch (error) {
         return res.status(500).json({message:'some error is occured',error:error.message})
    }
}
exports.DeleteAttendence=async (req,res) => {
   try {
        const {id}=req.params
        if(!validate(id))
        {
            return res.status(400).json({message:'id is invalid'})
        }
        const result=await Attendence.findByPk(id)
        if(!result)
        {
             return res.status(401).json({message:'attendence is not found'})
        }
        const updateattendence=await Attendence.destroy({where:{id:id}})
        if(!updateattendence)
        {
               return res.status(404).json({message:'can"t update the update the attendence  '})
        }
        res.status(200).json({message:'attendence is',updateattendence})
    } catch (error) {
         return res.status(500).json({message:'some error is occured',error:error.message})
    }
}    
