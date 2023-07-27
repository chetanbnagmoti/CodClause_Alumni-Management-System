import React from 'react'
import { Card, Row, Table } from 'react-bootstrap'
import Paginations from '../../Components/Pagination/Paginations';
import { NavLink } from 'react-router-dom';

function Course_Table({courseData,courseDelete,handlePreBtn,handleNextBtn,page,pageCount,setPage}) {
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
                    <th>Course Name</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    courseData.length > 0 ? 
                    (
                      courseData.map((element,index)=>{
                        return (
                  <tr key={index+1}>
                    <td>{index+1+(page-1)*2}</td>
                    <td >
                      {element.courseName}
                    </td>
                    <td>{element.description}</td>
                    <td>
                     <div className='d-flex justify-content-center '>
                        <button className='btn btn-warning mx-1'> <NavLink to={`/course-edit/${element._id}`} ><i className="fa-solid fa-pen-to-square" style={{ color: "blue" }}></i></NavLink> </button>
                        <button className='btn btn-primary' onClick={()=>courseDelete(element._id)}><i className="fa-solid fa-trash" style={{ color: "orange" }}></i></button>
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
)}

export default Course_Table