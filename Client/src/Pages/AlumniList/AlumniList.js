import React from 'react'

import Alumni_Table from './Alumni_Table'

import { useState } from 'react'
import { alumnigetfun } from '../../Services/API/alumniAPI';
import { useEffect } from 'react'
import Spiner from '../../Components/Spiner/Spiner'

function AlumniList() {
  const[alumnidata,setAlumniData]=useState([]);
  const [search,setSearch]=useState("");
  const [page,setPage]=useState(1);
  const[pageCount,setPageCount]=useState(0); 
  const [showspin, setShowSpin] = useState(true);

  const getAlumniData=async()=>{
    const response=await alumnigetfun(search,page);
   // console.log(response.data);
    if(response.status===200){
      setAlumniData(response.data.activeUsers);
      setPageCount(response.data.Pagination.pageCount);
    }else{
      console.log("error somthing to fecth data");
    }
  }
  
  
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
  useEffect(()=>{
    getAlumniData();
    setTimeout(() => {
      setShowSpin(false);
    }, 1100);
  },[search,page]);

  return (
    <React.Fragment>
      
    <div className="container-fluid">
     {

          showspin ? <Spiner /> :
                 <Alumni_Table alumnidata={alumnidata} 
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

export default AlumniList