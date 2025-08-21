import { useState,useEffect } from 'react';
import axios from 'axios';
import Review from './Review';
import Promote from './Promote';

function Employee({ roles,departments,employees,setEmployees,setAudits,setReviews,reviews,review,setReview,addEmp,setAddEmp,empList }) {
    const [employeeName, setEmployeeName] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [roleId, setRoleId] = useState('');
    const [salary, setSalary] = useState('');
    const[edit,setEdit] = useState(null);
    const [editedEmployeeName,setEditedEmployeeName] = useState('');
    const [editedDepartmentId,setEditedDepartmentId] = useState('');
    const [editedRoleId,setEditedRoleId] = useState('');
    const [editedSalary,setEditedSalary] = useState('');
    const [reviewComments,setReviewComments] = useState('')
    const [reviewScore,setReviewScore] = useState('')
    const [reviewDate,setReviewDate] = useState('')
    const [editReview,setEditReview] = useState('')
    const [editedReviewComments,setEditedReviewComments] = useState('')
    const [editedReviewScore,setEditedReviewScore] = useState('')
    const [editedReviewDate,setEditedReviewDate] = useState('')
    const [editReviewEmpId,setEditReviewEmpId ] = useState('');
    const [promoteStatus,setPromoteStatus] = useState("")
    const [empEditStatus,setEmpEditStatus] = useState("")
    const [deleteReviewStatus,setDeleteReviewStatus] = useState("")
    const [empDeleteStatus,setEmpDeleteStatus] = useState("");
    const [status,setStatus] = useState("")
    const [deletedReviewId,setDeletedReviewId] = useState(null);
    const [deletedEmpId,setDeletedEmpId] = useState(null);
    // useEffect(() => {
    //   const headerNav = document.querySelector('.horizontalNav');
    //   const headerSubNav = document.querySelector('.horizontalSubNav');
    //   const empsContainer = document.querySelector('.empsContainer');
    //   console.log('header',headerNav,'empsContainer',empsContainer);
    //   if (headerNav && headerSubNav && empsContainer) {

    //     empsContainer.style.marginTop = `${empsContainer.offsetHeight - 200}px`;
    //   }
    // }, []);


    // const backendUrl = import.meta.env.VITE_RENDER_URL;
    const backendUrl = 'http://localhost:8080';
    console.log('reviews',reviews)

  const handleReviewEditClick = async(review) =>{
    setEditReview(review.id);
    setEditReviewEmpId(review.employeeId);
  }

  const cancelEditEmp = () =>{
    setEdit(null);
  }


//   const handleReviewEditClick = (reviewId) => {
//     setEditReview(reviewId);
//     const reviewToEdit = reviews.find(review => review.id === reviewId);
//     console.log('reviewToEdit',reviewToEdit);
//     setEditedReviewComments(reviewToEdit.reviewComments);
//     setEditedReviewScore(reviewToEdit.reviewScore);
// };
  const handleReviewClick = async(id) =>{
    setReview(id);
  }

  const handleReviewDeleteClick = async(id)=>{
    setDeletedReviewId(id);
    try{
      const response = await axios.delete(`${backendUrl}/reviews/delete/${id}`);
      setDeleteReviewStatus("success");

      setTimeout(async ()=>{

        const fetchReviews = await axios.get(`${backendUrl}/reviews`);
        setReviews(fetchReviews.data);
        setDeleteReviewStatus("");
        setDeletedReviewId(null);
    },1500);

    }catch(error){
      setDeleteReviewStatus("error");
    }


}

  const handleDeleteClick = async(id) =>{
    setDeletedEmpId(id);
    try{
      const response = await axios.delete(`${backendUrl}/employees/delete/${id}`);
      setEmpDeleteStatus("success");

      setTimeout(async ()=>{
        const fetchEmps = await axios.get(`${backendUrl}/employees`);
        setEmployees(fetchEmps.data);
        setEmpDeleteStatus("")
        setDeletedEmpId(null)
      },1500);


    }catch(error){
      setEmpDeleteStatus("error");
          console.error('Error deleting employee:');
    }




  }

  const handleEditClick = (emp) => {
      setEdit(emp.id);

      setEditedEmployeeName(emp.employeeName);
      setEditedDepartmentId(emp.departmentId);
      setEditedRoleId(emp.roleId);
      setEditedSalary(emp.salary);
  };
  const handleReviewEditSubmit = async(review)=>{
    event.preventDefault();

    const editedReviewDTO = {
      employeeId: review.employeeId,
      reviewComments:editedReviewComments,
      reviewScore: editedReviewScore,
      reviewDate: editedReviewDate
    }

    const response = await axios.put(`${backendUrl}/reviews/update/${id}`,editedReviewDTO);



    setEditedReviewComments('');
    setEditedReviewScore('');
    setEditedReviewDate('');


    const fetchReviews = await axios.get(`${backendUrl}/reviews`);


    setEditReview(null);
    setReviews(fetchReviews.data);
  }

  const handleEditSubmit = async(event,id)=>{
    event.preventDefault();

    const employeeDTO = {
      employeeName:editedEmployeeName,
      departmentId: Number(editedDepartmentId),
      roleId: Number(editedRoleId),
      salary: Number(editedSalary)
    }



    try{
      const response = await axios.put(`${backendUrl}/employees/update/${id}`,employeeDTO);

      setEmpEditStatus("success");

      setTimeout(async ()=>{

        setEmpEditStatus("");
        setEditedEmployeeName('');
        setEditedDepartmentId('');
        setEditedRoleId('');
        setEditedSalary('');
        const fetchEmps = await axios.get(`${backendUrl}/employees`);
        const fetchAudits = await axios.get(`${backendUrl}/employeeAudits`);

        setAudits(fetchAudits.data);
        setEdit(null);
        setEmployees(fetchEmps.data);
        setEmpEditStatus("");
    },1500);
    }catch(error){
      setEmpEditStatus("error");
    }



  }

  const handleSubmit = async (event) =>{
    event.preventDefault();
    const employeeDTO = {
      employeeName,
      departmentId: Number(departmentId),
      roleId: Number(roleId),
      salary: Number(salary)
    }
    try{
      const response = await axios.post(`${backendUrl}/employees/add`,employeeDTO);
      setStatus("success");
      setTimeout(async ()=>{
        setEmployeeName('');
        setDepartmentId('');
        setRoleId('');
        setSalary('');
        const fetchEmps = await axios.get(`${backendUrl}/employees`);
        setEmployees(fetchEmps.data);
        setStatus("");
      },1500);
    }catch(error){
      console.error("Error adding employee:", error);
      setStatus("error");
    }






  }


  const handleReviewSubmit = async (event,id) =>{
    event.preventDefault();
    const reviewDTO = {
      employeeId: id,
      reviewComments,
      reviewScore,
      reviewDate
    }

    const response = await axios.post(`${backendUrl}/reviews/add`,reviewDTO);

    setReviewComments('');
    setReviewScore('');
    setReviewDate('');
    const fetchReviews = await axios.get(`${backendUrl}/reviews`);
    console.log('reviews',fetchReviews.data);

    setReviews(fetchReviews.data);

  }

  return (
    <>
    {/* <div id="deleteEmpEle" className={empDeleteStatus === "success" ? "successMsg" : empDeleteStatus === "error" ? "errorMsg" : "hidden"}>
                {empDeleteStatus === "success" && "Employee deleted successfully!"}
                {empDeleteStatus === "error" && "Something went wrong."}

            </div> */}
    {
      addEmp?(
        <form className="empForm" onSubmit = {handleSubmit}>
        <h1>Add employee</h1>

                <label className="empNameCont">
                    <span>Employee Name</span>
                    <input type="text" value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}/>
                </label>


                {/* <label>
                    Department ID:
                    <input type="number" value={departmentId}
                        onChange={(e) => setDepartmentId(e.target.value)}/>
                </label> */}

                <div className="deptCont" style={{}}>
                  <label htmlFor="deptId">Department</label>
                  <select name="deptId"

                  value={departmentId}
                  onChange={e => {
                    setDepartmentId(e.target.value);
                  }}>
                    {
                      departments.map((dept)=>(

                        <option key= {dept.departmentName} value={dept.id}>{dept.departmentName}</option>

                        ))
                    }

                  </select>
              </div>


                {/* <label>
                    Role ID:
                    <input type="number" value={roleId} onChange={(e) => setRoleId(e.target.value)}/>
                </label> */}
                <div className="roleCont" style={{}}>
                  <label htmlFor="roleId">Role</label>
                  <select name="roleId"

                  value={roleId}
                  onChange={e => {
                    setRoleId(e.target.value);
                  }}>
                    {
                      roles.map((role)=>(

                        <option key= {role.roleName} value={role.id}>{role.roleName}</option>

                        ))
                    }

                  </select>
              </div>


                <label style={{marginLeft:'0px'}} className="salary">
                    Salary
                    <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)}/>
                </label>
            <div className="divider"></div>

            <div className="addEmpBtnCont">


            <div className={status === "success" ? "successMsg" : status === "error" ? "errorMsg" : "hidden"}>
                {status === "success" && "Employee added successfully!"}
                {status === "error" && "Something went wrong."}
            </div>


            <button type="submit">Save</button>

            </div>



        </form>
      ):empList?(
        <div style={{borderRadius:'20px'}} className="empsContainer">
          {/* <div style={{position:'absolute',width: "auto",marginTop: "40px",maxHeight: "20px",padding: "0"}}  className={"deleteReviewStatusEle " + (deleteReviewStatus === "success" ? "successMsg" : deleteReviewStatus === "error" ? "errorMsg" : "") + (deleteReviewStatus === "" ? " hidden" : "")
           }>
            {deleteReviewStatus === "success" && "Review successfully deleted!"}
            {deleteReviewStatus === "error" && "Something went wrong."}
           </div> */}


          <div style={{borderRadius:'0px',backgroundColor:"#fff",display:'flex',marginBottom:'20px',justifyContent:'flex-start',paddingLeft:'0px',paddingRight:'0px',borderTopLeftRadius: '20px',borderTopRightRadius: '20px'}} className="empsContDivider">

            <div style={{borderRadius:'0px',width:'100%',textAlign:'left',borderTop:'1px solid lightgray',paddingBottom:'40px'}}>{employees.length} records found</div>
          </div>
          {/* <div style={{backgroundColor: '#e8eaef'}} className="empLabels">
                    <span>Name</span>
                    <span style={{marginLeft:'35px'}}>Salary</span>
                    <span style={{marginRight:'100px'}}>Actions</span>
                  </div> */}

            {employees.map((emp, index) => (
              edit === emp.id?(
                <form className="emp editEmpForm" key={emp.id} onSubmit = {(e)=>handleEditSubmit(e,emp.id)}>
                  <div className="editEmpFormSubWrapper">
                    <div className="editPersonalDetails" style={{color:'#64728c',fontWeight:'bold',fontSize:'25px',borderBottom:'1px solid lightgray',padding: '0px',textAlign:'left',paddingBottom:'10px',borderRadius:'0',marginBottom:'50px',marginTop:'20px'}}>Personal Details</div>
                  <label className="editEmpNameLabel">
                      Employee Name
                      <input type="text" value={editedEmployeeName}
                          onChange={(e) => setEditedEmployeeName(e.target.value)}/>
                  </label>


                  {/* <label>
                      Edit Department ID:
                      <input type="number" value={editedDepartmentId}
                          onChange={(e) => setEditedDepartmentId(e.target.value)}/>
                  </label> */}


                  {/* <label>
                      Edit Role ID:
                      <input type="number" value={editedRoleId} onChange={(e) => setEditedRoleId(e.target.value)}/>
                  </label> */}
                  <div className="editDeptCont" style={{display: 'flex',flexDirection: 'column',paddingLeft:'0px',marginLeft:'20px'}}>
                    <label htmlFor="editedDeptId">Department</label>
                    <select name="editedDeptId"

                    value={editedDepartmentId}
                    onChange={e => {
                      setEditedDepartmentId(e.target.value);
                    }}>
                      {
                        departments.map((dept)=>(

                          <option key= {dept.departmentName} value={dept.id}>{dept.departmentName}</option>

                          ))
                      }

                    </select>
                </div>


                  {/* <label>
                      Role ID:
                      <input type="number" value={roleId} onChange={(e) => setRoleId(e.target.value)}/>
                  </label> */}
                  <div className="editRoleCont" style={{ display: 'flex',flexDirection: 'column',paddingLeft: '0',marginLeft:'20px'}}>
                    <label htmlFor="editedRoleId">Role</label>
                    <select name="editedRoleId"

                    value={editedRoleId}
                    onChange={e => {
                      setEditedRoleId(e.target.value);
                    }}>
                      {
                        roles.map((role)=>(

                          <option key= {role.roleName} value={role.id}>{role.roleName}</option>

                          ))
                      }

                    </select>
                </div>


                  <label className="editEmpFormSalaryLabel">
                      Salary
                      <input type="number" value={editedSalary} onChange={(e) => setEditedSalary(e.target.value)}/>
                  </label>

              <div className="editEmpFormBtnCont">
              <div className={empEditStatus === "success" ? "successMsg" : empEditStatus === "error" ? "errorMsg" : "hidden"}>
                {empEditStatus === "success" && "Employee edited successfully!"}
                {empEditStatus === "error" && "Something went wrong."}

            </div>
            {/* <div className="errorMsg">
              Something went wrong.
            </div> */}
            {/* <div className="successMsg">
                Employee edited successfully!


            </div> */}

              <button onClick={cancelEditEmp} className="cancel">Cancel</button>
              <button type="submit">Save</button>
              </div>

              </div>


          </form>
              ):(
                  <>


                  {/* <div style={{backgroundColor: '#e8eaef'}} className="empLabels">
                    <span>Name</span>
                    <span>Salary</span>
                    <span style={{marginRight:'60px'}}>Actions</span>
                  </div> */}
                  <div className="emp" key={emp.id}>
                    {
                      deletedEmpId === emp.id && (
                        <div id="deleteEmpEle" className={empDeleteStatus === "success" ? "successMsg" : empDeleteStatus === "error" ? "errorMsg" : "hidden"}>
                          {empDeleteStatus === "success" && "Employee deleted successfully!"}
                          {empDeleteStatus === "error" && "Something went wrong."}

                        </div>
                      )
                    }
                    <div style={{backgroundColor: '#e8eaef'}} className="empLabels">
                    <span className="empLabelName">Name</span>
                    <span style={{marginLeft:'35px'}}>Salary</span>
                    <span style={{marginRight:'100px'}}>Actions</span>
                  </div>
                  <div className="empVals">
                    <p className="empValName">{emp.employeeName}</p>
                    <p className="empEditSal" style={{}}>{emp.salary}</p>
                    <div className="empEditBtnCont">
                        <button onClick={()=>handleEditClick(emp)}>Edit</button>
                        <button onClick={()=>handleDeleteClick(emp.id)}>Delete</button>

                        <button className="addReviewBtn" onClick={()=>handleReviewClick(emp.id)}>Add Review</button>
                        <Promote setEmployees={setEmployees} employees={employees} emp={emp} status={promoteStatus} setStatus={setPromoteStatus}/>
                    </div>
                    </div>



                    <Review setEditReviewEmpId={setEditReviewEmpId} editReviewEmpId ={editReviewEmpId} setEditReview={setEditReview} review={review} editReview={editReview} setReviews={setReviews} emp={emp} reviews={reviews} setReview={setReview} />


                        {
                          reviews.length > 0?(
                            <>
                              <label className="reviewsHdr">Reviews</label>
                            <div className="emp-item-2">

                              {
                                reviews.map((review) => (

                                  review.employeeId === emp.id?(
                                    <div style={{backgroundColor:'#F3F4F6',marginLeft:'20px'}} className="review" key={review.id}>
                                    <div style={{display:'flex',backgroundColor:'	#F3F4F6',margin:'0px',padding:'0px',minWidth:'100%',gap:'50px',marginTop:'20px'}}>
                                      <span>{review.reviewScore} stars</span>
                                      <span>{review.reviewDate}</span>

                                    </div>
                                    <div className="reviewComments" style={{backgroundColor:'#F3F4F6',paddingTop:'0px',margin:'0px',padding:'0',textAlign:'left',marginTop:'10px'}}>{review.reviewComments}</div>

                                      <div className="crudReviewBtnCont">
                                      <button style={{margin:'0px',fontSize:'15px',width:'200px'}} onClick={() => handleReviewEditClick(review)}>Edit Review</button>
                                      <button style={{margin:'0px',fontSize:'15px',width:'220px',paddingLeft: '0',paddingRight: '0'}} onClick={() => handleReviewDeleteClick(review.id)}>Delete Review</button>

                                      {
                                        deletedReviewId === review.id && (
                                          <div style={{position:'absolute',backgroundColor:"green",color:"#fff"}} className={"deleteReviewStatusEle " + (deleteReviewStatus === "success" ? "successMsg" : deleteReviewStatus === "error" ? "errorMsg" : "")
                                            + (deleteReviewStatus === "" ? "hidden":"")
                                          }>

                                          {deleteReviewStatus === "success" && "Review successfully deleted!"}
                                          {deleteReviewStatus === "error" && "Something went wrong."}
                                          </div>
                                        )
                                      }

                                      {/* <div style={{position:'absolute',backgroundColor:"green",color:"#fff"}} className="deleteReviewStatusEle successMsg">

                                          Review successfully deleted!
                                          </div> */}

                                      {/* <div style={{position:'absolute'}} className="deleteReviewStatusEle  successMsg"
                                          >

                                          Review successfully deleted!

                                          </div> */}





                                      </div>

                                  </div>
                                  ):null



                      ))
                              }
                            </div>
                            </>


                          ):null
                        }














                </div>



                  </>




              )

            ))}
        </div>
      ):null
    }









    </>



  );
}

export default Employee;
