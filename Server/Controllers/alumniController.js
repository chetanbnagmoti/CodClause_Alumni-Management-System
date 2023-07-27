const users = require("../Models/userSchema");


// Get-Active-Users:-
exports.getActiveUsers = async (req, res) => {
  //  console.log(req.query);
    
  try {
    const activeUsers = await users.find({ status: "Active" });
    const count = await users.find({ status: "Active" }).countDocuments();
   

    res.status(200).json({
        count,
        activeUsers,
      });
  } catch (error) {
    res.status(401).json(error);
  }
};


//count-alumnai:-
exports.countAlumnifun=async(req,res)=>{
    try {
        const count =await users.find({ status: "Active" }).countDocuments();
      //  console.log(count);
        res.status(200).json(count);
    } catch (error) {
        res.status(401).json(error);
    }
}



