import { useState } from 'react';
import axios from 'axios';
import Review from './Review';
import Promote from './Promote';

function Employee({ roles,departments,employees,setEmployees,setAudits,setReviews,reviews,review,setReview }) {
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
    const backendUrl = import.meta.env.VITE_RENDER_URL;
  const handleReviewEditClick = async(id) =>{
    setEditReview(id);
  }
  const handleReviewClick = async(id) =>{
    setReview(id);
  }

  const handleDeleteClick = async(id) =>{
    const response = await axios.delete(`${backendUrl}/employees/delete/${id}`);

    const fetchEmps = await axios.get(`${backendUrl}/employees`);
    setEmployees(fetchEmps.data);
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

    const response = await axios.put(`${backendUrl}/employees/update/${id}`,employeeDTO);



    setEditedEmployeeName('');
    setEditedDepartmentId('');
    setEditedRoleId('');
    setEditedSalary('');
    const fetchEmps = await axios.get(`${backendUrl}/employees`);
    const fetchAudits = await axios.get(`${backendUrl}/employeeAudits`);

    setAudits(fetchAudits.data);
    setEdit(null);
    setEmployees(fetchEmps.data);
  }

  const handleSubmit = async (event) =>{
    event.preventDefault();
    const employeeDTO = {
      employeeName,
      departmentId: Number(departmentId),
      roleId: Number(roleId),
      salary: Number(salary)
    }

    const response = await axios.post(`${backendUrl}/employees/add`,employeeDTO);

    setEmployeeName('');
    setDepartmentId('');
    setRoleId('');
    setSalary('');
    const fetchEmps = await axios.get(`${backendUrl}/employees`);
    setEmployees(fetchEmps.data);


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

    setReviews(fetchReviews.data);

  }

  return (
    <div className="employeesCont">
      <h2 className="addEmp">Add Employee</h2>
      <form className="empForm" onSubmit = {handleSubmit}>

                <label>
                    Employee Name:
                    <input type="text" value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}/>
                </label>


                {/* <label>
                    Department ID:
                    <input type="number" value={departmentId}
                        onChange={(e) => setDepartmentId(e.target.value)}/>
                </label> */}

                <div>
                  <label htmlFor="deptId">Department:</label>
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
                <div>
                  <label htmlFor="roleId">Role:</label>
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


                <label className="salary">
                    Salary:
                    <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)}/>
                </label>

            <button type="submit">Add Employee</button>


        </form>


      <div className="empsContainer">

      <h2 style={{marginLeft:'10%',marginTop:'150px'}}>Employees</h2>
          {employees.map((emp, index) => (
            edit === emp.id?(
              <form className="emp editEmpForm" key={emp.id} onSubmit = {(e)=>handleEditSubmit(e,emp.id)}>

                <label>
                    Edit Employee Name:
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
                <div>
                  <label htmlFor="editedDeptId">Edit Department:</label>
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
                <div>
                  <label htmlFor="editedRoleId">Edit Role:</label>
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


                <label>
                    Edit Salary:
                    <input type="number" value={editedSalary} onChange={(e) => setEditedSalary(e.target.value)}/>
                </label>

            <button type="submit">Submit Changes</button>


        </form>
            ):(

                <div className="emp" key={emp.id}>
                  <p>Employee Name: {emp.employeeName}</p>
                  <p>Salary: {emp.salary}</p>
                  <button onClick={()=>handleEditClick(emp)}>Edit</button>
                  <button onClick={()=>handleDeleteClick(emp.id)}>Delete</button>
                  <Promote setEmployees={setEmployees} employees={employees} emp={emp}/>

                  {/* <button onClick={()=>handleReviewClick(emp.id)}>Add Review</button> */}
                  <Review setReviews={setReviews} emp={emp} reviews={reviews} />



              </div>



            )

          ))}
      </div>
      {/* <h2 className="addEmp">Add Employee</h2>
      <form className="empForm" onSubmit = {handleSubmit}>

                <label>
                    Employee Name:
                    <input type="text" value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}/>
                </label>


                <label>
                    Department ID:
                    <input type="number" value={departmentId}
                        onChange={(e) => setDepartmentId(e.target.value)}/>
                </label>


                <label>
                    Role ID:
                    <input type="number" value={roleId} onChange={(e) => setRoleId(e.target.value)}/>
                </label>


                <label className="salary">
                    Salary:
                    <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)}/>
                </label>

            <button type="submit">Add Employee</button>


        </form> */}
    </div>



  );
}

export default Employee;
