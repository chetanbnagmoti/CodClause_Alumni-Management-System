const mongoose=require('mongoose');

const courseSchema=new mongoose.Schema({

    courseName:{
        type:String,
        required: true,
    },

    description:{
        type:String,
        required:true
    }
});


const Course =new mongoose.model("courses",courseSchema);

module.exports=Course;
