const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const Port = process.env.PORT || 5500 ;



const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,file.originalname)
  }
})
const upload = multer({storage})




const ProductRouter = require('./routes/Products');
const UserRoute = require('./routes/Users');
const Orders = require('./routes/Order');


app.use(cors());
app.use(express.json());
connectDB();

app.use('/api/products',ProductRouter);
app.use('/api/user',UserRoute);
app.use('/api/orders',Orders);



app.post('/api/uploads',upload.single('file') ,(req,res)=>{
    res.json(req.file)
})
app.get('/',(req,res)=>{
    res.end('E-commerce App')
});

app.listen(Port , ()=>{
    console.log(`this server is running on the port ${Port}`);
})

