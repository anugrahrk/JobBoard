require('dotenv').config();
const mongoose=require("mongoose")
mongoose.connect(process.env.MONGODB_URI)
const UserSchema=mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    }
})
const JobSchema=mongoose.Schema({
    company:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    date:{
        type:String,
    },
    link:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})
const User=mongoose.model("User",UserSchema)
const Job=mongoose.model("Jobs",JobSchema)
module.exports={
    User,
    Job
}