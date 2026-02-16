const { DataTypes } = require('sequelize');
const sequilize = require('../config/connection');
const daily_logs = sequilize.define('attendence_logs', {
    LogTypeID: {
        type: DataTypes.INTEGER
    },
    ledger_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
        }
    },
    Virtual_location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
        },

    },
    latitudes: {
        type: DataTypes.DECIMAL(2, 3),
        allowNull: false,
    },
    logititude: {
        type: DataTypes.DECIMAL(2, 3),
        allowNull: false,
    },
    gps_address: {
        type: DataTypes.STRING,
    },
    serial: {
        type: DataTypes.STRING,
    },
    Punch_Dt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Attendance_Dt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Attendence_Status_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Attendence_Status_group_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    selfie_pic:{
        type:DataTypes.BLOB
    }
})
module.exports=daily_logs;