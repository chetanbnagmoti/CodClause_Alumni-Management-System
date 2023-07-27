import React from 'react'
import { useNavigate } from 'react-router-dom'
import Job_Table from './Job_Table';
import Serach from '../../Common/Serach';
import { useState } from 'react';
import { jobdeletefun, jobgetfunc } from '../../Services/API/JobAPI';
import { useEffect } from 'react';
import Spiner from '../../Components/Spiner/Spiner';

function Jobs() { 

  const[jobData,setJobData]=useState([]);
  const[search,setSearch]=useState('');
  const [page,setPage]=useState(1);
  const[pageCount,setPageCount]=useState(0);
  const [showspin, setShowSpin] = useState(true);
  const navigate = useNavigate();

  const getJobs=async()=>{
       const response=await jobgetfunc(search,page);
    //   console.log(response.data);
    //   console.log(response.data.Pagination.pageCount)
       if(response.status===200){
        setJobData(response.data.jobsData);
        setPageCount(response.data.Pagination.pageCount);
       }else{
        console.log("Error To Get Job Data");
       }
  }
   
  const jobDelete=async(id)=>{
    const response =await jobdeletefun(id);
 //   console.log(response.data);
    if(response.status===200){
      getJobs();
    }else{
      console.log("Somthing is wrong");
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
 //   console.log(search);
  };
  
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
    getJobs();
    setTimeout(() => {
      setShowSpin(false);
    }, 1100);
  },[search,page]);

  const addJob = () =>{
        navigate('/jobs-from');
  }
  return (
    <React.Fragment>
      
    <div className="container-fluid">
      <Serach addFun={addJob}  btnName="Add Job" handleSearch={handleSearch} serach={search}/> 
      {
          showspin ? <Spiner /> :
      <Job_Table  jobData={jobData}
                  jobDelete={jobDelete}
                  handlePreBtn={handlePreBtn} 
                  handleNextBtn={handleNextBtn}
                  page={page}
                  pageCount={pageCount}
                  setPage={setPage}/>
      }
    </div>
</React.Fragment>
  )
}

export default Jobs