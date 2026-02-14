const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const roles = sequelize.define('role', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4,

    },
    cDt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW


    },
    role: {

        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,   
            notNull: true     
        }
    },

    users_allowed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,

},
    reports_to_role: {
    type: DataTypes.STRING,
}
})
module.exports = roles
