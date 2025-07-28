require('dotenv').config();
const jwt=require("jsonwebtoken")
const JWT_KEY=process.env.JWT_SECRET
const AuthHeader=(req,res,next)=>{
    const authheader=req.headers.authorization
    if (!authheader || !authheader.startsWith("Bearer ")){
        return res.status(403).json({
            msg:"Invalid Auth"
        })
    }
    const token=authheader.split(" ")[1]
    try{
        const decoded=jwt.verify(token,JWT_KEY)
        req.userId=decoded.userId
        next()
    }
    catch(err){
        res.status(403).json({
            msg:"Invalid Token"
        })
    }
}
module.exports={
    AuthHeader
}