import { useState } from 'react';
import axios from 'axios';

function Department({setDepartments,departments}){

    const [departmentName, setDepartmentName] = useState('');
    const [departmentManager, setDepartmentManager] = useState('');
    const [salary,setSalary] = useState(0);
    const [editedSalary,setEditedSalary] = useState(0);
    const [editedDepartmentName,setEditedDepartmentName] = useState('');
    const [editedDepartmentManager,setEditedDepartmentManager] = useState(0);
    const [edit,setEdit] = useState(0);
    const backendUrl = import.meta.env.VITE_RENDER_URL;

    const handleDeleteDepartmentClick = async (id) => {


      try {
          const response = await axios.delete(`${backendUrl}/departments/delete/${id}`);


          // Update the state immediately to reflect the deletion
          setDepartments((prevDepartments) => {

              return prevDepartments.filter(department => department.id !== id);
          });
      } catch (error) {
          console.error('Error deleting department:');
      }
  }



  const handleEditDepartmentClick = async (department) => {

    setEdit(department.id);
    setEditedDepartmentName(department.departmentName);
    setEditedDepartmentManager(department.departmentManager);
  }

  const handleEditDepartmentSubmit = async(event,id,department)=>{
    event.preventDefault();
    const departmentDTO = {
      departmentName:editedDepartmentName,
      departmentManager: editedDepartmentManager

    }

    const response = await axios.put(`${backendUrl}/departments/update/${id}`,departmentDTO);

    setEditedDepartmentName('');
    setEditedDepartmentManager('');
    const fetchDepartments = await axios.get(`${backendUrl}/departments`);

    setEdit(null);
    setDepartments(fetchDepartments.data);
  }
  const handleDepartmentSubmit = async (event) =>{
    event.preventDefault();
    const departmentDTO = {
      departmentName,
      departmentManager: Number(departmentManager)
    }

    const response = await axios.post(`${backendUrl}/departments/add`,departmentDTO);

    setDepartmentName('');
    setDepartmentManager(0);
    const fetchDepartments = await axios.get(`${backendUrl}/departments`);

    setDepartments(fetchDepartments.data);

  }
  return (
    <div className="departmentsContainer">
      <h2 className="deptHeader">Add department</h2>
      <form className ="deptForm" onSubmit = {handleDepartmentSubmit}>

        <label>
            Department Name:
            <input type="text" value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}/>
        </label>

        <label>
            Department Manager:
            <input type="number" value={departmentManager} onChange={(e) => setDepartmentManager(e.target.value)}/>
        </label>
        <label>
            Salary:
            <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)}/>
        </label>

        <button type="submit">Add Department</button>


      </form>
      <h2 class="deptsHeader">Departments</h2>
      <div className="deptsContainer">
          {departments.map((department, index) => (
            edit === department.id?(
              <form className="editDept" key={department.id} onSubmit = {(e)=>handleEditDepartmentSubmit(e,department.id,department)}>

                <label>
                    Edit Department Name:
                    <input type="text" value={editedDepartmentName}
                        onChange={(e) => setEditedDepartmentName(e.target.value)}/>
                </label>

                <label>
                    Edit Department:
                    <input type="number" value={editedDepartmentManager} onChange={(e) => setEditedDepartmentManager(e.target.value)}/>
                </label>
                <label>
                    Edit Salary:
                    <input type="number" value={editedSalary} onChange={(e) => setEditedSalary(e.target.value)}/>
                </label>

            <button type="submit">Submit Changes</button>


        </form>
            ):(
              <div className="dept" key={department.id}>
                  <p>Department Name: {department.departmentName}</p>
                  <p>Department Manager: {department.departmentManager}</p>
                  <button onClick={()=>handleEditDepartmentClick(department)}>Edit</button>
                  <button onClick={()=>handleDeleteDepartmentClick(department.id)}>Delete</button>
              </div>

            )

          ))}
      </div>

      {/* <h2 className="deptHeader">Add department</h2> */}
      {/* <form className ="deptForm" onSubmit = {handleDepartmentSubmit}>

                <label>
                    Department Name:
                    <input type="text" value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}/>
                </label>

                <label>
                    Department Manager:
                    <input type="number" value={departmentManager} onChange={(e) => setDepartmentManager(e.target.value)}/>
                </label>
                <label>
                    Salary:
                    <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)}/>
                </label>

            <button type="submit">Add Department</button>


        </form> */}
    </div>



  );
}

export default Department;