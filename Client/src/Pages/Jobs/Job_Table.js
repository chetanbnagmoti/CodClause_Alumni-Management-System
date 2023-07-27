import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Paginations from '../../Components/Pagination/Paginations';

function Job_Table({ jobData,jobDelete,handlePreBtn,handleNextBtn,page,pageCount,setPage }) {
 // console.log("JobData :- ", jobData);
  return (
    <React.Fragment>
      <div className="container mt-3">
        <Card className="shadow">
          <Table className="align-align-items-center" responsive="sm">
            <thead className="thead-dark">
              <tr className="table-dark">
                <th>#</th>
                <th>Job Title</th>
                <th>Company Name</th>
                <th>Salary</th>
                <th>Experience</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobData.length > 0 ? (
                jobData.map((element, index) => (
                  <tr key={index + 1}>
                    <td>{index + 1 +(page-1)*2}</td>
                    <td>{element.JobTitle}</td>
                    <td>{element.companyName}</td>
                    <td>{element.salary}</td>
                    <td>{element.experience}</td>
                    <td>{element.description}</td>
                    <td>
                      <div className='d-flex justify-content-center '>
                        <button className='btn btn-warning mx-1'>
                          <NavLink to={`/job-edit/${element._id}`} className="text-decoration-none">
                            <i className="fa-solid fa-pen-to-square" style={{ color: "blue" }}></i>
                          </NavLink>
                        </button>
                        <button className='btn btn-info mx-1' onClick={()=>jobDelete(element._id)}>
                          <i className="fa-solid fa-trash" style={{ color: "orange" }}></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no_data text-center">No Data Found</td>
                </tr>
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
    </React.Fragment>
  );
}

export default Job_Table;
