import React, { useEffect, useState } from "react";
import "./profile.css";
import { Card, Row } from "react-bootstrap";
import Spiner from "../../Components/Spiner/Spiner";
import { singleuserget } from "../../Services/API/Apis";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../Services/helper";
import moment from "moment";

const Profile = () => {
  const [showspin, setShowSpin] = useState(true);
  const [userprofile,setUserprofile]=useState({});

  const { id } = useParams();
  // console.log(id);

  const userProfileGet = async () => {
    const response = await singleuserget(id);
    if(response.status==200){
      setUserprofile(response.data);
    }else{
      console.log("error");
    }
    // console.log(user);
  };

  useEffect(() => {
    userProfileGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, []);

  return (
    <React.Fragment>
      {showspin ? (
        <Spiner />
      ) : (
        <div className="container mt-5">
          <Card className="card-profile shadow col-lg-6 mx-auto mt-5">
            <Card.Body>
              <Row>
                <div className="col">
                  <div className="card-profile-status d-flex justify-content-center">
                  <img src={`${BASE_URL}/uploads/${userprofile.profile}`} alt="image" />
                  </div>
                </div>
              </Row>
              <div className="text-center">
                <h3>{userprofile.fname+ " "+userprofile.lname}</h3>
                <h4>
                  <i className="fa-regular fa-envelope email"></i>&nbsp; :-{" "}
                  <samp>{ userprofile.email}</samp>{" "}
                </h4>
                <h4>
                  <i className="fa-thin fa-mobile-screen"></i>&nbsp; :-{" "}
                  <samp>{userprofile.mobile}</samp>
                </h4>
                <h4>
                  <i className="fa-solid fa-person"></i>&nbsp; :- <samp>{userprofile.gender}</samp>
                </h4>
                <h4>
                  <i className="fa-solid fa-location-dot location"></i>&nbsp; :-{" "}
                  <samp>{userprofile.location}</samp>
                </h4>
                <h4>
                  Status &nbsp; :- <samp>{userprofile.status}</samp>
                </h4>
                <h4>
                  <i className="fa-regular fa-calendar calender"></i>&nbsp; Date
                  Created &nbsp; :- <samp>{moment(userprofile.datecreated).format("DD-MM-YYYY")}</samp>
                </h4>
                <h4>
                  <i className="fa-regular fa-calendar calender"></i>&nbsp; Date
                  Updated &nbsp; :- <samp>{moment(userprofile.datecreated).format("DD-MM-YYYY")}</samp>
                </h4>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </React.Fragment>
  );
};

export default Profile;
