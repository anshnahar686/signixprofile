const { validate } = require('uuid')
const l2customers=require('../../models/le2customers')
exports.CreateUser=async(req,res)=>{
   try {
     const {leader_name,Ledgergroup,alias_Code,alias_Name,status,Address,pincode,latitude,longitude,pan,aadhaar,gst,Std_Dis,contact_Name, password,email,beat}=req.body
    if(!leader_name||!Ledgergroup||!alias_Code||!alias_Name||!status||!pincode||!pan||!aadhaar||!email||!password||!gst||!beat)
    {
        return res.status(411).json({message:"cannot add the data"})
    }
    const new_Customer=await l2customers.create({leader_name,Ledgergroup,alias_Code,alias_Name,status,Address,pincode,latitude,longitude,pan,aadhaar,gst,Std_Dis,contact_Name, password,email,beat})
    res.status(200).json({message:'customer is created ',new_Customer})
   } catch (error) {
    res.status(500).json({message:'some error is occured',error:error.message})
   }
}
exports.AllCustomers=async (req,res) => {
    const allusers=await l2customers.findAll()
    if(allusers.length === 0)
    {
        return res.stataus(401).json({message:'customers does not found'})
    }
     res.status(200).json({message:'all customers ',allusers})
}
exports.SingleCustomer=async (req,res) => {
    try {
        const {id}=req.params
       
        if (!validate(id)) {
            console.log("sdfs")
            return res.status(401).json({message:'Invalid Id'})
    }
    const users=await l2customers.findByPk(id)
    if(!users)
    {
        return res.status(401).json({message:'user is not found'})
    }
    console.log(users)
   res.status(200).json({
  message: 'user is',
   users
});
        }catch (error) {
            res.status(500).json({message:'some error is occured',error:error.message})
    }
    
}
exports.UpdateCustomer=async (req,res) => {
        try {
        const {id}=req.params
        if (!validate(id)) {
            return res.stataus(401).json({message:'Invalid Id'})
    }
    const users=l2customers.findByPk(id)
    if(!users)
    {
        return res.status(401).json({message:'user is not found'})
    }
    const updateduser=await l2customers.update(req.body,{where:{id:id}})
    if(!updateduser)
    {
        return res.status(401).json({message:'user is not updated'})
    }
    res.status(200).json({message:'updated user',updateduser})
        } catch (error) {
        res.status(500).json({message:'some error is occured',error:error.message})
    }
}
exports.DeleteCustomer=async (req,res) => {
        try {
        const {id}=req.params
        if (!validate(id)) {
            return res.stataus(401).json({message:'Invalid Id'})
    }
    const users=l2customers.findByPk(id)
    if(!users)
    {
        return res.status(401).json({message:'user is not found'})
    }
    const deleteuser=await l2customers.destroy({where:{id:id}})
    if(!deleteuser)
    {
        return res.status(401).json({message:'user is not updated'})
    }
    res.status(200).json({message:'updated user',deleteuser})
        } catch (error) {
        res.status(500).json({message:'some error is occured',error:error.message})
    }
}