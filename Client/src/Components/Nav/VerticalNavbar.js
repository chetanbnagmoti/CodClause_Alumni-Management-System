import React from 'react';
import { Link } from 'react-router-dom';
import './VerticalNavbar.css' ;
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useState } from 'react';

const VerticalNavbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const auth = localStorage.getItem("user");
  const user = auth ? JSON.parse(auth) : null;

  const handleNavCollapse = () => {
    setIsNavExpanded(false);
  };

  const isAdmin = user && user.data && user.data.is_admin === 1;

  return (
  <> 
      <Navbar
      className="vertical-navbar"
      variant="light"
      expand="sm"
      expanded={isNavExpanded}
      onToggle={() => setIsNavExpanded((prevExpanded) => !prevExpanded)}
    >
      <Container>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
      <Nav className="flex-column">
            <Nav.Item >
              <Nav.Link as={Link} to="/" onClick={handleNavCollapse}>
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/gallery" onClick={handleNavCollapse}>
                Gallery
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/course-list" onClick={handleNavCollapse}>
                Course List
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/alumni-list" onClick={handleNavCollapse}>
                Alumni List
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/jobs" onClick={handleNavCollapse}>
                Jobs
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/events" onClick={handleNavCollapse}>
                Events
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/users" onClick={handleNavCollapse}>
                Users
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/settings" onClick={handleNavCollapse}>
                System Settings
              </Nav.Link>
            </Nav.Item>
          </Nav>
    </Navbar.Collapse>
    </Container>
    </Navbar>
  </>



  );
};

export default VerticalNavbar;
