import React, { useContext, useEffect, useState } from "react";
import "./register.css";
import { Card, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import Spiner from "../../Components/Spiner/Spiner";
import { ToastContainer, toast } from "react-toastify";
import {registerfunc} from "../../Services/API/Apis";
import { useNavigate } from "react-router-dom";
import { addData } from "../../Components/context/ContextProvider";

const Register = () => {
  const [inputeData, setInputeData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
    passout:"",
    courseGarduated:"" 
  });

  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const [previewImage, setPrivewImage] = useState("");
  const [showspin, setShowSpin] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');

  const navigate=useNavigate();
  
  const {useradd,setUseradd}=useContext(addData);

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
  
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  
    if (!passwordRegex.test(value)) {
      setPasswordError('Password must contain at least one letter, one number, and be at least 8 characters long');
    } else {
      setPasswordError('');
    }
  };

  useEffect(() => {
    if (image) {
      setPrivewImage(URL.createObjectURL(image));
    }
    setTimeout(() => {
      setShowSpin(false);
    }, 1100);
  }, [image]);

  //submit userData:-
  const submitUserData =async (e) => {
    e.preventDefault();
    const { fname, lname, email, mobile, gender, location,passout, courseGarduated} = inputeData;
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
    } else if (passout === "") {
      toast.error("Plase Enter passout");
    } else if (courseGarduated === "") {
      toast.error("Plase Enter course Garduated");
    } else if (password === "") {
        toast.error("Plase Enter password");
    } else if (image === "") {
      toast.error("Plase Enter Profile");
    } else {
      const data=new FormData();
      data.append("fname",fname);
      data.append("lname",lname);
      data.append("email",email);
      data.append("mobile",mobile);
      data.append("location",location);
      data.append("gender",gender);
      data.append("status",status);
      data.append("passout",passout);
      data.append("courseGarduated",courseGarduated);
      data.append("user_profile",image);
      data.append("password",password);

     const config= {
      "Content-Type":"multipart/form-data"
     }

      const response=await registerfunc(data,config);
      //console.log(response);
      if(response.status===200){
        setInputeData({
          ...inputeData ,
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          location: "",
          passout:"",
          courseGarduated:""

        });
        setStatus("");
        setImage("");
        setUseradd(response.data);
        setPassword("");
        navigate('/');
      }else{
        toast.error("Error");
      }
  };
}
  return (
    <React.Fragment>
      {showspin ? (
        <Spiner />
      ) : (
        <div className="container">
          <h2 className="text-center mt-1">Register Yours Details</h2>
          <Card className="shadow mt-3 p-3">
            <div className="profile_dev text-center">
              <img src={previewImage ? previewImage : "/man.png"} alt="Image" />
            </div>
            <Form>
              <Row>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicfname"
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
                  controlId="formBasiclname"
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
                  controlId="formBasicPassout"
                >
                  <Form.Label>Passout Year</Form.Label>
                  <Form.Control
                    type="text"
                    name="passout"
                    placeholder="Enter Passout Year"
                    value={inputeData.passout}
                    onChange={setInputeValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicCourdeGarduated"
                >
                  <Form.Label>Course Garduated</Form.Label>
                  <Form.Control
                    type="text"
                    name="courseGarduated"
                    placeholder="Enter Course Garduated"
                    value={inputeData.courseGarduated}
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
                  controlId="formBasicMobile"
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
                  controlId="formBasicGender"
                >
                  <Form.Label>Select Your Gender</Form.Label>
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    onChange={setInputeValue}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
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
                  controlId="formBasicStatus"
                >
                  <Form.Label>Select Status</Form.Label>
                  <Select
                    options={options}
                  
                    onChange={setStatusValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicFile"
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
                  controlId="formBasicLocation"
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
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicPassword"
                >
                  <Form.Label>Enter Your Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <label>
                  {passwordError && <div className="text-danger">{passwordError}</div>}
                  </label>
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

export default Register;
