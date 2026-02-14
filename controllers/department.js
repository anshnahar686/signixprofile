const { validate } = require('uuid')
const departments=require('../models/department.js')
// controllers/departmentController.js
exports.createDepartment = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { department } = req.body;

    if (!department || department.length === 0) {
      return res.status(400).json({
        message: "No data provided",
      });
    }

    // Remove id if frontend sends it
    const cleanedData = department.map(({ id, ...rest }) => rest);
    console.log(cleanedData)
    const result = await departments.bulkCreate(cleanedData);

    res.status(201).json({
      message: "Departments created successfully",
      data: result,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


exports.allDepartments=async (req,res) => {
try {
    const alldepartments=await departments.findAll()
    if(alldepartments.length === 0)
    {
        return res.status(500).json({message:'roles are not found'})
    }
      return res.status(200).json({message:'all departments',alldepartments})
} catch (error) {
   return res.status(500).json({message:'some error  is occured',error:error.message}) 
}    
}
exports.departments=async (req,res) => {
try {
    const {id}=req.params
    if(!validate(id))
    {
        return res.status(500).json({message:'id is invalid'})
    }
    const departments=await departments.findByPk(id)
    if(!departments)
    {
        return res.status(500).json({message:'role are not found'})
    }
     res.status(200).json({message:'role is',departments})
} catch (error) {
   return res.status(500).json({message:'some error  is occured',error:error.message}) 
}    
}
exports.Updatedepartments=async (req,res) => {
try {
    const {id}=req.params
    if(!validate(id))
    {
        return res.status(500).json({message:'id is invalid'})
    }
    const departmentss=await departments.findByPk(id)
    if(!departmentss)
    {
        return res.status(500).json({message:'role are not found'})
    }
    const updateDepartment=await departments.update(req.body,{where:{id:id}})
    if(!updateDepartment)
    {
      return res.status(400).json({message:'we cant update the departemnt'})
    }
     res.status(200).json({message:'updated department is',updateDepartment})
} catch (error) {
   return res.status(500).json({message:'some error  is occured',error:error.message}) 
}    
}
exports.Deletedepartments=async (req,res) => {
try {
    const {id}=req.params
    if(!validate(id))
    {
        return res.status(500).json({message:'id is invalid'})
    }
    const departmentss=await departments.findByPk(id)
    if(!departmentss)
    {
        return res.status(500).json({message:'role are not found'})
    }
    const destroyDepartment=await departments.destroy({where:{id:id}})
    if(!destroyDepartment)
    {
      return res.status(400).json({message:'we cant update the departemnt'})
    }
     res.status(200).json({message:'updated department is',destroyDepartment})
} catch (error) {
   return res.status(500).json({message:'some error  is occured',error:error.message}) 
}    
}