const express=require("express")
const { getRecpies,getRecpie,addRecpie,editRecpie, deleteRecpie,upload} = require("../controller/recpie")
const verifyToken=require("../middleware/auth")
const router=express.Router()

router.get("/",getRecpies) //get all the recipie
router.get("/:id",getRecpie)//get recpie by id
router.post("/",upload.single('file'),verifyToken ,addRecpie)//add recpie
router.put("/:id",upload.single('file'),editRecpie)//edit recpie

router.delete("/:id",deleteRecpie)// delete recpie

module.exports=router