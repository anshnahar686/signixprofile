const { validate } = require('uuid')
const attendence_logs=require('../models/dailyattendence_log.js')
exports.create_Attendence_Logs=async (req,res) => {
    try 
   {
        const {Attendance_Dt,leger_id,time_slot,desination,department,Virtual_Office,Branch,DOJ,Attendence_Status }=req.body
        if(!Attendance_Dt||!leger_id||!Attendence_Status)      
            {
                return res.status(400).json({message:'fields are required'})

            }  
            const newlog=await attendence_logs.create({Attendance_Dt,leger_id,time_slot,desination,department,Virtual_Office,Branch,DOJ,Attendence_Status })
            res.status(200).json({message:'attendence log', newlog})
    } catch (error) {
        res.status(500).json({message:'some error is occured',  error:error.message})
    }    
}
exports.AllLogs=async (req,res) => {
    try {
        const alllogs=await attendence_logs.findAll()
        if(alllogs.length === 0)
        {
            return res.status(400).json({message:'attendence logs are not found'})
        }
        res.status(200).json({message:'attendence logs ',alllogs})
    } catch (error) {
         res.status(500).json({message:'some error is occured ',error:error.message})
    }
}
exports.Logs=async (req,res) => {
    try {
        const {id}=req.params
        
        const alllogs=await attendence_logs.findByPk(id)
        if(!alllogs)
        {
            return res.status(400).json({message:'attendence logs are not found'})
        }
        res.status(200).json({message:'attendence logs ',alllogs})
    } catch (error) {
         res.status(500).json({message:'some error is occured ',error:error.message})
    }
}
exports.UpdateLogs=async (req,res) => {
       try {
        const {id}=req.params
      
        const alllogs=await attendence_logs.findByPk(id)
        if(!alllogs)
        {
            return res.status(400).json({message:'attendence logs are not found'})
        }
       const update=await attendence_logs.update(req.body,{where:{id:id}})
       if(!update)
       {
            return res.status(400).json({message:"attendence can't be updated"})
       }
       res.status(200).json({message:"attendence  be updated",update})
    } catch (error) {
         res.status(500).json({message:'some error is occured ',error:error.message})
    }
}
exports.DeleteLogs=async (req,res) => {
     try {
        const {id}=req.params
       
        const alllogs=await attendence_logs.findByPk(id)
        if(!alllogs)
        {
            return res.status(400).json({message:'attendence logs are not found'})
        }
       const update=await attendence_logs.destroy({where:{id:id}})
       if(!update)
       {
            return res.status(400).json({message:"attendence can't be deleted"})
       }
       res.status(200).json({message:"attendence  be deleted",update})
    } catch (error) {
         res.status(500).json({message:'some error is occured ',error:error.message})
    }   
}