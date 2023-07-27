import React from "react";
import { Badge, Card, Dropdown, Image, Row, Table } from "react-bootstrap";
import "./Alumni_Table.css";
import { BASE_URL } from "../../Services/helper";
import Paginations from "../../Components/Pagination/Paginations";

function Alumni_Table({ alumnidata ,handlePreBtn,handleNextBtn,page,pageCount,setPage}) {
 // console.log(alumnidata, "alumnidata");
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
                    <th>Profile</th>
                    <th>Alumni Name</th>
                    <th>Course Garduated</th>
                    <th>Passout</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {alumnidata.length > 0 ? (
                    alumnidata.map((element, index) => {
                      return (
                        <tr key={index+1}>
                          <td>{index+1}</td>
                          <td>
                            <img
                              className="img"
                              src={`${BASE_URL}/uploads/${element.profile}`}
                              alt="Image"
                            />
                          </td>
                          <td>{element.fname + " "+ element.lname}</td>
                          <td>{element.courseGarduated}</td>
                          <td>{element.passout}  </td>
                          <td>{element.email}</td>
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

export default Alumni_Table;
