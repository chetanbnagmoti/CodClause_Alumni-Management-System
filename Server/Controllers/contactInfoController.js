const ContactInfo = require("../Models/contactSchema")



exports.contactpost=async(req,res)=>{
    // console.log(req.body);
    try {
        const contactData=new ContactInfo(req.body);
        await contactData.save();
        res.status(200).json(contactData);
        
    } catch (error) {
        res.status(401).json(error);
        console.log(error);
    }
}

exports.contactget=async(req,res)=>{
    try {
        
        const contactData=await ContactInfo.find();
        res.status(200).json(contactData);
        
    } catch (error) {
        res.status(401).json(error);
        console.log(error);
    }
}

exports.contactgetsingle=async(req,res)=>{
    try {
        
        const{id}=req.params;
        
        const contactData=await ContactInfo.find({_id:id});
        res.status(200).json(contactData);
        
    } catch (error) {
        res.status(401).json(error);
        console.log(error);
    }
}

exports.contactUpdate=async(req,res)=>{
    try {
     
        const{id}=req.params;
        
        const contactData=await ContactInfo.findByIdAndUpdate({_id:id} ,req.body,{
            new:true
     });
        const saveData= await contactData.save();
        res.status(200).json(saveData);

        
    } catch (error) {
        res.status(401).json(error);
        console.log(error);
    }
}