import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { singlejobgetfun, updatejobfun } from '../../Services/API/JobAPI';

function Job_Edit() {

    const [jobName, setJobName] = useState('');
    const [description, setDescription] = useState('');
    const [companyName,setCompanyName]=useState('');
    const [salary,setSalary]=useState(0);
    const [experience,setExperience]=useState(0);
    const [errorMessageExperienc, setErrorMessageExperienc] = useState('');
    const [errorMessagesalary, setErrorMessagesalary] = useState('');

    const navigate =useNavigate();
    

    const handleExperienceChange = (event) => {
        const inputValue = event.target.value;
        const isValidInput = /^[0-9-]*$/.test(inputValue);
    
        // Update the state only if the input is valid (contains only numbers and the minus sign)
        if (isValidInput) {
          setExperience(inputValue);
          setErrorMessageExperienc('');
        } else {
          setErrorMessageExperienc('Invalid characters. Please use only numbers (0-9) and the minus sign (-).');
        }
      };

    const handleSalaryChange = (event) => {
        const inputValue = event.target.value;
        const isValidInput = /^[0-9-]*$/.test(inputValue);
    
        // Update the state only if the input is valid (contains only numbers and the minus sign)
        if (isValidInput) {
          setSalary(inputValue);
          setErrorMessagesalary('');
        } else {
            setErrorMessagesalary('Invalid characters. Please use only numbers (0-9) and the minus sign (-).');
        }
      };
    
    const {id} =useParams();
  //  console.log(id);

    const getjobsingle=async()=>{
         const  response =await singlejobgetfun(id);
    //     console.log(response);
         if(response.status===200){
          setJobName(response.data[0].JobTitle);
          setCompanyName(response.data[0].companyName);
          setDescription(response.data[0].description);
          setSalary(response.data[0].salary);
          setExperience(response.data[0].experience);
         }else{
          console.log("Somthing error with get single job");
         }
    }
    
    useEffect(()=>{
      getjobsingle();
    },[id]);

    const handleSubmit = async(event) => {
        event.preventDefault();
        
        const JobTitleCaptile=jobName.toUpperCase();

        const jobData={
          JobTitle:JobTitleCaptile,
          companyName:companyName,
          salary:salary,
          experience:experience,
          description:description
         }
        
        const response=await updatejobfun(id,jobData);
        if(response.status===200){
          setJobName("");
          setCompanyName("");
          setDescription("");
          setSalary("");
          setExperience("");
          navigate('/jobs');
        } 
        
       
    };

    const handlBack =() =>{
        navigate('/jobs');
      }
  return (
    <>
    <Container>
    <Row>
        <Col>
        <div className='text-center'>
             <h3>Job Edit</h3>
        </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicJob">
              <Form.Label>Job Title</Form.Label>
              <Form.Control type="text"  placeholder="Enter Job"  value={jobName}  onChange={(e)=>setJobName(e.target.value)} required   />     
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCompany">
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text"  placeholder="Enter Company"  value={companyName}  onChange={(e)=>setCompanyName(e.target.value)} required   />     
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSalary">
              <Form.Label>Salary</Form.Label>
              <Form.Control type="text"  placeholder="Enter Salary"  value={salary}  onChange={handleSalaryChange} required   />  
              {errorMessagesalary && <div className="error-message">{errorMessagesalary}</div>}      
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicExperience">
              <Form.Label>Experience</Form.Label>
              <Form.Control type="text"  placeholder="Enter Experience"  value={experience}  onChange={handleExperienceChange} required   />  
              {errorMessageExperienc && <div className="error-message">{errorMessagesalary}</div>}   
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter the Description"  value={description}  onChange={(e)=>setDescription(e.target.value)} required/>
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

export default Job_Edit