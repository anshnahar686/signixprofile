const { DataTypes } = require('sequelize')
const sequilize = require('../config/connection')
const Employees = sequilize.define('employees', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
      
        defaultValue: DataTypes.UUIDV4,

    },
    employee: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,          // prevents empty strings
            len: [2, 50],            // name must be between 2 and 50 chars
            is: /^[a-zA-Z\s]+$/i     // only letters and spaces allowed
        }


    },
    Ledgergroup: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }

    },
    Emp_Code: {
        type: DataTypes.STRING,
        allowNull: false,
      
    },
    Generic_Name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },

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
    DOJ: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: true
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [4, 40],
            is: /^[a-zA-Z\s]+$/i

        }
    },
    Designation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [4, 40],
            is: /^[a-zA-Z\s]+$/i

        }
    },
    Virtual_Office: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [4, 40],
            is: /^[a-zA-Z\s]+$/i

        }
    },
    new_role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [4, 40],
            is: /^[a-zA-Z\s]+$/i

        }
    },
    TCS: {
        type: DataTypes.INTEGER,

    },
    DOB: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: true
        }
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
        unique: true,
        validate: {
            notEmpty: true,              // must not be blank
            isNumeric: true,             // only digits allowed
            len: [10, 20]                // length between 10 and 20 digits
        }
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
    dlNumber: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
            is: /^[A-Z]{2}[0-9]{2}[0-9A-Z]{11,13}$/
        }
    },
    passport: {
        type: DataTypes.STRING(8),
        allowNull: false,
        validate: {
            is: /^[A-Z][0-9]{7}$/
        }
    },
    pfNumber: {
        type: DataTypes.STRING(22),
        allowNull: false,
        validate: {
            is: /^[A-Z]{2}[A-Z]{3}[0-9]{7}[0-9]{3}[0-9]{6,7}$/
        }
    },
    uanNumber: {
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
            is: /^\d{12}$/
        }
    },
    esiNumber: {
        type: DataTypes.STRING(17),
        allowNull: false,
        validate: {
            is: /^\d{17}$/
        }
    },
    FullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,          // prevents empty strings
            len: [2, 50],            // name must be between 2 and 50 chars
            is: /^[a-zA-Z\s]+$/i     // only letters and spaces allowed
        }

    },
    SignInMobile: {
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
            notEmpty: true,
            is: /^\d{12}$/
        }
    },
    Singn_email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    Singn_password: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    Reports_To_Emp_id: {
        type: DataTypes.STRING,


        validate: {
            notEmpty: true,
        }
    },
    Reports_To_Emp: {
        type: DataTypes.STRING,


        validate: {
            notEmpty: true,
        }

    },
    pic: {
        type: DataTypes.BLOB,
    },
    photo: {
        type: DataTypes.BLOB,
    },
    Face_Pic: {
        type: DataTypes.BLOB
    }




})
module.exports = Employees;