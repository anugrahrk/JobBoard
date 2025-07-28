require('dotenv').config();
const express=require("express")
const router=express.Router()
const zod=require("zod")
const {AuthHeader}=require("../Middleware")
const {User,Job}=require("../db")

router.get("/",AuthHeader,async(req,res)=>{
    const jobs=await Job.find({
        userId:req.userId
    })
    if (!jobs){
        return res.status(403).json({
            msg:"No Jobs Found"
        })
    }
    return res.status(200).json({
        jobs
    })
})

router.put("/edit",AuthHeader,async(req,res)=>{
    const JobId=req.query.JobId
    if(!JobId){
        res.status(400).json({
            msg:"Jobid is required"
        })
    }
    const JobExist=await Job.findOne({
        _id:JobId,
        userId:req.userId
    })
    if(!JobExist){
        return res.status(403).json({
            msg:"No job/user found"
        })
    }
    const Updateddata={
    company:req.body.company,
    position:req.body.position,
    status:req.body.status,
    link:req.body.link,
    date:req.body.date
    }
    try{
    const JobUpdate=await Job.updateOne({
        _id:JobId
    },{$set:Updateddata})
    return res.status(200).json({
        msg:"Updated Sucessfully"
    })
}
catch(err){
    res.status(400).json({
        msg:"Server error",
        error:err.message
    })
}
})
router.delete('/delete',AuthHeader,async (req,res)=>{
    const JobId=req.query.JobId
    const findJob=await Job.findOne({
        _id:JobId
    })
    if(!findJob){
        return res.status(403).json({
            msg:"No job Found of the same id"
        })
    }
    const deleteJob=await Job.deleteOne({
        _id:JobId
    })
    res.status(200).json({
        msg:"Job Successfully deleted"
    })
})

router.post("/add",AuthHeader,async(req,res)=>{
    const UserExist=await User.findOne({
        _id:req.userId
    })
    if(!UserExist){
        return res.status(403).json({
            msg:"User Not Found"
        })
    }
    const CreateJob=await Job.create({
        userId:req.userId,
        company:req.body.company,
        position:req.body.position,
        status:req.body.status,
        date:req.body.date,
        link:req.body.link
    })
    return res.status(200).json({
        msg:"Job Created Successfully"
    })
})
router.get("/search",AuthHeader,async(req,res)=>{
    const filter=req.query.filter || ""
    const jobs=await Job.find({
        $or:[
            {
                company:{"$regex":filter, $options: "i" }
            },
            {
                position:{"$regex":filter, $options: "i" }
            }
        ]
    })
    res.json({
        job:jobs.map(job=>({
            company:job.company,
            position:job.position,
            status:job.status,
            date:job.date,
            link:job.link,
            _id:job._id
        }))
    })
})
module.exports=router