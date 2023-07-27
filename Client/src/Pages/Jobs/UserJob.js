import React from 'react'
import { useState } from 'react'
import { jobgetfunc } from '../../Services/API/JobAPI';
import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Button, Row } from 'react-bootstrap';

function UserJob() {
  const [jobsData,setJobData]=useState([]);

  const getJobData=async()=>{
    const response=await jobgetfunc();
  //  console.log(response.data);
    if(response.status===200){
      setJobData(response.data.jobsInfo);
    }else{
      console.log("Somthing is erron to get job");
    }
  }

  useEffect(()=>{
    getJobData();
  },[]);
  return (
     <>
     <div className="container-fluid mt-2 mb-3">
     <Row>
      {
          jobsData.length>0 ? (
            jobsData.map((element,index)=>{
              return(
                <div key={index+1} className='col-xl-4 col-lg-4 col-sm-6 col-md-6 border border-1 bg-dark ml-1 mt-1 mb-1'>
                <Card  style={{ width: '18rem' }} className="border border-5 mx-auto mt-2 mb-2">
                <Card.Body>
                  <Card.Title className="fw-bold text-danger mb-3 mt-1 bg-info" >{element.JobTitle}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Company Name :- {element.companyName}</Card.Subtitle>
                  <Card.Text>Exp :- {element.experience}</Card.Text>
                  <Card.Text>Salary :- {element.salary}LPA</Card.Text>
                  <Card.Text>Skills :- {element.description}</Card.Text>
                  <div className='text-center'>
                  <Button variant="primary" as="a" href="#" className="text-decoration-none ">Apply NoW</Button>

                  </div>
                 
                </Card.Body>
              </Card>
              </div>
              )
            })
          ):(
            <div>No Data Found</div>
          )
      }
     
   </Row>
     </div>
     </>
  )
}

export default UserJob