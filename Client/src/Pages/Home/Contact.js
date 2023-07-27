import React from "react";
import { contactgetfunc } from "../../Services/API/contactInfoAPI";
import { useEffect } from "react";
import { useState } from "react";
import { collegegetfunc } from "../../Services/API/collegeInfoAPI";

function Contact() {
    
    const [contactData, setContactData] = useState({
    email: '',
    phone: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    github: '',
  });
   
  const [collegeData, setCollegeData] = useState({
    collegeName: '',
    addressLine1: '',
    addressLine2: '',
    district: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
  });

   const getContactData=async ()=>{
    const response =await contactgetfunc();
  //  console.log("conatct :-",response.data[0]);
    if(response.status===200){
        setContactData(response.data[0]);
    }else{
       console.log("error");
    }
    
  }
  const getCollegeData = async () => {
    const response = await collegegetfunc();
    if (response.status === 200) {
      setCollegeData(response.data[0]);
     
    } else {
      console.log("error");
    }
  };
    useEffect(()=>{
    getContactData();
    getCollegeData();
  },[]);

  return (
    <div className="container-fluid mt-5 mb-3">
      
      <div className="row  justify-content-center">
        <div className="col-lg-6 col-md-6 col-sm-6 col-xl-6  d-flex flex-column align-items-center justify-content-center my-3">
          <div className="text-primary fs-2 text-center fw-bold">{collegeData.collegeName}</div>
          <div className="text-center">
          <p>
            {collegeData.addressLine1}
            <br />
             {collegeData.addressLine2}
            <br />
            {collegeData.district + " , "+collegeData.state + " , "+ collegeData.pincode} 
          </p>
          <p>Email: {collegeData.email}</p>
          <p>Phone: {collegeData.phone}</p>

          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-6 col-xl-6  d-flex flex-column align-items-center justify-content-center my-3">
          <p>Connect with us:</p>
          <div className="">
            <a
              href={contactData.email}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-envelope mx-3 "></i>
            </a>
            <a
              href={contactData.phone}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-solid fa-phone mx-3"></i>
            </a>
            <a href={contactData.facebook} target="_blank" rel="noopener noreferrer">
              <i className="fa fa-brands fa-facebook mx-3"></i>
            </a>
            <a href={contactData.instagram} target="_blank" rel="noopener noreferrer">
              <i className="fa fa-brands fa-instagram mx-3"></i>
            </a>
            <a href={contactData.twitter} target="_blank" rel="noopener noreferrer">
              <i className="fa fa-brands fa-twitter mx-3"></i>
            </a>
            <a href={contactData.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-brands fa-linkedin mx-3"></i>
            </a>
            <a href={contactData.github} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-brands fa-github mx-3"></i>
            </a>
          </div>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
}

export default Contact;
