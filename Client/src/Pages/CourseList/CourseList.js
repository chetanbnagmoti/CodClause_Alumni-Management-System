import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import Course_Table from './Course_Table';
import Serach from '../../Common/Serach';
import { useEffect } from 'react';
import { coursedeletefun, coursegetfun } from '../../Services/API/courseAPI';
import { useState } from 'react';
import Spiner from '../../Components/Spiner/Spiner';

function CourseList() {
    
  const [courseData,setCourseData]=useState([]);
  const [search,setSearch]=useState(""); 
  const [page,setPage]=useState(1);
  const[pageCount,setPageCount]=useState(0);
  const [showspin, setShowSpin] = useState(true);

    const navigate = useNavigate();

    const addCourse = () =>{
          navigate('/course-from');
    }
    
    const courseGet= async()=>{
      const response=await coursegetfun(search,page);
    //  console.log(response);
    //  console.log(response.data.Pagination.pageCount)
      if(response.status===200){
        setCourseData(response.data.courseData);
        setPageCount(response.data.Pagination.pageCount);
      }else{
        console.log("error to get gallaery data")
      }
    }
    
    const courseDelete=async(id)=>{
      const response =await coursedeletefun(id);
    //  console.log(response.data);
      if(response.status===200){
        courseGet();
      }else{
        console.log("Somthing is wrong");
      }
    }

    const handleSearch = (e) => {
      setSearch(e.target.value);
      console.log(search);
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
      courseGet();
      setTimeout(() => {
        setShowSpin(false);
      }, 1100);
    },[search,page])

  return (
    <React.Fragment>
      
    <div className="container-fluid">
     <Serach addFun={addCourse} btnName="Add Course" handleSearch={handleSearch} />
     {
       showspin ? <Spiner /> :
     <Course_Table courseData={courseData}
                   courseDelete={courseDelete}
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

export default CourseList