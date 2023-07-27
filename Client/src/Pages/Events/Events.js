import React from 'react'
import { useNavigate } from 'react-router-dom'
import Events_Table from './Events_Table';
import Serach from '../../Common/Serach';
import { useState } from 'react';
import { eventdeletefunc, eventsgetfunc } from '../../Services/API/eventAPI';
import { useEffect } from 'react';
import Spiner from '../../Components/Spiner/Spiner';

function Events() {
    const[eventsData,setEventData]=useState([]);
    const [search,setSearch]=useState("");
    const [page,setPage]=useState(1);
    const[pageCount,setPageCount]=useState(0); 
    const [showspin, setShowSpin] = useState(true);
    const navigate = useNavigate();
    
    const getEvents =async()=>{
        const response=await eventsgetfunc(search,page);
    //    console.log(response.data);
    //    console.log(response.data.Pagination.pageCount);
        if(response.status==200){
          setEventData(response.data.eventsData);
          setPageCount(response.data.Pagination.pageCount);
        
        }else{
          console.log("Something error in get events");
        }
    }
    
    const handleSearch = (e) => {
      setSearch(e.target.value);
   //   console.log(search);
    };
    

      //pagination
//handle prev btn:-
const handlePreBtn=()=>{
  // console.log(" Prv Btn CALL");
  setPage(()=>{
      if(page===1){
        return page;
      }
      else{
        return page-1;
      }
  })
}


//handleNextBtn:-
const handleNextBtn=()=>{
  // console.log("Next Btn CALL");
  setPage(()=>{
    if(page===pageCount){
      return page;
    }else{
      return page+1;
    }
  })
}
 
 const eventDelete= async(id)=>{
     const response=await eventdeletefunc(id);
  //   console.log(response.data);
     if(response.status===200){
      getEvents();
     }else{
      console.log("Somthing error for event delete");
     }
 }

  useEffect(()=>{
      getEvents();
      setTimeout(() => {
        setShowSpin(false);
      }, 1100);
    },[search,page]);

    const addGallry = () =>{
        navigate('/events-from');
    }

  return (
    <React.Fragment> 
    <div className="container-fluid">
    <Serach addFun={addGallry} btnName="Add Event" handleSearch={handleSearch} search={search}/>
    {
       showspin ? <Spiner /> :
    <Events_Table eventsData={eventsData}
                  eventDelete={eventDelete}
                  handlePreBtn={handlePreBtn} 
                  handleNextBtn={handleNextBtn}
                  page={page}
                  pageCount={pageCount}
                  setPage={setPage} />
    }
    </div>
</React.Fragment>
  )
}

export default Events