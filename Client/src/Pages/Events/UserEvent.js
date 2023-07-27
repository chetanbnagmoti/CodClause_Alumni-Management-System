import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { eventsgetfunc } from '../../Services/API/eventAPI';
import { BASE_URL } from '../../Services/helper';

function UserEvent() {
  const [eventdata, setEventData] = useState([]);

  const getEventData = async () => {
    const response = await eventsgetfunc();
  //  console.log(response.data);
    if (response.status === 200) {
      setEventData(response.data.eventsInfo);
    } else {
      console.log('Something error to get events');
    }
  };

  useEffect(() => {
    getEventData();
  }, []);
  
  // Function to extract date part from the ISO date string
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toDateString(); // Returns only the date part as a human-readable string
  };
   
  // Function to format time in AM/PM format
  const formatTime = (isoTimeString) => {
    const date = new Date(isoTimeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div className="container-fluid mt-2 mb-3">
        <Row xs={1} md={2} className="g-4">
          {eventdata.length > 0 ? (
            eventdata.map((event, index) => (
              <Col key={index+1}>
                <Card className="border border-5">
                  <Card.Img variant="top" src={`${BASE_URL}/uploads/${event.banner}`} style={{width:"100%",height:"200px"}} />
                  <Card.Body>
                  <Card.Title className="text-center text-danger fw-bold display-6 bg-info">{event.eventName}</Card.Title>
                  <Card.Text className="text-center fw-bolder">{event.description}</Card.Text>
                  <div className='container-fluid'>
                       <div className='row'>
                        <div className='col-6'>
                        <Card.Footer> Schedule Date :- {formatDate(event.scheduleFrom)}</Card.Footer>
                      
                        </div>
                        <div className='col-6'>
                        <Card.Footer> Schedule Date :- {formatDate(event.scheduleTo)}</Card.Footer>
                        </div>
                       </div>
                       <div className='row'>
                         <div className='col-12 text-center'>

                         <Card.Footer>Time: {event.timeFrom}</Card.Footer>
                         </div>
                       </div>
                  </div>

               
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <div>Not Found Event</div>
          )}
        </Row>
      </div>
    </>
  );
}

export default UserEvent;
