const attendence_logs=require('../models/attendencelog.js')
exports.CreateLogs=async (req,res) => {
  try {
    const {LogTypeID,ledger_id,Virtual_location,Punch_Dt,Attendance_Dt,Attendence_Status_id,Attendence_Status_group_id}=req.body
    if(!LogTypeID||!ledger_id||!Punch_Dt||!Attendance_Dt||!Attendence_Status_id||!Attendence_Status_group_id)
    {
        return res.status(500).json({message:"some error is occured"})
    }
    
    const newlogs=await attendence_logs.create({LogTypeID,ledger_id,Virtual_location,Punch_Dt,Attendance_Dt,Attendence_Status_id,Attendence_Status_group_id})
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