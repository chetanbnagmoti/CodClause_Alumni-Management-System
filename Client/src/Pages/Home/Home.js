import React from 'react'
import Row from 'react-bootstrap/Row';
import CustomeCard from './CustomeCard';
import { useState } from 'react';
import { alumnigetfun } from '../../Services/API/alumniAPI';
import { useEffect } from 'react';
import { usergetfun } from '../../Services/API/Apis';
import { eventsgetfunc } from '../../Services/API/eventAPI';
import { jobgetfunc } from '../../Services/API/JobAPI';
import { coursegetfun } from '../../Services/API/courseAPI';
import { gallarygetfun } from '../../Services/API/gallaryAPI';

function Home() {
   const[countAlumni,setCountAlumni]=useState(0);
   const[countUsers,setCountUsers]=useState(0);
   const[countEvent,setCountEvent]=useState(0);
   const[countJobs,setCountJobs]=useState(0);
   const[countCourses,setCountCourses]=useState(0);
   const[countGallary,setCountGallary]=useState(0);

   const getCountAlumni=async()=>{
    const response=await alumnigetfun();
    if(response.status===200){
      setCountAlumni(response.data.activecount);
    }
   }
   
   const getCountUsers=async()=>{
    const response=await usergetfun();
   // console.log(response.data);
    if(response.status===200){
      setCountUsers(response.data.Pagination.countUsers);
    }
   }
   
   const getCountEvent=async()=>{
    const response=await eventsgetfunc();
    if(response.status===200){
      setCountEvent(response.data.Pagination.countEvents);
    }
   }

   const getCountJob=async()=>{
    const response=await jobgetfunc();
    if(response.status===200){
      setCountJobs(response.data.Pagination.countJobs);
    }
   }

   const getCountCourse=async()=>{
    const response=await coursegetfun();
    if(response.status===200){
      setCountCourses(response.data.Pagination.countCourses);
    }
   }

   const getCountGallary=async()=>{
    const response=await gallarygetfun();
    if(response.status===200){
      setCountGallary(response.data.Pagination.countGallary);
    }
   }
   
   
   
   useEffect(()=>{
    getCountAlumni();
    getCountUsers();
    getCountEvent();
    getCountJob();
    getCountCourse();
    getCountGallary();
   },[])

  return (
    <React.Fragment>
      <div className="container-fluid mt-5">
        <Row>
        <CustomeCard title="Users" text={countUsers} page="/Users" backgroundColor="rgb(221, 126, 126)" />
        <CustomeCard title="Alumni" text={countAlumni} page="/alumni-list" backgroundColor="rgb(211, 159, 201)" />
        <CustomeCard title="Events" text={countEvent} page="/events" backgroundColor="rgb(110, 163, 159)" />
        <CustomeCard title="Jobs" text={countJobs} page="/jobs" backgroundColor="rgb(214, 207, 142)" />
        </Row>
        <Row>
        <CustomeCard title="Course" text={countCourses} page="/course-list" backgroundColor="rgb(110, 163, 159)" />
        <CustomeCard title="Gallery" text={countGallary} page="/gallery" backgroundColor="rgb(214, 207, 142)" />
        </Row>
      </div>
    </React.Fragment>
  );
}

export default Home