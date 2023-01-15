const express= require("express")
// const connection= require("mongoose")
const {connection}=require("./configs/db")
const {userRouter}=require("./routes/User.route")
const {noteRoute}=require("./routes/Note.route")
const {authenticate}=require("./middleware/authenticate.middleware")
const cors=require("cors")

const app=express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})


app.get("/about",(req,res)=>{
    res.send("About API")
})

app.get("/contact",(req,res)=>{
    res.send("Contact Now")
})

app.get("/data",(req,res)=>{
    const token=req.query.token
    if(token==="abc123"){
        res.send("Data...")
    }
    else{
        res.send("Login First")
    }
})

app.get("/cart",(req,res)=>{
    const token=req.query.token
    if(token==="abc123"){
        res.send("Cart Page")
    }
    else{
        res.send("Login First")
    }
    
})

//no need of aunthenticate for users
app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRoute)

app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connected to DB")
        
    } catch (err) {
        console.log("ERROR connecting to DB")
        console.log(err)
    }
    console.log("SERVER IS RUNNING ON POST 8080")
})


