import React from "react";
import { Badge, Card, Dropdown, Image, Row, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Events_Table.css";
import { BASE_URL } from "../../Services/helper";
import Paginations from "../../Components/Pagination/Paginations";
function Events_Table({ eventsData,eventDelete,handlePreBtn,handleNextBtn,page,pageCount,setPage }) {
  return (
    <React.Fragment>
      <div className="container mt-3">
        <Row>
          <div className="col mt-5">
            <Card className="shadow">
              <Table className="align-align-items-center" responsive="sm">
                <thead className="thead-dark">
                  <tr className="table-dark">
                    <th>#</th>
                    <th>Banner</th>
                    <th>Event Name</th>
                    <th>Schedule From</th>
                    <th>Schedule To</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {eventsData.length > 0 ? (
                    eventsData.map((element, index) => {
                      return (
                        <tr key={index+2}>
                          <td>{index+1+(page-1)*2}</td>
                          <td>
                            <img
                              className="img"
                              src={`${BASE_URL}/uploads/${element.banner}`}
                              alt="Image"
                            />
                          </td>
                          <td>{element.eventName}</td>
                          <td>{element.scheduleFrom}</td>
                          <td>{element.scheduleTo}</td>
                          <td>{element.description}</td>
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
                                      to={`/event-edit/${element._id}`}
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
                                    <div
                                       onClick={() => eventDelete(element._id)}
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
                      );
                    })
                  ) : (
                    <div>No Data Found</div>
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
      </div>
    </React.Fragment>
  );
}

export default Events_Table;
