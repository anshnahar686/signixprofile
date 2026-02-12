const { DataTypes } = require('sequelize')
const Orders=require('./order.js')
const sequilze = require('../config/connection.js')
const customers = sequilze.define('customers', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,          // prevents empty strings
            len: [2, 50],            // name must be between 2 and 50 chars
            is: /^[a-zA-Z\s]+$/i     // only letters and spaces allowed
        }
    },
    Gst: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
            isDecimal: true,
            notNull: true
        }
    },
    mobile_number:{
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
            notEmpty: true,
            is: /^\d{10}$/
        }
    },
    email:{
        type:DataTypes.STRING,
        allowNull:true,
        validate:{
            notNull:false,
        }

    },
    City:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    State:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
   Location:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
      Country:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'IN',
        validate:{
            notEmpty:true,
        }
    },
    Transportation_Mode: {
  type: DataTypes.ENUM('ROAD', 'AIR', 'SEA', 'RAIL'),
  allowNull: false,
  validate: {
    isIn: [['ROAD', 'AIR', 'SEA', 'RAIL']]
  }
},
Remark: {
  type: DataTypes.STRING,
  allowNull: true,
  validate: {
    len: [0, 255] // limit remark length
  }
},
registernumber_number: {
  type: DataTypes.JSON,
  allowNull: false,
  validate: {
    isValidArray(value) {
      if (!Array.isArray(value)) {
        throw new Error('Must be an array of registration numbers');
      }
      value.forEach(num => {
        if (!/^[A-Z0-9-]+$/.test(num)) {
          throw new Error(`Invalid registration number: ${num}`);
        }
      });
    }
  }
}
})

module.exports=customers