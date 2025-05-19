const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const Port = process.env.PORT || 5500 ;

const ProductRouter = require('./routes/Products');
const UserRoute = require('./routes/Users')


app.use(cors());
app.use(express.json());
connectDB();

app.use('/api/products',ProductRouter);
app.use('/api/user',UserRoute);

app.get('/',(req,res)=>{
    res.end('E-commerce App')
});

app.listen(Port , ()=>{
    console.log(`this server is running on the port ${Port}`);
})

