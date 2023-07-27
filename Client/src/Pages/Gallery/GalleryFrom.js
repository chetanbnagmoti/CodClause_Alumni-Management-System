import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './GalleryFrom.css';
import { gallaryAddfunc } from '../../Services/API/gallaryAPI';

function GalleryFrom() {

  const[selectedFile, setSelectedFile] = useState(null);
  const[description ,setDescription] =useState('');
  const[title,setTitle]=useState('');

  const navigate =useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handldescription=(event)=>{
        setDescription(event.target.value);
  }
  
  const handltitle=(event)=>{
      setTitle(event.target.value);
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    
  //  console.log("selectedFile :- ",selectedFile );
  //  console.log("description :- ",description);

    const data=new FormData();
    data.append("gallery_Image",selectedFile);
    data.append("description",description);
    data.append("title",title);

    const config= {
      "Content-Type":"multipart/form-data"
    }
    
    const response=await gallaryAddfunc(data,config);
    console.log(response.data);
    if(response.status===200){
      setSelectedFile("");
      setDescription("");
      setTitle("");
    }else{
      console.log("Somthing wrong");
    }


    navigate('/gallery');
  };
  
  const handlBack =() =>{
    navigate('/gallery');
  }
  return (
    <>
      <Container>
      <Row>
        <Col>
         <div className='text-center'>
               <h3>Add Gallary</h3>
         </div>
        </Col>
      </Row> 
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicFile">
                <Form.Label>Gallery File</Form.Label>
                <Form.Control type="file"  placeholder="Choose a file"  onChange={handleFileChange} required  isInvalid={!selectedFile} />
                <Form.Control.Feedback type="invalid">
                    Please choose a file.
                 </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter the Tilte" value={title} onChange={handltitle} required/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter the Description" value={description} onChange={handldescription} required/>
              </Form.Group>

             <div className='text-center'>
              <Button variant="warning" type="button" className="m-4" onClick={handlBack}>
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

export default GalleryFrom