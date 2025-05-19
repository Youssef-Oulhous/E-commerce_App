const Product = require('../models/product');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_TOKEN = process.env.JWT_TOKEN ; 




const AddProduct = async(req , res) => {
    try{
        const {name, description, price, category,features, stock, image, brand} = req.body ;
        const newProduct = await Product({
            name,
            description,
            price,
            category,
            features,
            stock,
            image,
            brand,
            rating:0,

        });

        await newProduct.save();


        res.status(201).json({message:'the Product have been craeted successfully ', newProduct})


    } catch(err) {
        res.status(500).json({
            message:'Failed to add Product',
            error:err
        })
    }
};


const addUser = async (req,res) =>{

    try{

        const {name , email , password} = req.body ;

        const salt = await bcrypt.genSalt(10);
        const hashedPSW = await bcrypt.hash(password , salt);

       const checkEmail = await User.findOne({email});
       if(checkEmail) return res.status(400).json({message:'the user already existe'})

        const user = await User({
            name,
            email,
            password : hashedPSW ,
        });

         const token =  jwt.sign(
            {userId : user._id , username : user.name},
            JWT_TOKEN,
            {expiresIn:'7d'}
        )
        

        user.save();

        res.status(200).json({message:'the User created successfully',token});

    } catch (err) {
         res.status(500).json({
            message:'Failed to creat User',
            error:err
        })
    }
}

const userLogin = async (req,res,next) => {

    try{
        const {email,password} = req.body ; 
        
        const findUser = await User.findOne({email});
        if(!findUser) return res.status(404).json({message:'User not found'});

        const checkPSW = await bcrypt.compare(password , findUser.password );
        if(!checkPSW) return res.status(500).json({message:'the password is not correct!'});


        const token =  jwt.sign(
            {userId : findUser._id , username :findUser.name},
            JWT_TOKEN,
            {expiresIn:'7d'}
        )

        res.status(201).json({message:`welcome back ${findUser.name}`,token})




    } catch (err){
        res.status(500).json({message:err});
    }
}

const deleteUser = async(req,res) => {
    try{

        const {id} = req.params ;
        const find = await User.findByIdAndDelete(id);
        if (!find) return res.status(404).json({message:'the user not found'});

        res.status(200).json({message:'the user has been deleted successfully !'})

    } catch (err) {
        res.status(500).json({message:err});
    }
}

const getAllUser = async(req,res) => {
    try{
        
        const get = await User.find();
        if(!get) return res.status(404).json({message:'no users found'});

        res.status(200).json(get);
    } catch(err) {
        res.status(500).json({message:err});
    }

}


const getAllProducts = async(req,res) => {
    try {

        const page = parseInt(req.query.page) || 1 ;
        const limit = parseInt(req.query.limit) || 10 ;
        const skip = (page - 1 ) * limit ;


        const products = await Product.find()
        .skip(skip)
        .limit(limit)
        if(products.length === 0)return res.status(404).json({message:'no Product founded'});

        const total = await Product.countDocuments();

        res.status(200).json({
            currentpage : page,
            totalPages:Math.ceil(total / limit),
            totalProducts :total,
            products
        });


    } catch (err) {
        res.status(500).json({message:err});
    }
}

const getProductByCategory = async(req,res) =>{

    try{
        const {category} = req.query ; 
        const filterCatego = await Product.find({category});

        if (filterCatego.length === 0) return res.status(404).json({message:'No products found in this category'});

        res.status(200).json(filterCatego);

    } catch(err){
        res.status(500).json({message:err});
    }
};

const getProductByBrand =async(req,res)=>{


    try{
        const {brand} = req.query ;
        const filterBrand = await Product.find({brand});

        if (filterBrand.length === 0) return res.status(404).json({message:'No products found in this brand'});

        res.status(200).json(filterBrand);

    } catch(err){
        res.status(500).json({message:err});
    }
};

const getProductByRating = async (req,res) => {      //GET /products?order=asc
    try{

        const {order} = req.query ;
        const sortOrder = order === 'asc' ? 1 : -1;

        const products = await Product.find().sort({rating : sortOrder});

        res.status(200).json(products);

    } catch (err){
        res.status(500).json({message:err});
    }
};

const getProductById = async(req,res) => {
    try{

        const {id} = req.params ;
        const findId = await Product.findById(id);
        
        if(!findId) return res.status(404).json({message:'this product not found !'});

        res.status(200).json(findId);

    } catch(err){
        res.status(500).json({message:err});
    }
}

const deleteProduct = async(req,res) => {
    try{

        const {id} = req.params ;
        const findId = await Product.findByIdAndDelete(id);
        if(!findId) return res.status(404).json({message:'the product not found'});
        res.status(201).json({message:'the Product deleted successfully !'})

    } catch(err) {
        res.status(500).json({message:err});
    }
}


module.exports = {
    AddProduct,
    getAllProducts,
    getProductByCategory,
    getProductByBrand,
    getProductById,
    getProductByRating,
    deleteProduct,
    addUser,
    userLogin,
    getAllUser,
    deleteUser
}