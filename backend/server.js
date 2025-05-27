const express=require("express")
const app=express()
const dotenv=require("dotenv").config() 
const connectDb=require("./config/connectiondb.js")
const cors=require("cors")
app.use(express.json())
 
const PORT =process.env.PORT || 3000
connectDb()


app.use(cors())
app.use(express.static("public"))

app.use("/",require("./routes/user.js"))
app.use("/recpie",require("./routes/recpie"))

app.listen( PORT ,(err)=>{
    console.log(`app is running on port ${PORT}`)
})