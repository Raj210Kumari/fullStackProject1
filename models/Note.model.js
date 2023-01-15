const mongoose=require("mongoose")



const noteSchema=mongoose.Schema({
    "titel":String,
    "note":String,
    "category":String,
    "userID":String,
})

const NoteModel=mongoose.model("note",noteSchema)

module.exports={
    NoteModel
}