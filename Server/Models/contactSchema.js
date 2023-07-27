const mongoose=require('mongoose');


const contactSchema=new mongoose.Schema({

       email:String,
       phone:String,
       facebook:String,
       instagram:String,
       twitter:String,
       linkedin:String,
       github:String


})

const ContactInfo=new mongoose.model("contact",contactSchema);
module.exports=ContactInfo;