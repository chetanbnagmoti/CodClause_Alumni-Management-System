import React from "react";
import { Button, Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Headers() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const user = auth ? JSON.parse(auth) : null;

  const logout = () => {
    localStorage.clear("user");
    navigate("/login");
  };

  const isAdmin = user && user.data && user.data.is_admin === 1;

  return (
    <Navbar
      bg={isAdmin ? "primary" : "dark"} // Set different background colors for admin and normal user
      data-bs-theme={isAdmin ? "dark" : "light"} // Set different themes for admin and normal user
      expand="lg"
    >
      <Container>
      <div className="d-flex align-items-center">
          <Image
            src="./favicon1.ico"
            alt="I"
            style= {{ width: "30px", marginRight: "20px" }} // Adjust image CSS here
             // Hide the image on small screens (screens less than 576px wide)
          />
          <Navbar.Brand
            href="#home"
            className="text-left d-none d-sm-block"
            style={isAdmin ? nav : { ...nav, color: "blue" }} 
           
          >
            Alumni Management System
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="navbar-nav" className="bg-primary" />
        <Navbar.Collapse id="navbar-nav mt-1 my-sm-2">
          <Nav className="ms-auto">
            {user ? (
              <>
                {isAdmin ? (
                  <>
                    {/* Show additional buttons for admin */}
                  </>
                ) : (
                  <>
                    {/* Show these buttons for normal users */}
                    <CustomButton link="/" label="Home" />
                    <CustomButton link="/gallery-user" label="Gallery" />
                    <CustomButton link="/events-user" label="Events" />
                    <CustomButton link="/jobs-user" label="Jobs" />
                    <CustomButton link="/course-list-user" label="Courses" />
                    <Button variant="" className="mx-1">
                      <Link to={`/edit/${user.data._id}`} className="text-primary fw-bold"  style={{ textDecoration: "none" }} >Profile</Link>
                    </Button>
                  </>
                )}
                  
                <div className="my-sm-2 ms-auto mt-3">
                  <Button variant={isAdmin ? "warning" : ""}  >
                    <Nav.Link style={isAdmin ? {color:""} :{color:"red"}} onClick={logout}>Logout</Nav.Link>
                  </Button>
                </div>
              </>
            ) : (
              <div className="my-sm-2 ms-auto mt-3">
                <Button variant="info" className="mx-2">
                

                  <Link to="/login">Login</Link>

                 
                </Button>
                <Button variant="info">
                  <Link to="/register">Sign In</Link>
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
// CustomButton component to handle button styles
function CustomButton({ link, label }) {
  return (
    <Button  variant="" className="mx-1 fw-bold">
      <Link className="text-primary" to={link}>{label}</Link>
    </Button>
  );
}
export default Headers;

let nav = {
  marginLeft: "-15px",
  fontSize: "x-large",
  fontWeight: "bold",
};
