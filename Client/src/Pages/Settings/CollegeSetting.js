import React, { useState, useEffect } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import { collegegetfunc, collegeupdatefunc } from '../../Services/API/collegeInfoAPI';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function CollegeSetting() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    collegeName: '',
    addressLine1: '',
    addressLine2: '',
    district: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
  });

  const [ID, setId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getCollegeData = async () => {
    const response = await collegegetfunc();
    if (response.status === 200) {
      setFormData(response.data[0]);
      setId(response.data[0]._id);
    } else {
        toast.error("error");
    }
  };

  useEffect(() => {
    getCollegeData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await collegeupdatefunc(ID, formData);
      toast.success('Successfully Updated !!!');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
        toast.error(error);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <h3 className="text-center mb-4">College Information</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="collegeName">
          <Form.Label>College Name</Form.Label>
          <Form.Control
            type="text"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Row className="mt-1 mb-1">
          <div className="col-lg-6 col-xl-6 col-sm-12 col-md-12">
            <Form.Group controlId="addressLine1">
              <Form.Label>Address Line 1</Form.Label>
              <Form.Control
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col-lg-6 col-xl-6 col-sm-12 col-md-12">
            <Form.Group controlId="addressLine2">
              <Form.Label>Address Line 2</Form.Label>
              <Form.Control
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
        </Row>
        <Row className="mt-1 mb-1">
          <div className="col-lg-6 col-xl-6 col-sm-12 col-md-12">
            <Form.Group controlId="district">
              <Form.Label>District</Form.Label>
              <Form.Control
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col-lg-6 col-xl-6 col-sm-12 col-md-12">
            <Form.Group controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>
        </Row>
        <Row className="mt-1 mb-1">
          <div className="col-lg-6 col-xl-6 col-sm-12 col-md-12">
            <Form.Group controlId="pincode">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col-lg-6 col-xl-6 col-sm-12 col-md-12">
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>
        </Row>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div className="mt-3 text-center">
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </div>
      </Form>
      <ToastContainer position="top-right mt-5" autoClose={3000} />
    </div>
  );
}

export default CollegeSetting;
