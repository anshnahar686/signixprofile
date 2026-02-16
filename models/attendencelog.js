const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const daily_logs = sequelize.define('attendence_logs', {
        id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
  LogTypeID: {
    type: DataTypes.INTEGER
  },
  ledger_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Virtual_location: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  latitudes: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: false
  },
  logititude: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: false
  },
  gps_address: {
    type: DataTypes.STRING
  },
  serial: {
    type: DataTypes.STRING
  },
  Punch_Dt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Attendance_Dt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Attendence_Status_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Attendence_Status_group_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  selfie_pic: {
    type: DataTypes.BLOB
  }
});

module.exports = daily_logs;