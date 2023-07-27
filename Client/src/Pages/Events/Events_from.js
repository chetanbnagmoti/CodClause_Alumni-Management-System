import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Events_from.css';
import { useState } from 'react';
import { eventAddfunc } from '../../Services/API/eventAPI';

function Events_from() {
 
  const [eventName,setEventName]=useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [scheduleFrom, setScheduleFrom] = useState('');
  const [scheduleTo, setScheduleTo] = useState('');
  const [scheduleTimeFrom, setScheduleTimeFrom] = useState('');
  const [scheduleTimeTo, setScheduleTimeTo] = useState('');
  const [description, setDescription] = useState('');
 
  const navigate=useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    
   
    const capitalizedEventName = eventName.toUpperCase();
  
    // Print all the form data
    // console.log('Event Name:', capitalizedEventName);
    // console.log('Schedule From Date:', scheduleFrom);
    // console.log('Schedule To Date:', scheduleTo);
    // console.log('Schedule Time From:', scheduleTimeFrom);
    // console.log('Schedule Time To:', scheduleTimeTo);
    // console.log('Selected File:', selectedFile);
    // console.log('Description:', description);
    
    const data=new FormData();
    data.append("banner",selectedFile);
    data.append("eventName",capitalizedEventName);
    data.append("scheduleFrom",scheduleFrom);
    data.append("scheduleTo",scheduleTo);
    data.append("timeFrom",scheduleTimeFrom);
    data.append("timeTo",scheduleTimeTo);
    data.append("description",description);
    
    const config= {
      "Content-Type":"multipart/form-data"
    }
    
    const response=await eventAddfunc(data,config);
  //  console.log(response.data);
    if(response.status===200){
      setDescription("");
      setEventName("");
      setScheduleFrom("");
      setScheduleTimeFrom("");
      setScheduleTimeTo("");
      setScheduleTo("");
      setSelectedFile("");
    }else{
      console.log("Somthing wrong");
    }
     
    
    navigate('/events');
  };
  

  const handlBack =() =>{
    navigate('/events');
  }

  return (
    <>
      <Container>
      <Row>
        <Col>
         <div className='text-center'>
               <h3>Add Event</h3>
         </div>
        </Col>
      </Row> 
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEvent">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Event"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicScheduleFrom"
                  >
                    <Form.Label>Schedule From</Form.Label>
                    <Form.Control
                      type="Date"
                      className="w-100"
                      placeholder="Enter Event From Date"
                      value={scheduleFrom}
                      onChange={(e) => setScheduleFrom(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicScheduleTo">
                    <Form.Label>Schedule To</Form.Label>
                    <Form.Control
                      type="Date"
                      className="w-100"
                      placeholder="Enter Event To Date"
                      value={scheduleTo}
                      onChange={(e) => setScheduleTo(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicTimeFrom"
                  >
                    <Form.Label>Time From</Form.Label>
                    <Form.Control
                      type="time"
                      className="w-100"
                      placeholder="Enter Event From Date"
                      value={scheduleTimeFrom}
                      onChange={(e) => setScheduleTimeFrom(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicTimeTo">
                    <Form.Label>Time To</Form.Label>
                    <Form.Control
                      type="time"
                      className="w-100"
                      placeholder="Enter Event To Date"
                      value={scheduleTimeTo}
                      onChange={(e) => setScheduleTimeTo(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="formBasicFile">
                <Form.Label>Event Banner</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Choose a file"
                  onChange={handleFileChange}
                  required
                  isInvalid={!selectedFile}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a file.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the Description"
                  onChange={(e)=>setDescription(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button
                  variant="warning"
                  type="button"
                  className="m-4"
                  onClick={handlBack}
                >
                  Back
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>

        {selectedFile && (
          <div className="selected-image">
            <img src={URL.createObjectURL(selectedFile)} alt="Selected Image" />
          </div>
        )}
      </Container>
    </>
  );
}

export default Events_from