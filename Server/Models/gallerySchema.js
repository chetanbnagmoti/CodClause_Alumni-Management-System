const mongoose=require('mongoose');

const gallerySchema=new mongoose.Schema({

    galleryImage:{
        type:String,
        required: true,
    },

    description:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    }
});


const gallery =new mongoose.model("gallerys",gallerySchema);

module.exports=gallery;
