const mongoose=require('mongoose');

const jobSchema=new mongoose.Schema({

    JobTitle:{
        type:String,
        required: true,
    },

    companyName:{
        type:String,
        required:true
    },

    salary:{
        type:String,
        required:false
    },

    experience:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    }
});

const Jobs=  new mongoose.model("jobs",jobSchema);

module.exports=Jobs;