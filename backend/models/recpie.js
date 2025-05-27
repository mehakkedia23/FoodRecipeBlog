const mongoose=require("mongoose")

const recpieSchema=mongoose.Schema({
     title:{
        type:String,
        required:true
     },
     ingredients:{
        type:Array,
        required:true
     },
     instruction:{
        type:String,
        required:true
     },
     time:{
        type:String,
       
     },
     coverImage:{
        type:String,
        
     }
    
},{timestamps:true})

module.exports=mongoose.model("Recpies",recpieSchema)