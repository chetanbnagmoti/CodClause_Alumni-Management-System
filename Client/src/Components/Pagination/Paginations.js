import React from 'react'
import Pagination from 'react-bootstrap/Pagination';

const Paginations = ({handlePreBtn,handleNextBtn,page,pageCount,setPage}) => {
  return (
    <React.Fragment>
      {pageCount > 0 ? (
        <div className="pagination_div d-flex justify-content-end mx-5">
          <Pagination>
            <Pagination.Prev onClick={() => handlePreBtn()} />
            {
              Array(pageCount).fill(null).map((element,index)=>{
                return (
                  <>
                   <Pagination.Item key={index+1} active={page === index+1 ? true :false} onClick={()=>setPage(index+1)}  >{index+1}</Pagination.Item>
                  </>
                )
              })
            }
           
            <Pagination.Next onClick={() => handleNextBtn()} />
          </Pagination>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}

export default Paginations