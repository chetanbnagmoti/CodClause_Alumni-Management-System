import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Settings() {
  
  const navigate=useNavigate();
 
  const collegeSetting=()=>{
      navigate('/college-setting');
  }

  const contactSetting=()=>{
    navigate('/contact-setting');
}

  return (
    <Container fluid className="d-flex justify-content-center align-items-center mt-5">
      <div className="d-grid gap-3">
        <Button variant="primary" size="lg" onClick={collegeSetting}>
          College Settings
        </Button>
        <Button variant="secondary" size="lg" onClick={contactSetting}>
          Contact Settings
        </Button>
      </div>
    </Container>
  );
}

export default Settings;
