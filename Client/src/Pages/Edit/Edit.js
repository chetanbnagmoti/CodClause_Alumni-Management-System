import React, { useContext, useEffect, useState } from "react";
import { Card, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "./edit.css";
import Spiner from "../../Components/Spiner/Spiner";
import { editfunc, singleuserget } from "../../Services/API/Apis";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../Services/helper";
import { updateData } from "../../Components/context/ContextProvider";

const Edit = () => {
  const [inputeData, setInputeData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });
  console.log(inputeData);

  const [status, setStatus] = useState("Active");
  const [imagedata, setimagedata] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPrivewImage] = useState("");
  const [showspin, setShowSpin] = useState(true);

  const { update, setUpdate } = useContext(updateData);

  const navigate = useNavigate();
  // console.log(status);

  const { id } = useParams();
  // console.log(id);

  //Status Options:-
  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

  //setInput Data :-
  const setInputeValue = (e) => {
    const { name, value } = e.target;
    setInputeData({ ...inputeData, [name]: value });
  };

  //status set:-
  const setStatusValue = (e) => {
    //console.log(e.value);
    setStatus(e.value);
  };

  //profile set:-
  const setProfile = (e) => {
    setImage(e.target.files[0]);
    // console.log(image.name);
  };

  const userProfileGet = async () => {
    const response = await singleuserget(id);
    if (response.status == 200) {
      setInputeData(response.data);
      setStatus(response.data.status);
      setimagedata(response.data.profile);
      // console.log(response.data);
    } else {
      console.log("error");
    }
  };
  useEffect(() => {
    userProfileGet();
  }, [id]);

  useEffect(() => {
    if (image) {
      setimagedata("");
      setPrivewImage(URL.createObjectURL(image));
    }
    userProfileGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [image]);

  //submit userData:-
  const submitUserData = async (e) => {
    e.preventDefault();
    const { fname, lname, email, mobile, gender, location } = inputeData;
    if (fname === "") {
      toast.error("Plase Enter First Name");
    } else if (lname === "") {
      toast.error("Plase Enter Last Name");
    } else if (email === "") {
      toast.error("Plase Enter Email Address");
    } else if (mobile.length !== 10) {
      toast.error("Plase Enter Mobile Number");
    } else if (gender === "") {
      toast.error("Plase Enter Gender");
    } else if (location === "") {
      toast.error("Plase Enter Location");
    } else if (status === "") {
      toast.error("Plase Enter Status");
    }
    else {
      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("location", location);
      data.append("gender", gender);
      data.append("status", status);
      data.append("user_profile", image || imagedata);

      const config = {
        "Content-Type": "multipart/form-data",
      };

      const response = await editfunc(id, data, config);
      //console.log(response);
      if (response.status == 200) {
        setUpdate(response.data);
        navigate("/");
      }
    }
  };
  return (
    <React.Fragment>
      {showspin ? (
        <Spiner />
      ) : (
        <div className="container">
          <h2 className="text-center mt-1">Update Yours Details</h2>
          <Card className="shadow mt-3 p-3">
            <div className="profile_dev text-center">
              <img
                src={image ? previewImage : `${BASE_URL}/uploads/${imagedata}`}
                alt="Image"
              />
            </div>
            <Form>
              <Row>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fname"
                    placeholder="Enter First Name"
                    value={inputeData.fname}
                    onChange={setInputeValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lname"
                    placeholder="Enter Last Name"
                    value={inputeData.lname}
                    onChange={setInputeValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter Email Address"
                    value={inputeData.email}
                    onChange={setInputeValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Enter Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    placeholder="Enter Mobile Number"
                    value={inputeData.mobile}
                    onChange={setInputeValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select Your Gender</Form.Label>
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    checked={inputeData.gender == "Male" ? true : false}
                    onChange={setInputeValue}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    checked={inputeData.gender == "Female" ? true : false}
                    onChange={setInputeValue}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Other`}
                    name="gender"
                    value={"Other"}
                    onChange={setInputeValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select Status</Form.Label>
                  <Select
                    options={options}
                    defaultValue={status}
                    onChange={setStatusValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select Your Profile</Form.Label>
                  <Form.Control
                    type="file"
                    name="user_profile"
                    placeholder="Select Your Profile"
                    onChange={setProfile}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Enter Your location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    placeholder="Enter Your Location"
                    value={inputeData.location}
                    onChange={setInputeValue}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={submitUserData}
                >
                  Submit
                </Button>
              </Row>
            </Form>
          </Card>
          <ToastContainer position="top-center" />
        </div>
      )}
    </React.Fragment>
  );
};

export default Edit;
