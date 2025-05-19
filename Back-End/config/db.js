const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL ;

const connectDB = () =>{

    mongoose.connect(MONGO_URL).then(()=>{
        console.log('the MONGODB is connected successfully !')
    }).catch((err)=>{
        console.error(err)
    })
};


module.exports = connectDB ;