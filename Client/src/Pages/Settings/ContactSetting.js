import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { contactgetfunc, contactupdatefunc } from '../../Services/API/contactInfoAPI';
import { useEffect } from 'react';
import { ToastContainer,toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function ContactSetting() {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    github: '',
  });
  
  const [id,setId]=useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
                        
  const getContactData=async ()=>{
    const response =await contactgetfunc();
   
    if(response.status===200){
        setFormData(response.data[0]);
        setId(response.data[0]._id);
    }else{
        toast.error("error");
    }
    
  }
  
  useEffect(()=>{
    getContactData();
  },[]);

  const handleSubmit =async (e) => {
    e.preventDefault();
    
    const response =await contactupdatefunc(id,formData);
    if(response.status===200){
        toast.success("Successfully Saved Changes");
        setTimeout(()=>{
            navigate('/');
        },3000)
       
    }else{
        toast.error("error");
    }
    
  };

  return (
    <Container className="mt-3">
        <h3 className='text-center'>Contact Informatiom</h3>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="facebook">
              <Form.Label>Facebook</Form.Label>
              <Form.Control
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="instagram">
              <Form.Label>Instagram</Form.Label>
              <Form.Control
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="twitter">
              <Form.Label>Twitter</Form.Label>
              <Form.Control
                type="text"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="linkedin">
              <Form.Label>LinkedIn</Form.Label>
              <Form.Control
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="github">
              <Form.Label>Github</Form.Label>
              <Form.Control
                type="text"
                name="github"
                value={formData.github}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className='mt-5 text-center'>

        <Button type="submit" variant="primary">
          Save
        </Button>
        </div>
      </Form>
      <ToastContainer position="top-right" className="mt-5"/>
    </Container>
  );
}

export default ContactSetting;
