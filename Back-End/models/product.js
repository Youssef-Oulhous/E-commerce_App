const mongoose = require('mongoose');



const CreateProject = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
    },
    features:{
        type:[String],
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    stock:{
        type:String,
        required:true,
        min:0
    },
    image:{
        type:String,

    },
    brand:{
        type:String
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
      updatedAt: {
        type: Date,
        default: Date.now,
    },

});

const Product = mongoose.model('Product',CreateProject);

module.exports = Product ;