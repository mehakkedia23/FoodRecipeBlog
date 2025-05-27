
const Recpies=require("../models/recpie.js")
const multer =require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + file.fieldname
      cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage })
const getRecpies=async(req,res)=>{
     const recpies=await Recpies.find()

     return res.json(recpies);


}

const getRecpie=async(req,res)=>{
    const recpie=await  Recpies.findById(req.params.id)
    res.json(recpie)

}

const addRecpie= async(req,res)=>{
  console.log(req.user)
  const {title,ingredients,instruction,time}=req.body

  if(!title || !ingredients ||!instruction ){
       res.json({message:" required fields cant be empty"})
  }
  const newRecpie =await Recpies.create({
    title,ingredients,instruction,time,coverImage:req.file.filename

  })
  return res.json(newRecpie)
}


const editRecpie=async(req,res)=>{
    const {title,ingredients,instruction,time}=req.body
    let recpie=await Recpies.findById(req.params.id)
   try {if(recpie){
        await Recpies.findByIdAndUpdate(req.params.id,req.body,{new : true})
        res.json({title,ingredients,instruction,time})
    }
}catch(err){
    return res.status(404).json({message:"error  "})
}
    

}
const deleteRecpie=async(req,res)=>{
  try{ const delrecpie=await Recpies.findByIdAndDelete(req.params.id);

   if(!delrecpie)
   {
    return res.status(404).json({
        message:"recpie not found"
    });
   }

       res.json({
        message:"recpie deleted succesfully",
        delrecpie:delrecpie
       });
   }catch(err){
      res.ststus(500).json({
        message:"error deleting recpie",
      })
   }

}

module.exports={getRecpies,getRecpie,addRecpie,editRecpie,deleteRecpie,upload}