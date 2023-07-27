const mongoose=require('mongoose');


const collegeSchema=new mongoose.Schema({

       email:String,
       pincode:String,
       phone:String,
       district:String,
       state:String,
       addressLine2:String,
       addressLine1:String,
       collegeName:String


})

const CollegeInfo=new mongoose.model("college",collegeSchema);
module.exports=CollegeInfo;