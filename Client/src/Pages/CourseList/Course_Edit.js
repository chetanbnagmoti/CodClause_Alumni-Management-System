import React from 'react'
import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { singlecoursegetfun, updatecoursefun } from '../../Services/API/courseAPI';
import { useEffect } from 'react';

function Course_Edit() {
    const navigate =useNavigate();
    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    
    const { id } = useParams();
   // console.log(id);

    const handleCourseChange = (event) => {
        setCourseName(event.target.value);
      };
    
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    
    const courseGet =async()=>{
        try {
            const response =await singlecoursegetfun(id);
          //  console.log(response.data);
            if(response.status ===200){
                setCourseName(response.data[0].courseName);
                setDescription(response.data[0].description);
            }else{
                console.log("Error fetching course data:");
            }
            
        } catch (error) {
            console.log("Error fetching course data:", error.message);
        }
    }
    
    useEffect(()=>{
        courseGet();
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        
        const capitalizedCourseName = courseName.toUpperCase();
     //   console.log('Course Name:', capitalizedCourseName);

      //  console.log('Description:', description);
        const courseData={
            courseName:capitalizedCourseName,
            description:description
        }
        
        try {
            const response=await updatecoursefun(id,courseData);
        //    console.log("Update Data:- ",response.data);
            navigate('/course-list');
            
        } catch (error) {
            console.log("Error editing  course:", error.message);
        }

    };

    const handlBack =() =>{
        navigate('/course-list');
      }
      
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicCourse">
                <Form.Label>Course Name</Form.Label>
                <Form.Control type="text"  placeholder="Enter Course"  value={courseName}  onChange={handleCourseChange} required   />     
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter the Description"  value={description}  onChange={handleDescriptionChange} required/>
              </Form.Group>

             <div className='text-center'>
              <Button variant="warning" type="button" className="m-4" onClick={handlBack}>
                Back
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
             </div>
            </Form>
          </Col>
        </Row>
       
        
      </Container>
    </>
  )
}

export default Course_Edit