const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");
const Employees = require("./employees.js");

const Attendence = sequelize.define("attendence", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },

  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employees,
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  },

  date: {
    type: DataTypes.DATEONLY,   // ✅ better for attendance
    allowNull: false,
    defaultValue: DataTypes.NOW // ✅ FIXED
  },

  checkInTime: {
    type: DataTypes.DATE,
    allowNull: false
  },

  checkoutTime: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isAfterCheckIn(value) {
        if (this.checkInTime && value <= this.checkInTime) {
          throw new Error("Checkout must be after check-in");
        }
      }
    }
  },

  status: {
    type: DataTypes.ENUM(
      "PRESENT",
      "ABSENT",
      "LATE",
      "ON_LEAVE",
      "HALF_DAY",
      "HOLIDAY"
    ),
    allowNull: false,
    defaultValue: "PRESENT"
  }
});

Attendence.belongsTo(Employees, {
  foreignKey: "employee_id",
  as: "employee"
});

module.exports = Attendence;
