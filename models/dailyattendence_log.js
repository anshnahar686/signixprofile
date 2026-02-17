const { DataTypes } = require('sequelize');
const sequilize = require('../config/connection');

const attendence_logs = sequilize.define('dailyattendence_logs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
       
        autoIncrement:true
    },
    Attendance_Dt: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
        }
    },
    leger_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
        }
    },
    time_slot: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
        }
    },
    Attendence_Status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
        }
    },
    First_IN: {
        type: DataTypes.TIME,
    },
    Last_OUT: {
        type: DataTypes.TIME,
    },
    LogTypeID: {
        type: DataTypes.INTEGER
    },
    desination: {
        type: DataTypes.STRING,
    },
    department: {
        type: DataTypes.STRING,
    },
    Virtual_Office: {
        type: DataTypes.STRING,
    },
    Branch: {
        type: DataTypes.STRING,
    },
    DOJ: {
        type: DataTypes.DATE
    }
});

module.exports = attendence_logs;