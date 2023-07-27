import React from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

function Serach({addFun,btnName,handleSearch,search}) {
   

  return (
    <>
       <div className="main_div">
        {/* serch-add btn*/}
        <div className="search_add mt-4 d-flex justify-content-between">
          <div className="search col-lg-4">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={search} // Changed serach to search
                onChange={handleSearch}
              />
              <Button variant="success" className="search_btn" >
                Search
              </Button>
            </Form>
          </div>
          <div className="add_btn">
            <Button variant="primary" onClick={addFun}>
              <i className="fa-solid fa-plus"></i>&nbsp; {btnName}
            </Button>
          </div>
        </div>
       
      </div> 
    </>
  )
}

export default Serach