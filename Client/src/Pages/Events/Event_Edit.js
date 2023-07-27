import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./Event_Edit.css";
import { useState } from "react";
import {
  eventupdatefunc,
  singleEventgetfunc,
} from "../../Services/API/eventAPI";
import { useEffect } from "react";
import { BASE_URL } from "../../Services/helper";

function Event_Edit() {
  const [eventName, setEventName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [scheduleFrom, setScheduleFrom] = useState("");
  const [scheduleTo, setScheduleTo] = useState("");
  const [scheduleTimeFrom, setScheduleTimeFrom] = useState("");
  const [scheduleTimeTo, setScheduleTimeTo] = useState("");
  const [description, setDescription] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const navigate = useNavigate();

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

  const { id } = useParams();
  console.log(id);

  const getSingleEvent = async () => {
    const response = await singleEventgetfunc(id);
   // console.log(response.data);
    const setDateFrom = new Date(response.data[0].scheduleFrom)
      .toISOString()
      .split("T")[0];
    const setDateTo = new Date(response.data[0].scheduleTo)
      .toISOString()
      .split("T")[0];
    if (response.status == 200) {
      setEventName(response.data[0].eventName);
      setScheduleFrom(setDateFrom);
      setScheduleTo(setDateTo);
      setScheduleTimeFrom(response.data[0].timeFrom);
      setScheduleTimeTo(response.data[0].timeTo);
      setDescription(response.data[0].description);
      setSelectedFile(response.data[0].banner);
      setPreviewImage(`${BASE_URL}/uploads/${response.data[0].banner}`);
    }
  };

  useEffect(() => {
    getSingleEvent();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Capitalize the event name before submitting
    const capitalizedEventName = eventName.toUpperCase();
  
    // Print all the form data
    // console.log("Event Name:", capitalizedEventName);
    // console.log("Schedule From Date:", scheduleFrom);
    // console.log("Schedule To Date:", scheduleTo);
    // console.log("Schedule Time From:", scheduleTimeFrom);
    // console.log("Schedule Time To:", scheduleTimeTo);
    // console.log("Selected File:", selectedFile || previewImage);
    // console.log("Description:", description);
  
    const data = new FormData();
    data.append("banner", selectedFile || previewImage); // Use selectedFile if available, otherwise use the existing previewImage
    data.append("eventName", capitalizedEventName);
    data.append("scheduleFrom", scheduleFrom);
    data.append("scheduleTo", scheduleTo);
    data.append("timeFrom", scheduleTimeFrom);
    data.append("timeTo", scheduleTimeTo);
    data.append("description", description);
  
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  
    try {
      const response = await eventupdatefunc(id, data, config);
    //  console.log(response.data);
      navigate("/events");
    } catch (error) {
      console.log("Error editing gallery:", error.message);
    }
  };
  
  const handlBack = () => {
    navigate("/events");
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="text-center">
              <h3>Edit Event</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEvent">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Event"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicScheduleFrom"
                  >
                    <Form.Label>Schedule From</Form.Label>
                    <Form.Control
                      type="Date"
                      className="w-100"
                      placeholder="Enter Event From Date"
                      value={scheduleFrom}
                      onChange={(e) => setScheduleFrom(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicScheduleTo">
                    <Form.Label>Schedule To</Form.Label>
                    <Form.Control
                      type="Date"
                      className="w-100"
                      placeholder="Enter Event To Date"
                      value={scheduleTo}
                      onChange={(e) => setScheduleTo(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicTimeFrom">
                    <Form.Label>Time From</Form.Label>
                    <Form.Control
                      type="time"
                      className="w-100"
                      placeholder="Enter Event From Date"
                      value={scheduleTimeFrom}
                      onChange={(e) => setScheduleTimeFrom(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicTimeTo">
                    <Form.Label>Time To</Form.Label>
                    <Form.Control
                      type="time"
                      className="w-100"
                      placeholder="Enter Event To Date"
                      value={scheduleTimeTo}
                      onChange={(e) => setScheduleTimeTo(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="formBasicFile">
                <Form.Label>Event Banner</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Choose a file"
                  onChange={handleFileChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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

export default Event_Edit;
