import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { gallarygetfun } from "../../Services/API/gallaryAPI";
import { BASE_URL } from "../../Services/helper";

function UserGallary() {
  const[galleryData,setGallaryData]=useState([]);

  const getGallarys=async()=>{
        const response=await gallarygetfun();
    //    console.log(response.data);
        if(response.status===200){
          setGallaryData(response.data.galleryInfo);
        }else{
          console.log("somthing wrong to fecth data with gallary");
        }
  }
  useEffect(()=>{
    getGallarys();
  },[])

  return (
    <>
      <div  className="container-fluid mt-2 mb-3">
        <Row>
          {
            galleryData.length >0 ? (
              galleryData.map((element,index)=>{
                return(
                  <div key={index+1} className="col-xl-3 col-lg-3 col-sm-6 col-md-6  col d-flex align-items-center">
                  <Card style={{ width: "18rem"}} className="border border-5  m-auto">
                    <Card.Img variant="top" src={`${BASE_URL}/uploads/${element.galleryImage}`} style={{width:"100%",height:"300px"}} />
                    <Card.Body>
                      <Card.Title>{element.title}</Card.Title>
                      <Card.Text>
                       {element.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                )
              })
            ):(
              <div>
                No data Found
              </div>
            )
          }
         
        </Row>
      </div>
    </>
  );
}

export default UserGallary;
