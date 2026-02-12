const { Sequelize } = require("sequelize");
const connection=new Sequelize('sigfix','root',"",{
    host: "localhost",
  dialect: "mysql", 
  port: 3306,
  logging: false
})
module.exports=connection;