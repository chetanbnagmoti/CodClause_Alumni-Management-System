const gallery = require("../Models/gallerySchema");

const BASE_URL=process.env.BASE_URL;

//Add-gallery:-
exports.gallerypost = async (req, res) => {
    const file = req.file.filename;
    const { description,title} = req.body;
  
    try {
      const galleryData = new gallery({
        galleryImage: file,
        description,
        title,
      });
  
      await galleryData.save();
      res.status(200).json(galleryData);
    } catch (error) {
      res.status(401).json(error);
      console.log(error);
    }
  };

//Get-Gallery:-
exports.galleryget=async(req,res)=>{
  //  console.log(req.query);

    const search =req.query.search || "" ;
    const page =req.query.page || 1;
    const Item_Per_Page=2;


    const query={
        description :{$regex:search,$options:"i"}
    };
    try {
        const skip=(page-1)*Item_Per_Page  //1*4=4
        const count =await gallery.countDocuments(query);
      //  console.log(count);
        
        const countGallary=await gallery.find().countDocuments();
        
        const galleryInfo=await gallery.find();
        
        const galleryData=await gallery.find(query)
       .limit(Item_Per_Page)
       .skip(skip);
  
       const pageCount=Math.ceil(count/Item_Per_Page);         //8/4=2

       res.status(200).json({
        Pagination: {
          count,
          pageCount,
          countGallary
        },
        galleryData,
        galleryInfo
      });
     } catch (error) {
       res.status(401).json(error);
     }
}; 

//Delete-Gallery:-
exports.gallerydelete=async(req,res)=>{
    const{id}=req.params;
    try {
        const deleteGallary=await gallery.findByIdAndDelete({_id:id});
        res.status(200).json(deleteGallary); 

    } catch (error) {
        res.status(401).json(error);
    }
}

//Single-Gallery-get:-
exports.singlegallaryget=async(req,res)=>{
    const{id}=req.params;
    try {
        const gallerySingle=await gallery.find({_id:id});
        res.status(200).json(gallerySingle);
    } catch (error) {
        res.status(401).json(error);
    }
}

//Update-Gallery:-
exports.gallaryedit=async(req,res)=>{
    const {id}=req.params;
    const {gallery_Image,description,title}=req.body;
    const file=req.file? req.file.filename:gallery_Image;

    try {
          
           const updategallary=await gallery.findByIdAndUpdate({_id:id},{
                 galleryImage:file,description,title
           },{
                  new:true
           });

           await updategallary.save();
           res.status(200).json(updategallary);

    } catch (error) {
           res.status(401).json(error); 
    }

}