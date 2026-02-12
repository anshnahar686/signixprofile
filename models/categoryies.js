const { DataTypes } = require('sequelize')
const sequilize = require('../config/connection.js')
const ProductCategory = sequilize.define('category', {

    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
  cDt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },

    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: false,
            notEmpty: false,
        }
    },
    publish_Id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
     publish: {
        type: DataTypes.ENUM('Y','N'),
        allowNull: false,
        unique: true,
        
    },
      SeqNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        
    },
    description:{
type: DataTypes.TEXT,
    },
    pic:{
        type:DataTypes.BLOB,
        allowNull:false,

    },
    banner:{
        type:DataTypes.BLOB,
        allowNull:false,
        
    }

}, {
    timestamps: false
});
module.exports=ProductCategory