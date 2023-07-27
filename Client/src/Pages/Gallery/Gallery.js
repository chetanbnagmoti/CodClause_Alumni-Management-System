import React from 'react'
import { useNavigate } from 'react-router-dom'
import Gallery_Table from './Gallery_Table';
import Serach from '../../Common/Serach';
import { gallaerydeletefun, gallarygetfun } from '../../Services/API/gallaryAPI';
import { useEffect } from 'react';
import { useState } from 'react';
import Spiner from '../../Components/Spiner/Spiner';

function Gallery() {
  const navigate = useNavigate();

  const [gallaryData,setGallaryData]=useState([]);
  const [search,setSearch]=useState(""); 
  const [page,setPage]=useState(1);
  const[pageCount,setPageCount]=useState(0);
  const [showspin, setShowSpin] = useState(true);
  
  const gallaryGet= async()=>{
        const response=await gallarygetfun(search,page);
      //  console.log(response);
      //  console.log(response.data.Pagination.pageCount);
        if(response.status===200){
          setGallaryData(response.data.galleryData);
          setPageCount(response.data.Pagination.pageCount);
        }else{
          console.log("error to get gallaery data")
        }
  }
  
  const handleSearch = (e) => {
    setSearch(e.target.value);
  //  console.log(search);
  };


   const gallaryDelete=async(id)=>{
    const response =await gallaerydeletefun(id);
  //  console.log(response);
    if(response.status===200){
      gallaryGet();
    }else{
      console.log("Somthing is wrong");
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
    gallaryGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1100);
  },[search,page])

  const addGallry = () =>{
        navigate('/gallery-from');
  }

  return (
    <React.Fragment>
      <div className="container-fluid">
        <Serach addFun={addGallry} btnName="Add Gallry" handleSearch={handleSearch} search={search}/>
         {
          showspin ? <Spiner /> :
        <Gallery_Table    gallaryData={gallaryData} 
                          gallaryDelete={gallaryDelete} 
                          handlePreBtn={handlePreBtn} 
                          handleNextBtn={handleNextBtn}
                          page={page}
                          pageCount={pageCount}
                          setPage={setPage} />
                        } 
      </div>
    </React.Fragment>
  );
}

export default Gallery