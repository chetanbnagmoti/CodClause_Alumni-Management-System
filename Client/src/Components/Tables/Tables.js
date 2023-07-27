import React from "react";
import "./table.css";
import { Badge, Card, Row, Table } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { BASE_URL } from "../../Services/helper";
import { NavLink } from "react-router-dom";
import { statuschangefunc } from "../../Services/API/Apis";
import { ToastContainer, toast } from "react-toastify";
import Paginations from "../Pagination/Paginations";


const Tables = ({userData,deleteUser,userGet,handlePreBtn,handleNextBtn,page,pageCount,setPage}) => {
  
  const handleChange =async(id,status)=>{
          //  console.log(id,status);
          const response =await statuschangefunc(id,status);
         // console.log(response);
         if(response.status===200){
            userGet()
            toast.success("Status Updated");
         }else{
          toast.error("Status Not Updated");
         } 
  }
   
  return (
    <React.Fragment>
      <div className="container">
        <Row>
          <div className="col mt-2">
            <Card className="shadow">
              <Table className="align-align-items-center" responsive="sm">
                <thead className="thead-dark">
                  <tr className="table-dark">
                    <th>Id</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="">
                  {userData.length > 0 ? (
                    userData.map((element, index) => {
                      return (
                        <>
                          <tr key={index+3}>
                            <td>{index + 1 +(page-1)*2}</td>
                            <td>{element.fname + " " + element.lname}</td>
                            <td>{element.email}</td>
                            <td>{element.gender == "Male" ? "M" : "F"}</td>
                            <td className="d-flex align-item-center">
                              <Dropdown className="text-center">
                                <Dropdown.Toggle
                                  className="dropdown_btn"
                                  id="dropdown-basic"
                                >
                                  <Badge
                                    bg={
                                      element.status == "Active"
                                        ? "primary"
                                        : "danger"
                                    }
                                  >
                                    {element.status} &nbsp;
                                    <i className="fa-solid fa-sort-down" />
                                  </Badge>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleChange(element._id, "Active")
                                    }
                                  >
                                    Active
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleChange(element._id, "InActive")
                                    }
                                  >
                                    InAcTive
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                            <td className="img_parent">
                              <img
                                src={`${BASE_URL}/uploads/${element.profile}`}
                                alt="image"
                              />
                            </td>
                            <td>
                              <Dropdown className="text-center">
                                <Dropdown.Toggle
                                  variant="light"
                                  className="action"
                                  id="dropdown-basic"
                                >
                                  <i className="fa-solid fa-ellipsis-vertical dots"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <NavLink
                                      to={`/edit/${element._id}`}
                                      className="text-decoration-none"
                                    >
                                      <i
                                        className="fa-solid fa-pen-to-square"
                                        style={{ color: "blue" }}
                                      ></i>
                                      &nbsp;<samp>Edit</samp>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <NavLink
                                      to={`/userprofile/${element._id}`}
                                      className="text-decoration-none"
                                    >
                                      <i
                                        className="fa-solid fa-eye"
                                        style={{ color: "green" }}
                                      ></i>
                                      &nbsp;<samp>View</samp>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <div
                                      onClick={() => deleteUser(element._id)}
                                    >
                                      <i
                                        className="fa-solid fa-trash"
                                        style={{ color: "red" }}
                                      ></i>
                                      &nbsp;<samp>Delete</samp>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <div className="no_data text-center">No Data Found</div>
                  )}
                </tbody>
              </Table>
              <Paginations
                handlePreBtn={handlePreBtn}
                handleNextBtn={handleNextBtn}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
              />
            </Card>
          </div>
        </Row>
        <ToastContainer />
      </div>
    </React.Fragment>
  );
};

export default Tables;
