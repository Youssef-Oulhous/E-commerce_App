const mongoose = require('mongoose');



const UserCreation = new mongoose.Schema({
    name:{
        type:String ,
        required:[true,'the name is required']
    },
    email:{
        type:String,
        required:[true,'the email is required'],
        trim:true,
        // match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'the password is required']
    }
});


const User = mongoose.model('User', UserCreation);

module.exports = User ;