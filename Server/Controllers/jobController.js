const Jobs = require("../Models/jobSchema");


// Add-Job:-
exports.jobpost = async (req, res) => {
   // console.log(req.body); 
    const { JobTitle,companyName,salary,experience, description } = req.body;
  
    try {
      const jobData = new Jobs({
        JobTitle: JobTitle,
        companyName: companyName,
        salary:salary,
        experience:experience,
        description:description
      });
  
      await jobData.save();
      res.status(200).json(jobData);
    } catch (error) {
      res.status(401).json(error);
      console.log(error);
    }
  };

//Get-Jobs:-
exports.jobsget=async(req,res)=>{
  //  console.log(req.query);

    const search =req.query.search || "" ;
    const page =req.query.page || 1;
    const Item_Per_Page=2;


    const query={
        description :{$regex:search,$options:"i"}
    };
    
    try {
        const skip=(page-1)*Item_Per_Page  //1*4=4
        const count =await Jobs.countDocuments(query);
      //  console.log(count);
        
        const countJobs=await Jobs.find().countDocuments();
        
        const jobsInfo=await Jobs.find();

        const jobsData=await Jobs.find(query)
       .limit(Item_Per_Page)
       .skip(skip);
  
       const pageCount=Math.ceil(count/Item_Per_Page);         //8/4=2

       res.status(200).json({
        Pagination: {
          count,
          pageCount,
          countJobs
        },
        jobsData,
        jobsInfo
      });
     } catch (error) {
       res.status(401).json(error);
     }
}; 


//Single-Job-get:-
exports.singlejobget=async(req,res)=>{
    const{id}=req.params;
    try {
        const jobSingle=await Jobs.find({_id:id});
        res.status(200).json(jobSingle);
    } catch (error) {
        res.status(401).json(error);
    }
}

//Update-Job:-
exports.jobedit=async(req,res)=>{

    const {id}=req.params;
    const { JobTitle,companyName,salary,experience, description } = req.body;
   

    try {
          
           const updatejob=await Jobs.findByIdAndUpdate({_id:id},{
            JobTitle,companyName,salary,experience, description
           },{
                  new:true
           });

           await updatejob.save();
           res.status(200).json(updatejob);

    } catch (error) {
           res.status(401).json(error); 
    }

}


//Delete-Gallery:-
exports.jobdelete=async(req,res)=>{
    const{id}=req.params;
    try {
        const deletejob=await Jobs.findByIdAndDelete({_id:id});
        res.status(200).json(deletejob); 

    } catch (error) {
        res.status(401).json(error);
    }
}