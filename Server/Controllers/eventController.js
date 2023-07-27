const Event = require("../Models/eventSchema");
const moment = require("moment");

// Add-Event:
exports.eventpost = async (req, res) => {
 // console.log(req.body);
  const file = req.file.filename;
  const { eventName, scheduleFrom, scheduleTo, description, timeFrom, timeTo } = req.body;
  // Extract only the date part without time zone
 
  try {
    const eventData = new Event({
      banner: file,
      eventName: eventName,
      scheduleFrom: scheduleFrom,// Extracting only the date part
      scheduleTo: scheduleTo, // Extracting only the date part
      timeFrom: moment(timeFrom, 'HH:mm:ss').format('HH:mm:ss'), // Format to only store the time part
      timeTo: moment(timeTo, 'HH:mm:ss').format('HH:mm:ss'), // Format to only store the time part
      description: description,
    });

    await eventData.save();
    res.status(200).json(eventData);
  } catch (error) {
    res.status(401).json(error);
    console.log(error);
  }
};

//Get-Event:-
exports.eventsget=async(req,res)=>{
  //  console.log(req.query);

    const search =req.query.search || "" ;
    const page =req.query.page || 1;
    const Item_Per_Page=2;


    const query={
        description :{$regex:search,$options:"i"}
    };
    try {
        const skip=(page-1)*Item_Per_Page  //1*4=4
        const count =await Event.countDocuments(query);
      //  console.log(count);
        
        const countEvents=await Event.find().countDocuments();
        
        const eventsInfo=await Event.find();

        const eventsData=await Event.find(query)
       .limit(Item_Per_Page)
       .skip(skip);
  
       const pageCount=Math.ceil(count/Item_Per_Page);         //8/4=2

       res.status(200).json({
        Pagination: {
          count,
          pageCount,
          countEvents
        },
        eventsData,
        eventsInfo

      });
     } catch (error) {
       res.status(401).json(error);
     }
}; 

//Delete-Event:-
exports.eventdelete=async(req,res)=>{
    const{id}=req.params;
    try {
        const deleteEvent=await Event.findByIdAndDelete({_id:id});
        res.status(200).json(deleteEvent); 

    } catch (error) {
        res.status(401).json(error);
    }
}

//Single-Event-get:-
exports.singleEventget=async(req,res)=>{
    const{id}=req.params;
    try {
        const eventSingle=await Event.find({_id:id});
        res.status(200).json(eventSingle);
    } catch (error) {
        res.status(401).json(error);
    }
}

//Update-Gallery:-
exports.eventedit=async(req,res)=>{
    const {id}=req.params;
    const { banner,eventName, scheduleFrom, scheduleTo, description, timeFrom, timeTo } = req.body;
    const file=req.file? req.file.filename:banner;

    try {
          
           const updatEvent=await Event.findByIdAndUpdate({_id:id},{
                banner:file,eventName, scheduleFrom, scheduleTo, description, timeFrom, timeTo
           },{
                  new:true
           });

           await updatEvent.save();
           res.status(200).json(updatEvent);

    } catch (error) {
           res.status(401).json(error); 
    }

}