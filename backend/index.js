const express=require("express")
const app=express()
const port=process.env.PORT || 3000
const MainRoute=require("./routes/index")

const cors=require("cors")
app.use(cors())
app.use(express.json())
app.use("/",MainRoute)

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})
