const Course = require("../Models/courseSchema");
const  crudUtil=require("./utility/crudUtil");

// Add-gallery:-
exports.coursepost = async (req, res) => {
 // console.log(req.body); 
  const { courseName, description } = req.body;

  try {
    const courseData = await crudUtil.createData(Course,{courseName, description});
    res.status(200).json(courseData);
  } catch (error) {
    res.status(401).json(error);
    console.log(error);
  }
};

//Get-Gallery:-
exports.courseget=async(req,res)=>{
  //  console.log(req.query);

    const search =req.query.search || "" ;
    const page =req.query.page || 1;
    const Item_Per_Page=2;


    const query={
        description :{$regex:search,$options:"i"}
    };
    
    try {
        const skip=(page-1)*Item_Per_Page  //1*4=4
        const count =await Course.countDocuments(query);
      //  console.log(count);
        
        const countCourses=await Course.find().countDocuments();
        
        const courseInfo=await Course.find();
        
        const courseData=await Course.find(query)
       .limit(Item_Per_Page)
       .skip(skip);
  
       const pageCount=Math.ceil(count/Item_Per_Page);         //8/4=2

       res.status(200).json({
        Pagination: {
          count,
          pageCount,
          countCourses
        },
        courseData,
        courseInfo
      });
     } catch (error) {
       res.status(401).json(error);
     }
}; 


//Delete-Gallery:-
exports.coursedelete=async(req,res)=>{
    const{id}=req.params;
    try {
        const deleteCourse=await Course.findByIdAndDelete({_id:id});
        res.status(200).json(deleteCourse); 

    } catch (error) {
        res.status(401).json(error);
    }
}

//Single-Gallery-get:-
exports.singlecourseget=async(req,res)=>{
    const{id}=req.params;
    try {
        const courseSingle=await Course.find({_id:id});
        res.status(200).json(courseSingle);
    } catch (error) {
        res.status(401).json(error);
    }
}

//Update-Gallery:-
exports.courseedit=async(req,res)=>{
    const {id}=req.params;
    const {courseName,description}=req.body;
   

    try {
          
           const updatecourse=await Course.findByIdAndUpdate({_id:id},{
            courseName,description
           },{
                  new:true
           });

           await updatecourse.save();
           res.status(200).json(updatecourse);

    } catch (error) {
           res.status(401).json(error); 
    }

}