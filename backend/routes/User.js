
require('dotenv').config();
const express=require("express")
const router=express.Router()
const zod=require("zod")
const jwt= require("jsonwebtoken")
const JWT_SECRET=process.env.JWT_SECRET
const {User,Job}=require("../db")
const AuthMware=require("../Middleware")

const zodSchema=zod.object({
    email:zod.string(),
    password:zod.string().min(6),
    fullname:zod.string()
})

router.post("/signup",async(req,res)=>{
    const {success}=zodSchema.safeParse(req.body)
    if(!success){
        return res.status(403).json({
            msg:"Invalid Data"
        })
    }
    const UseExist=await User.findOne({
        email:req.body.email
    })
    if(UseExist){
        return res.status(403).json({
            msg:"User Already Exist"
        })
    }
    const NewUser=await User.create({
        email:req.body.email,
        fullname:req.body.fullname,
        password:req.body.password
    })
    return res.status(200).json({
        msg:"User Created"
    })
})

const UserSchema=zod.object({
    email:zod.string().email(),
    password:zod.string().min(6)
})
router.post("/signin",async(req,res)=>{
    const {success}=UserSchema.safeParse(req.body)
    if (!success){
        return res.status(403).json({
            msg:"Inavlid Inputs"
        })
    }
    const ValidUser=await User.findOne({
        email:req.body.email,
        password:req.body.password
    })
    if (ValidUser){
        const userId=ValidUser._id
        const token=jwt.sign({userId},JWT_SECRET)
        return res.status(200).json({
            token:token,
            userId:ValidUser._id
        })
    }
    return res.status(200).json({
        msg:"User doesnot Exist"
    })
})
module.exports=router