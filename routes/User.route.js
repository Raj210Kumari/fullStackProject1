const express= require("express")
require("dotenv").config()

const { UserModel } = require("../models/User.model")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    // const payload=req.body
    // password is inside this payload so we descructer it

    const {email, name, pass, age}=req.body
    try {
        /*
        //Technique 2 (auto-gen a salt and hash):
        bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
            // Store hash in your password DB.
        });
        */

        bcrypt.hash(pass, 5, async(err, secure_password) =>{
            // Store hash in your password DB.
            if(err){
                console.log(err)
            }else{
                const user=new UserModel({name,pass:secure_password,email,age})
                await user.save()
                res.send("Register Done")
            }
        });
    } catch (err) {
        res.send("ERRRO while registering")
        console.log(err)
    }
    
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try {
        const user=await UserModel.find({email})
        // console.log(user)

        //we this will show for both the case if user is not available in DB
        // console.log(user)
        // res.send("User found LOGIN Done")
        const hashed_pass=user[0].pass
        if(user.length>0) {
            bcrypt.compare(pass,hashed_pass,(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user[0]._id},process.env.key)
                    res.send({"mag":"User found LOGIN Done", "token":token})
                }
                else{
                    res.send("Incorrect detail Check now err")
                    // console.log("ERROR")
                }
            })
            // res.send("token:abc123")
        }
        else res.send("Incorrect detail Check now")
    } catch (err) {
        res.send("ERROR Something went worng")
        console.log(err)
    }
    // res.send("Login Done")
})


module.exports={
    userRouter
}