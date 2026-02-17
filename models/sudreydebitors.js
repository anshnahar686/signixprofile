const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const sundry_debitors = sequelize.define('sundry_debitors', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4,

    },
    ledger_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
        }
    },
    ledger_group: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    alias_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alias_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('active', 'deactive', 'not_active'),
        allowNull: false,
        defaultValue: 'active',
    },
    address: {
        type: DataTypes.STRING,

    },
    pin_code: {
        type: DataTypes.UUID,
    },
    latetudes: {
        type: DataTypes.STRING,
    },
    logitudes: {
        type: DataTypes.STRING,
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
    udyam_id: {
        type: DataTypes.STRING(19),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            is: /^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/
        }
    },
    TCS: {
        type: DataTypes.INTEGER(19),
        allowNull: false,
    },
    GSt_paytype: {
        type: DataTypes.ENUM('regular', 'sez', 'exempted', 'unregistered'),
        allowNull: false,
        defaultValue: 'active',

    },
    phone_office: {
        type: DataTypes.STRING(15),
        allowNull: true,
        validate: {
            is: /^[0-9+\-() ]{6,15}$/
        }
    },
    GST: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Account_Holder_Name: {
        type: DataTypes.STRING,
        allowNull: false,
        allowNull: false,
        validate: {
            notEmpty: true,          // prevents empty strings
            len: [2, 50],            // name must be between 2 and 50 chars
            is: /^[a-zA-Z\s]+$/i     // only letters and spaces allowed
        }

    },
    accountNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: true,
            isNumeric: true,
            len: [10, 20]
        },
    },
    IFSC: {
        type: DataTypes.STRING(11),
        allowNull: false,
        validate: {
            notEmpty: true,
            is: /^[A-Z]{4}0[A-Z0-9]{6}$/   // IFSC format validation
        }
    },
    Name_of_Bank: {
        type: DataTypes.STRING,

        allowNull: false,
        validate: {
            notEmpty: true,          // prevents empty strings
            len: [2, 50],            // name must be between 2 and 50 chars
            is: /^[a-zA-Z\s]+$/i     // only letters and spaces allowed
        }

    },
    Std_Dis:{
        type:DataTypes.DECIMAL,
        allowNull:false,

    },
    min_order_amt:{
        type:DataTypes.INTEGER,
        defaultValue:'0',
        validate:{
            min:0,
        }
    },
    divison:{
        type:DataTypes.UUID,
        allowNull:false,
    },
    price_contract:{
        type:DataTypes.UUID,
        allowNull:false,
    },

    ContactName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,          // prevents empty strings
            len: [2, 50],            // name must be between 2 and 50 chars
            is: /^[a-zA-Z\s]+$/i     // only letters and spaces allowed
        }

    },
    Mobile: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            notEmpty: true,
            is: /^\d{10}$/
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,   // keep only this unique (recommended)
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,

        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    WHarea:{
        type:DataTypes.UUID,
        allowNull:false,
    },
    Delevier_Route:{
        type:DataTypes.UUID,
        allowNull:false,
    }
})
module.exports=sundry_debitors;