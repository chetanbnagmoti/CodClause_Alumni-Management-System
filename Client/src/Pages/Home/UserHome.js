import React from "react";
import { Row } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import Cursole from "./Cursole";
import UserAlumni from "../AlumniList/UserAlumni";
import Contcat from "./Contact";




function UserHome() {
  return (
    <>
      <div className="container-fluid bg-dark ">
        <Row>
          <div className="col-12 bg-dark mt-3">
           <Cursole />
          </div>
          <div className="text-white">
            <Contcat />
          </div>
          <div className="mt-5">
           <UserAlumni />
          </div>
        </Row>
      </div>
    </>
  );
}

export default UserHome;
