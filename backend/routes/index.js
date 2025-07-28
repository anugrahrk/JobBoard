const express=require("express")
const router=express.Router()
const UserRoute=require("./User")
const JobRoute=require("./Jobs")
router.use("/user",UserRoute)
router.use("/jobs",JobRoute)
module.exports=router