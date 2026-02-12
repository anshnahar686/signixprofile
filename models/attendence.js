const { DataTypes } = require('sequelize')
const sequilize=require('../config/connection.js')
const Employees=require('./employees.js')
const Attendence=sequilize.define('attendence',{
      id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
  },

  employee_id: {
    type: DataTypes.UUID,
    allowNull: false,
      references: {
            model: Employees,
            key: 'id'
        }
  },
  date:{
     type: DataTypes.DATE,
     allowNull:false,
     defaultValue:Date
  },
  checkInTime: {
  type: DataTypes.DATE,
  allowNull: false,
  validate: {
    notNull: { msg: "Check-in time is required" },
    isDate: { msg: "Check-in must be a valid date" }
  }
},
checkoutTime: {
  type: DataTypes.DATE,
  allowNull: false,
  validate: {
    notNull: { msg: "Checkout time is required" },
    isDate: { msg: "Checkout must be a valid date" },
    isAfterCheckIn(value) {
      if (this.checkInTime && value <= this.checkInTime) {
        throw new Error("Checkout must be after check-in");
      }
    }
  }
},
status: {
  type: DataTypes.ENUM("PRESENT", "ABSENT", "LATE", "ON_LEAVE", "HALF_DAY", "HOLIDAY"),
  allowNull: false,
  validate: {
    notNull: { msg: "Attendance status is required" },
    isIn: {
      args: [["PRESENT", "ABSENT", "LATE", "ON_LEAVE", "HALF_DAY", "HOLIDAY"]],
      msg: "Invalid attendance status"
    }
  },
  defaultValue:"PRESENT"
}
})
Attendence.belongsTo(Employees, {
  foreignKey: "employee_id",   // ✅ use the actual FK column
  as: "employee"
});


module.exports=Attendence