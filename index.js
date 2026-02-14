const express=require('express')
const path=require('path')
const dotenv=require('dotenv').config({path:'./config/config.env'})
const sequilze=require('./config/connection.js')
const router=require('./routes/userroutes.js')
const employee=require('./routes/employee.js')
const attendence=require('./routes/attendence.js')
const category=require('./routes/category.js')
const cookieeParser=require('cookie-parser')
const cors=require('cors')
const app=express()
const controllers=require('./authentication/checkauthentication.js')
const orders=require('./routes/order.js')
const orderslist=require('./routes/orderlist.js')
const customers=require('./routes/customers.js')
const products=require('./routes/product.js')
const products_item=require('./routes/order_items.js')
const roles=require('./routes/roles.js')
const department=require('./routes/department.js')
app.use(cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true       ,
    methods:['GET','POST','PUT','DELETE']         // required for cookies
}));
app.use(express.json())


app.use(cookieeParser())
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
)
app.get('/api/check-auth',controllers.CheckAuthentication)
app.use('/api/attendence',attendence)
app.use('/api/user/',router)//user
app.use('/api/employee/',employee)//employees
app.use('/api/customer/',customers)//customers
app.use('/api/orders/',orders)//orders
app.use('/api/orderList/',orderslist)//orderlist
app.use('/api/product/',products)//products
app.use('/api/orderitems/',products_item)//products
app.use('/api/category/',category)//products
app.use('/api/departmet/',department)//roles
app.use('/api/roles/',roles)//roles
const PORT=process.env.PORT||8080
app.listen(PORT,()=>{
    sequilze.authenticate().then(()=>{
        console.log("database is connected")
    }).catch((err)=>{
        console.log(err)
    })
      sequilze.sync({force:true}).then(()=>{
        console.log("tables are connectd")
    }).catch((err)=>{
        console.log(err)
    })
    console.log('server is started')
})