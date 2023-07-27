import React from 'react'
import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { courseaddfunc } from '../../Services/API/courseAPI';

function Course_From() {
    const navigate =useNavigate();
    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    
    const handleCourseChange = (event) => {
        setCourseName(event.target.value);
      };
    
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    

    const handleSubmit = async(event) => {
        event.preventDefault();
      
        const capitalizedCourseName = courseName.toUpperCase();
      //  console.log('Course Name:', capitalizedCourseName);
      //  console.log('Description:', description);
        
        const courseData={
          courseName:capitalizedCourseName,
          description:description
        }

        try {
          const response =await courseaddfunc(courseData);
        //  console.log(response.data);
          if(response.status===200){
            setCourseName("");
            setDescription("");
          }
          navigate('/course-list');

        } catch (error) {
          console.log("Error To ADD Course" ,error.data);
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

export default Course_From