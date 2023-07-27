const CollegeInfo = require("../Models/collegeSchema");


exports.collegepost=async(req,res)=>{
    // console.log(req.body);
    try {
        const collegeData=new CollegeInfo(req.body);
        await collegeData.save();
        res.status(200).json(collegeData);
        
    } catch (error) {
        res.status(401).json(error);
        console.log(error);
    }
}


exports.collegeget=async(req,res)=>{
    try {
        
        const collegeData=await CollegeInfo.find();
        res.status(200).json(collegeData);
        
    } catch (error) {
        res.status(401).json(error);
        console.log(error);
    }
}


exports.collegeUpdate=async(req,res)=>{
    try {
     
        const{id}=req.params;
        
        const collegeData=await CollegeInfo.findByIdAndUpdate({_id:id} ,req.body,{
            new:true
     });
        const saveData= await collegeData.save();
        res.status(200).json(saveData);

        
    } catch (error) {
        res.status(401).json(error);
        console.log(error);
    }
}