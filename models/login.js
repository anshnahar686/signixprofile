const { DataTypes } = require('sequelize')
const sequilize = require('../config/connection.js')
const User_login = sequilize.define("User_login", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4,

    },
    employee_code: {
        type: DataTypes.STRING,
        allowNull: false,
      

    },
      first_name: {
         type: DataTypes.STRING,
        allowNull:false,
       
    },
    
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,

        
    },

    status: {
      

        type:DataTypes.ENUM("Active", "Inactive", "Resigned"),
           defaultValue: "Active",
            allowNull: false,
    },
    email: {
        type:DataTypes.STRING,
        unique: true,
        allowNull:false,
       
    },
    phone: {
  type: DataTypes.STRING,
  allowNull: false,

  validate: {
    notEmpty: {
      msg: "Phone number cannot be empty"
    },

    isNumeric: {
      msg: "Phone number must contain only numbers"
    },

    len: {
      args: [10, 10],
      msg: "Phone number must be exactly 10 digits"
    }
  }
},
password: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'password should contain value'
            },
          
        }
    },
   
    last_login: {
        type: DataTypes.STRING,
        default:null
    },
    otp: {
        type: DataTypes.STRING,
        default: null
    },
    otp_expiry: {
        type: DataTypes.DATE,
        default: null
    }
})
module.exports = User_login