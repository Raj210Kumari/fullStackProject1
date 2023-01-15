const express=require("express")
require("dotenv").config()


const {NoteModel}= require("../models/Note.model")

const noteRoute=express.Router()

noteRoute.get("/",async(req,res)=>{
    const new_note= await NoteModel.find()
    res.send(new_note)
})

noteRoute.post("/create",async(req,res)=>{
    //verify token
    const payload=req.body
    // res.send("created the note")
    try {
        const new_note= new NoteModel(payload)
        await new_note.save()
        res.send("Created the note")
    } catch (err) {
        console.log("err")
        res.send("ERROR : Something went worng")
        
    }
})

noteRoute.patch("/update/:id", async (req,res) => {
    const payload = req.body;
    const id = req.params.id;
    const note= await NoteModel.findOne({"_id":id})
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
    try {
        // if('userId who is making request'=="userId in that particular doc")
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"your are not authorized"})
        }else{
            await NoteModel.findByIdAndUpdate({"_id":id},payload)
            res.send("Updated the note")
        }
    } catch (error) {
        res.send({"msg":"Something went wrong"})
    }
   
})

noteRoute.delete("/delete/:id", async (req,res) => {
    const payload = req.body;
    const id = req.params.id;
    const note= await NoteModel.findOne({"_id":id})
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
    try {
        // if('userId who is making request'=="userId in that particular doc")
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"your are not authorized"})
        }else{
            await NoteModel.findByIdAndDelete({"_id":id},payload)
            res.send("Delete the note")
        }
    } catch (error) {
        res.send({"msg":"Something went wrong"})
    }
})

module.exports={
    noteRoute
}