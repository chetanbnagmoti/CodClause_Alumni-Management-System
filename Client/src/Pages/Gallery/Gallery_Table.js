import React from 'react'
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap'
import "./Gallery_Table.css"
import { NavLink } from 'react-router-dom';
import { BASE_URL } from '../../Services/helper';
import Paginations from '../../Components/Pagination/Paginations';


function Gallery_Table({gallaryData,gallaryDelete,handlePreBtn,handleNextBtn,page,pageCount,setPage}) {
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
                    <th>Image</th>
                    <th>Description</th>
                    <th>Title</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {gallaryData.length > 0 ? (
                    gallaryData.map((element, index) => {
                      
                      return (
                        <tr key={index+2}>
                          <td>{index + 1 +(page-1)*2}</td>
                          <td>
                            <img
                              className="img"
                              src={`${BASE_URL}/uploads/${element.galleryImage}`}
                              alt="Image"
                            />
                          </td>
                          <td>{element.description}</td>
                          <td>{element.title}</td>
                          <td>
                            <div className="d-flex justify-content-center ">
                              <button className="btn btn-warning mx-1">
                                {" "}
                                <NavLink
                                 to={`/gallery-edit/${element._id}`}
                                  className="text-decoration-none"
                                >
                                  <i
                                    className="fa-solid fa-pen-to-square"
                                    style={{ color: "blue" }}
                                  ></i>
                                </NavLink>{" "}
                              </button>
                              <button className="btn btn-primary" onClick={()=>gallaryDelete(element._id)}>
                                <i
                                  className="fa-solid fa-trash"
                                  style={{ color: "orange" }}
                                ></i>
                              </button>
                            </div>
                          </td>
                        </tr>
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
      </div>
    </React.Fragment>
  );
}

export default Gallery_Table