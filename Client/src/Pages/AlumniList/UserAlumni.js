import React from 'react';
import { useState, useEffect } from 'react';
import { alumnigetfun } from '../../Services/API/alumniAPI';
import { Carousel, Card, Button } from 'react-bootstrap';
import AlumniCardsImage from './AlumniCardsImage';

function UserAlumni() {
  const [AlumniData, setAlumniData] = useState([]);

  const getAlumniData = async () => {
    const response = await alumnigetfun();
   // console.log(response.data);
    if (response.status === 200) {
      setAlumniData(response.data.activeUsers);
    } else {
      console.log('Something is wrong to get alumni data');
    }
  };

  useEffect(() => {
    getAlumniData();
  }, []);

  return (
    <>
      <div className="container-fluid mt-2 mb-3 bg-dark">
        <Carousel fade>
          {AlumniData.length > 0 ? (
            AlumniData.map((element, index) => (
              <Carousel.Item key={index} interval={2000}>
                <AlumniCardsImage name={element.fname+" "+element.lname} 
                                  imagepath={element.profile} 
                                  course={element.courseGarduated}
                                  email={element.email}
                                  mobile={element.mobile}
                                  location={element.location}/>
                                  
                
              </Carousel.Item>
            ))
          ) : (
            <Carousel.Item>
              <div>No Data Found</div>
            </Carousel.Item>
          )}
        </Carousel>
      </div>
    </>
  );
}

export default UserAlumni;