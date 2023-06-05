const express  = require("express");
const morgan = require("morgan");
const cors  = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const blogRoute = require('./routes/blog');
const authRouter = require('./routes/auth');

const app = express();

// connect cloud database
// call from files .env
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:false
}).then(()=>console.log("เชื่อมต่อเรียบร้อย"))
.catch((err)=>console.log(err));

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//route
app.use('/api',blogRoute);
app.use('/api',authRouter);


// ถ้าไม่มีข้อมูลในตัวแปร port ให้ใช้ port 8080 แต่ถ้ามีก็ใช้ตามในตัวแปร
const port = process.env.PORT || 8080;
app.listen(port,()=>console.log(`start server in port ${port}`));