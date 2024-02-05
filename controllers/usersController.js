import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from 'jsonwebtoken';


// register or signup a user controller
const userSignup=async(req,res)=>{
    try{
        const {name,email,password}=req.body;

        // find if user already exist
        const isExist= await User.findOne({email});
        if(isExist){
            return res.status(400).json({message:"User already exist with this email!"});
        }

        // user model object
        const newUser=new User({
            name,
            email,
            password
        });

        // hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newUser.password,salt);

        newUser.password=hashedPassword;
        
        const user= await newUser.save();
        
        res.status(201).json({message:"Successfully Signup!"});
    }
    catch(error){
        res.status(500).json({message:`Error while registering ${error}`});
    }
}


// login controller
const userLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;

        // check user availability
        const user=await User.findOne({email});

        if(!user){
            return res.status(404).json({message:"User not found!"});
        }

        // check password
        const isValid=await bcrypt.compare(password, user.password);
        if(!isValid){
            return res.status(401).json({message:"Incorrect Password!"})
        }
        
        // generating jwt
        const token = jwt.sign({id:user._id},process.env.TOKEN_KEY);

        res.status(200).json({message:"Successfully Login!",token});
    }

    catch(error){
        res.status(500).json({message:`Error ${error}`});
    }
}

export {userLogin,userSignup};
