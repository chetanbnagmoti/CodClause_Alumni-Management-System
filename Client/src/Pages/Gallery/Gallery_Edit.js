import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./GalleryFrom.css";
import { gallaryeditfunc, singlegallaryget } from "../../Services/API/gallaryAPI";
import { BASE_URL } from "../../Services/helper";

function GalleryEdit() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const[title,setTitle]=useState('');
 

  const navigate = useNavigate();
  const { id } = useParams();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      // If no new image is selected, keep the existing image in the preview
      setPreviewImage(selectedFile);
    }
  };

  const handldescription = (event) => {
    setDescription(event.target.value);
  };
  
  const handltitle=(event)=>{
    setTitle(event.target.value);
}

  const gallaryGet = async () => {
    try {
      const response = await singlegallaryget(id);
    //  console.log("Response For single :- ", response);
      if (response.status === 200 && response.data.length > 0) {
        setSelectedFile(response.data[0].galleryImage);
        setDescription(response.data[0].description);
        setTitle(response.data[0].title);
        setPreviewImage(`${BASE_URL}/uploads/${response.data[0].galleryImage}`);
        
      } else {
        console.log("Error fetching gallery data");
      }
    } catch (error) {
      console.log("Error fetching gallery data:", error.message);
    }
  };

  useEffect(() => {
    gallaryGet();
  }, [id]);

  useEffect(() => {
  //  console.log("Selected File:", selectedFile);
  }, [selectedFile]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  //  console.log("selectedFile :- ", selectedFile);
  //  console.log("description :- ", description);

    const data = new FormData();
    data.append("description", description);
    data.append("gallery_Image", selectedFile);
    data.append("title",title);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await gallaryeditfunc(id, data, config);
   //   console.log(response.data);
      navigate("/gallery");
    } catch (error) {
      console.log("Error editing gallery:", error.message);
    }
  };

  const handlBack = () => {
    navigate("/gallery");
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="text-center">
              <h3>Edit Gallery</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicFile">
                <Form.Label>Gallery File</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Choose a file"
                  onChange={handleFileChange}
                />
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter the Tilte" value={title} onChange={handltitle} required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the Description"
                  value={description}
                  onChange={handldescription}
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
        {previewImage && (
          <div className="selected-image">
            <img src={previewImage} alt="Selected Image" />
          </div>
        )}
      </Container>
    </>
  );
}

export default GalleryEdit;
