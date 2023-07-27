import React from "react";
import { Button, Card, Carousel } from "react-bootstrap";
import { BASE_URL } from "../../Services/helper";

function AlumniCardsImage({ name, imagepath ,course,email,mobile,location}) {
  return (
    <div className="container-fluid text-center">
      <p className="fs-2 fw-bold text-primary">Alumnis</p>
      <div className="row">
        <div className="col-12 mb-2 mt-2">
          <Card style={{ width: '20rem' ,margin:"auto"}} >
            <Card.Img variant="top" src={`${BASE_URL}/uploads/${imagepath}`} style={imageStyle}/>
            <Card.Body>
              <Card.Title className="text-primary fw-bolder fs-2">{name}</Card.Title>
              <Card.Subtitle className="text-danger">{course}</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
              <div className="row">
              <Card.Subtitle className="text-info fs-4">Contact</Card.Subtitle>
                   <Card.Text className="fw-bold">{email}</Card.Text>
                   <Card.Text className="fw-bold">{mobile}</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AlumniCardsImage;

let imageStyle={
  width:"100%",
  height:"250px",
  borderRadius: "50%",
  border: "5px solid black",
  margin:"auto"
}