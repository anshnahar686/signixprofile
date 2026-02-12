const sequilizer = require('../config/connection.js')
const { DataTypes } = require('sequelize')
const Level_2 = sequilizer.define('level_2', {
   id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4,

    },
    leader_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    Ledgergroup: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }

    },
    alias_Code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[A-Z0-9]+$/,   // only uppercase alphanumeric
            len: [3, 20]         // between 3 and 20 characters
        }

    },
    alias_Name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[A-Z0-9]+$/,   // only uppercase alphanumeric
            len: [3, 20]         // between 3 and 20 characters
        }
    },
    status: {

        type: DataTypes.ENUM("Active", "Inactive", "Resigned"),
        defaultValue: "Active",
        allowNull: false,
    },
    Address: {
        type: DataTypes.TEXT,
    },
    pincode: {
        type: DataTypes.STRING(6),
        allowNull: false,
        validate: {
            notEmpty: true,
            is: /^[1-9][0-9]{5}$/   // must be a valid 6-digit PIN
        }
    },
    latitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false,
        validate: {
            min: -90,
            max: 90
        }
    },
    longitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false,
        validate: {
            min: -180,
            max: 180
        }
    },
    pan: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            is: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
        }
    },
    aadhaar: {
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
            is: /^\d{12}$/
        }
    },
    gst: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
        validate: {
            is: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
            len: [15, 15]
        }
    },
    Std_Dis: {

        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
            min: 0,
            max: 100,
            isDecimal: true
        }
    },
    contact_Name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    beat: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },

})
module.exports=Level_2