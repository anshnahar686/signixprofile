const { validate } = require('uuid')
const attendence_logs=require('../models/attendencelog.js')
const { where } = require('sequelize')
exports.CreateLogs=async (req,res) => {
  try {
    const {LogTypeID,ledger_id,Virtual_location,Punch_Dt,Attendance_Dt,Attendence_Status_id,Attendence_Status_group_id,latitudes,logititude,gps_address,serial}=req.body
    const selfie_pic=req.files.selfie_pic;
    console.log(selfie_pic)
    
    if(!LogTypeID||!ledger_id||!Punch_Dt||!Attendance_Dt||!Attendence_Status_id||!Attendence_Status_group_id)
    {
        return res.status(500).json({message:"some error is occured"})
    }
    
    const newlogs=await attendence_logs.create({LogTypeID,ledger_id,Virtual_location,Punch_Dt,Attendance_Dt,Attendence_Status_id,Attendence_Status_group_id,latitudes,logititude,gps_address,serial})
    res.status(200).json({message:'logs are created',newlogs})
  } catch (error) {
    return  res.status(500).json({message:'some error is occured',error:error.message})
  }  
}
exports.AllLogs=async (req,res) => {
  try {
    const alllogs=await attendence_logs.findAll()
    if(alllogs.length === 0)
    {
         return  res.status(500).json({message:'all logis not found'})
    }
     res.status(200).json({message:'all logis not found',alllogs})
  } catch (error) {
    return  res.status(500).json({message:'some error is occured',error:error.message})
  }  
}
exports.Logs=async (req,res) => {
try {
    const {id}=req.params
    if(!validate(id))
    {
      return res.status(400).json({message:'id is invalid'})
    }
    const finduser=await attendence_logs.findByPk(id)
    if (!finduser) {
        return res.status(401).json({message:'attendence details are not found'})   
    }
    res.status(200).json({message:'attendence_logs are',finduser})
} catch (error) {
  res.status(500).json({message:'some error is occured',error:error.message})
}  
}
exports.UpdateLogs=async (req,res) => {
try {
    const {id}=req.params
    if(!validate(id))
    {
      return res.status(400).json({message:'id is invalid'})
    }
    const finduser=await attendence_logs.findByPk(id)
    if (!finduser) {
        return res.status(401).json({message:'attendence details are not found'})   
    }
    const updateUser=await attendence_logs.update(req.body,{where:{id:id}})
    if(!updateUser)
    {
      return res.status(402).json({message:"can 't update the logs"})
    }
    res.status(200).json({message:'attendence_logs are',updateUser})
} catch (error) {
  res.status(500).json({message:'some error is occured',error:error.message})
}  
}
exports.DeleteLogs=async (req,res) => {
try {
    const {id}=req.params
    if(!validate(id))
    {
      return res.status(400).json({message:'id is invalid'})
    }
    const finduser=await attendence_logs.findByPk(id)
    if (!finduser) {
        return res.status(401).json({message:'attendence details are not found'})   
    }
    const deleteUser=await attendence_logs.destroy({where:{id:id}})
    if(!deleteUser)
    {
      return res.status(402).json({message:"can 't update the logs"})
    }
    res.status(200).json({message:'attendence_logs are',deleteUser})
} catch (error) {
  res.status(500).json({message:'some error is occured',error:error.message})
}  
}