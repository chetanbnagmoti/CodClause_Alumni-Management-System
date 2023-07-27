// UserCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import "./CustomeCard.css"

const CustomeCard = ({ title, text ,backgroundColor,page}) => {
  return (
    <div className="col-lg-3 col-xl-3 col-md-4 col-sm-6 d-flex align-items-center justify-content-center">
      <Card style={{ width: '16rem', height: '16rem' , backgroundColor:backgroundColor }} className="shadow-sm rounded border border-5  m-2">
        <Card.Body className="text-center">
          <Card.Title className="title">{title}</Card.Title>
          <Card.Text className="content">{text}</Card.Text>
          <Button className="go_button">
            <NavLink  to={page} className="text-decoration-none  text-dark ">
              Go
            </NavLink>
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CustomeCard;
