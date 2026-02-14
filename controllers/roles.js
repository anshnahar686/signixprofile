
const { validate } = require('uuid')
const roles = require('../models/role')
exports.createRoles=async (req,res) => {
   try {
  console.log(req.body);
  const { cDt, role, users_allowed, reports_to_role } = req.body;

  if (!role || !users_allowed) {
    return res.status(400).json({ message: "fields are missing" });
  }

  const newRole = await roles.create({
    cDt: cDt || new Date(),
    role,
    users_allowed,
    reports_to_role
  });

  res.status(201).json({ message: "role is created", newRole });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "some error occurred", error: error.message });
}
}
exports.allroles=async (req,res) => {
try {
    const allroles=await roles.findAll()
    if(allroles.length === 0)
    {
        return res.status(500).json({message:'roles are not found'})
    }
      return res.status(200).json({message:'all roles',allroles})
} catch (error) {
   return res.status(500).json({message:'some error  is occured',error:error.message}) 
}    
}
exports.roles=async (req,res) => {
try {
    const {id}=req.params
    if(!validate(id))
    {
        return res.status(500).json({message:'id is invalid'})
    }
    const allroles=await roles.findByPk(id)
    if(!allroles)
    {
        return res.status(500).json({message:'role are not found'})
    }
     res.status(200).json({message:'role is',allroles})
} catch (error) {
   return res.status(500).json({message:'some error  is occured',error:error.message}) 
}    
}
exports.Updateroles=async (req,res) => {
try {
    const {id}=req.params
    if(!validate(id))
    {
        return res.status(500).json({message:'id is invalid'})
    }
    const allroles=await roles.findByPk(id)
    if(!allroles)
    {
        return res.status(500).json({message:'role are not found'})
    }
    const updaterole=await roles.update(req.body,{where:{id:id}})
        if(!updaterole)
        {
          return res.status(400).json({message:'we cant update the departemnt'})
        }
         res.status(200).json({message:'updated department is',updaterole})
     res.status(200).json({message:'role is',allroles})
} catch (error) {
   return res.status(500).json({message:'some error  is occured',error:error.message}) 
}    
}
exports.Deleteroles=async (req,res) => {
try {
    const {id}=req.params
    if(!validate(id))
    {
        return res.status(500).json({message:'id is invalid'})
    }
    const allroles=await roles.findByPk(id)
    if(!allroles)
    {
        return res.status(500).json({message:'role are not found'})
    }
    const updaterole=await roles.destroy({where:{id:id}})
        if(!updaterole)
        {
          return res.status(400).json({message:'we cant update the departemnt'})
        }
         res.status(200).json({message:'role  is deleted',updaterole})
     res.status(200).json({message:'role is',allroles})
} catch (error) {
   return res.status(500).json({message:'some error  is occured',error:error.message}) 
}    
}