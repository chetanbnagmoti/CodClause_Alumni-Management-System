import React, { useContext, useEffect, useState } from "react";
import "./Users.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import Tables from "../../Components/Tables/Tables";
import Spiner from "../../Components/Spiner/Spiner";
import { addData, dltData, updateData } from "../../Components/context/ContextProvider";
import Alert from "react-bootstrap/Alert";
import { deletefunc, exporttocsvfunc, usergetfun } from "../../Services/API/Apis";
import { toast } from "react-toastify";

const Users = () => {
  const [userData,setUserData]=useState([]); 
  const [showspin, setShowSpin] = useState(true);
  const [search,setSearch]=useState("");
  const[gender,setGender]=useState("All");
  const[status,setStatus]=useState("All");
  const [sort,setSort] =useState("New");
  const [page,setPage]=useState(1);
  const[pageCount,setPageCount]=useState(0);
 
  const {useradd, setUseradd } = useContext(addData);
  const {update,setUpdate} = useContext(updateData);
  const {deleteData,setDeleteData}=useContext(dltData);

  const userGet= async()=>{
      const response=await usergetfun(search,gender,status,sort,page);
      // console.log(response);
    //  console.log(response.data.Pagination.pageCount);
      if(response.status===200){
        setUserData(response.data.userData);
        setPageCount(response.data.Pagination.pageCount);
      }else{
        console.log("error to get users data");
      }
     
  }

  //delete user :-
  const deleteUser=async(id)=>{
     const response=await deletefunc(id);
     if(response.status === 200){
      userGet();
      setDeleteData(response.data);
     }else{
      toast.error("error");
     }
  }
 
  //export User:-
  const exportUser=async()=>{
    const response =await exporttocsvfunc();
   // console.log(response);
   if(response.status===200){
    window.open(response.data.downloadUrl,"blank")
   }else{
    toast.error("error ! ");
  }
  }

//pagination
//handle prev btn:-
const handlePreBtn=()=>{
  // console.log(" Prv Btn CALL");
  setPage(()=>{
      if(page===1){
        return page;
      }
      else{
        return page-1;
      }
  })
}


//handleNextBtn:-
const handleNextBtn=()=>{
  // console.log("Next Btn CALL");
  setPage(()=>{
    if(page===pageCount){
      return page;
    }else{
      return page+1;
    }
  })
}

  useEffect(() => {
    userGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1100);
  }, [search,gender,status,sort,page]);

  const navigate = useNavigate();

  

  const addUser = () => {
    navigate("/register");
  };
  
  return (
    <React.Fragment>
      {useradd ? 
        <Alert variant="success" onClose={() => setUseradd("")} dismissible>
          {useradd.fname.toUpperCase()} Successfully Added
        </Alert>:""
      }
       {update ? 
        <Alert variant="primary" onClose={() => setUpdate("")} dismissible>
          {update.fname.toUpperCase()} Successfully Update
        </Alert>:""
      }
      {
        deleteData?
        <Alert variant="danger" onClose={() => setDeleteData("")} dismissible>
          {deleteData.fname.toUpperCase()} Successfully Delete
        </Alert>:""
      }
        <div className="container-fluid">
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
                    onChange={(e)=>setSearch(e.target.value)}
                  />
                  <Button variant="success" className="search_btn">
                    Search
                  </Button>
                </Form>
              </div>
              <div className="add_btn">
                <Button variant="primary" onClick={addUser}>
                  <i className="fa-solid fa-plus"></i>&nbsp; Add User
                </Button>
              </div>
            </div>
            {/* export,gender,status */}
            <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
              <div className="export_csv">
                <Button variant="primary"className="export_btn"  onClick={exportUser} >
                  Export to CSV
                </Button>
              </div>
              <div className="filter_gender">
                <div className="filter">
                  <h3>Filter By Gender</h3>
                  <div className="gender d-flex justify-content-around flex-wrap">
                    <Form.Check
                      type={"radio"}
                      label={`All`}
                      name="gender"
                      value={"All"}
                      onChange={(e)=>setGender(e.target.value)}
                      defaultChecked
                    />
                    <Form.Check
                      type={"radio"}
                      label={`Male`}
                      name="gender"
                      value={"Male"}
                      onChange={(e)=>setGender(e.target.value)}
                    />
                    <Form.Check
                      type={"radio"}
                      label={`Female`}
                      name="gender"
                      value={"Female"}
                      onChange={(e)=>setGender(e.target.value)}
                    />
                    <Form.Check
                      type={"radio"}
                      label={`Other`}
                      name="gender"
                      value={"Other"}
                      onChange={(e)=>setGender(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {/*Short By Value */}
              <div className="filter_newold">
                <h3>Short By Value</h3>
                <Dropdown className="text-center">
                  <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                    <i className="fa-solid fa-sort"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>setSort("New")} >New</Dropdown.Item>
                    <Dropdown.Item onClick={()=>setSort("Old")}>Old</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              {/* filter by status */}
              <div className="filter_status">
                <div className="status">
                  <h3>Filter By Status</h3>
                  <div className="status_radio d-flex justify-content-around flex-wrap">
                    <Form.Check
                      type={"radio"}
                      label={`All`}
                      name="status"
                      value={"All"}
                      onChange={(e)=>setStatus(e.target.value)}
                      defaultChecked
                    />
                    <Form.Check
                      type={"radio"}
                      label={`Active`}
                      name="status"
                      value={"Active"}
                      onChange={(e)=>setStatus(e.target.value)}
                     
                    />
                    <Form.Check
                      type={"radio"}
                      label={`InActive`}
                      name="status"
                      value={"InAcTive"}
                      onChange={(e)=>setStatus(e.target.value)}
                     
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showspin ? <Spiner /> : <Tables userData={userData} 
                                           deleteUser={deleteUser} 
                                           userGet={userGet} 
                                           handlePreBtn={handlePreBtn} 
                                           handleNextBtn={handleNextBtn}
                                           page={page}
                                           pageCount={pageCount}
                                           setPage={setPage}
                                           />}
        </div>
    </React.Fragment>
  );
};

export default Users;
