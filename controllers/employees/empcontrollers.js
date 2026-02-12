const { validate } = require('uuid')
const employeess = require('../../models/employees.js')
const { where } = require('sequelize')
exports.CreateEmployee = async (req, res) => {
    try {
        const { employee, Ledgergroup, Emp_Code, Generic_Name, status, Address, pincode, latitude, longitude, DOJ, Designation, Virtual_Office, new_role, TCS, DOB, Account_Holder_Name, accountNumber, IFSC, Name_of_Bank, pan, aadhaar, dlNumber, passport, pfNumber, uanNumber, esiNumber, FullName, SignInMobile, Singn_email, Singn_password, Reports_To_Emp_id, Reports_To_Emp, role } = req.body
        if (!employee || !Ledgergroup || !Emp_Code || !Generic_Name || !status || !pincode || !DOJ || !Designation || !Virtual_Office || !Account_Holder_Name || !accountNumber || !IFSC || !Name_of_Bank || !pan || !aadhaar || !dlNumber || !passport || !pfNumber,
            !uanNumber || !esiNumber || !FullName || !SignInMobile || !role) {
            return res.status(500).json({ message: 'Missing or empty fields' })
        }
        const newuser = await employeess.create({ employee, Ledgergroup, Emp_Code, Generic_Name, status, Address, pincode, latitude, longitude, DOJ, Designation, Virtual_Office, new_role, TCS, DOB, Account_Holder_Name, accountNumber, IFSC, Name_of_Bank, pan, aadhaar, dlNumber, passport, pfNumber, uanNumber, esiNumber, FullName, SignInMobile, Singn_email, Singn_password, Reports_To_Emp_id, Reports_To_Emp, role })
        res.status(200).json({ message: 'employee is created', newuser })

    } catch (error) {
        res.status(500).json({ message: 'some error is ocuured', error: error.message })
    }
}
exports.AllEmployees = async (req, res) => {
    try {
        const alldata = await employeess.findAll()
        if (alldata.length === 0) {
            return res.status(400).json({ message: 'employees are not found' })
        }
        res.status(200).json({ message: 'all employees', alldata })
    } catch (error) {
        res.status(500).json({ message: 'some error occured', error: error.message })
    }
}
exports.SingleEmployee = async (req, res) => {
    try {
        const id = req.params.id
        if (!validate(id)) {
            return res.status(500).json({ message: 'id is invalid' })
        }
        const employee = await employeess.findByPk(id)
        if (!employee) {
            return res.status(500).json({ message: 'employee is not found' })
        }
        res.status(200).json(employee)
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}
exports.UpdateEmployee = async (req, res) => {
    try {
        const id = req.params.id
        if (!validate(id)) {
            return res.status(500).json({ message: 'id is invalid' })
        }
        const employee = await employeess.findByPk(id)
        if (!employee) {
            return res.status(500).json({ message: 'employee is not found' })
        }
        const updateemployee =await employeess.update(req.body,{where:{id:id}})
        if(!updateemployee)
        {
            return res.status(500).json({message:'employee can`t be updated'})
        }
         res.status(200).json({message:'updated user',updateemployee})
    } catch (error) {
              return res.status(500).json({message:'some error is occured',error:error.message})
    }
}
exports.DeleteEmployee=async (req,res) => {
    try {
        const id = req.params.id
        if (!validate(id)) {
            return res.status(500).json({ message: 'id is invalid' })
        }
        const employee = await employeess.findByPk(id)
        if (!employee) {
            return res.status(500).json({ message: 'employee is not found' })
        }
        const deleteuser =await employeess.destroy({where:{id:id}})
        if(!deleteuser)
        {
            return res.status(500).json({message:'employee can`t be updated'})
        }
        res.status(200).json({message:'updated user',deleteuser})
    } catch (error) {
              return res.status(500).json({message:'some error is occured',error:error.message})
    }
}