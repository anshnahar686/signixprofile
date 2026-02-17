const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const Department=sequelize.define('department',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        
        autoIncrement:true

    },
     cDt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW


    },
    department:{
         type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,   
            notNull: true     
        }
    },
    HOD:{
        type:DataTypes.STRING,
    },

})
module.exports=Department