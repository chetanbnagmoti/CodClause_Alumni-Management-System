import React from "react";
import { useState } from "react";
import { coursegetfun } from "../../Services/API/courseAPI";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row } from "react-bootstrap";

function UserCourse() {
  const [couserData, setCourseData] = useState([]);

  const getCourseData = async () => {
    const response = await coursegetfun();
  //  console.log(response.data);
    if (response.status === 200) {
      setCourseData(response.data.courseInfo);
    } else {
      console.log("Somthing erro to get course info");
    }
  };

  useEffect(() => {
    getCourseData();
  }, []);

  return (
    <>
      <div className="container-fluid mt-2 mb-3">
        <Row>
          {couserData.length > 0 ? (
            couserData.map((element, index) => {
              return (
                <div
                  key={index + 1}
                  className="col-xl-12 col-lg-12 col-sm-12 col-md-12 ml-1 mt-1 mb-1"
                >
                  <Card className="mx-5 mb-2 mt-2">
                    <Card.Header className="text-dark bg-primary text-center">{element.courseName}</Card.Header>
                    <Card.Body>
                      <Card.Title>{element.courseName}</Card.Title>
                      <Card.Text>
                       {element.description}
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            })
          ) : (
            <div>No Data Found</div>
          )}
        </Row>
      </div>
    </>
  );
}

export default UserCourse;
