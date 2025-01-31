import { useState } from 'react';
import axios from 'axios';

function Role({setRoles,roles}){
  const [roleName, setRoleName] = useState('');
    const [roleId, setRoleId] = useState('');
    const [salary, setSalary] = useState('');
    const[edit,setEdit] = useState(null);
    const [editedRoleName,setEditedRoleName] = useState('');
    const [editedRoleId,setEditedRoleId] = useState('');
    const [editedSalary,setEditedSalary] = useState('');
    const backendUrl = import.meta.env.VITE_RENDER_URL;

  const handleDeleteRoleClick = async (id) => {
    const response = await axios.delete(`${backendUrl}/roles/delete/${id}`);

    const fetchRoles = await axios.get(`${backendUrl}/roles`);
    setRoles(fetchRoles.data);
  }

  const handleEditRoleClick = async (role) => {
    setEdit(role.id);

    setEditedRoleName(role.roleName);
    setEditedSalary(role.salary);
  }
  const handleEditRoleSubmit = async(event,id,role)=>{
    event.preventDefault();
    const roleDTO = {
      roleName:editedRoleName,
      salary: Number(editedSalary)
    }

    const response = await axios.put(`${backendUrl}/roles/update/${id}`,roleDTO);

    setEditedRoleName('');
    setEditedSalary('');
    const fetchRoles = await axios.get(`${backendUrl}/roles`);

    setEdit(null);
    setRoles(fetchRoles.data);
  }
  const handleRoleSubmit = async (event) =>{
    event.preventDefault();
    const roleDTO = {
      roleName,
      salary: Number(salary)
    }

    const response = await axios.post(`${backendUrl}/roles/add`,roleDTO);

    setRoleName('');
    setRoleId('');
    setSalary('');
    const fetchRoles = await axios.get(`${backendUrl}/roles`);

    setRoles(fetchRoles.data);

  }
  return (
    <div className="rolesCont">
      <h2 className="rolesHeader">Roles</h2>
      <div className="rolesContainer">

          {roles.map((role, index) => (
            edit === role.id?(
              <form className="editRoleForm" key={role.id} onSubmit = {(e)=>handleEditRoleSubmit(e,role.id,role)}>

                <label>
                    Edit Role Name:
                    <input type="text" value={editedRoleName}
                        onChange={(e) => setEditedRoleName(e.target.value)}/>
                </label>

                <label>
                    Edit Salary:
                    <input type="number" value={editedSalary} onChange={(e) => setEditedSalary(e.target.value)}/>
                </label>

            <button type="submit">Submit Changes</button>


        </form>
            ):(
              <>

              <div className="role" key={role.id}>
                  <p>Role Name: {role.roleName}</p>
                  <p>Salary: {role.salary}</p>
                  <button onClick={()=>handleEditRoleClick(role)}>Edit</button>
                  <button onClick={()=>handleDeleteRoleClick(role.id)}>Delete</button>
              </div>
              </>


            )

          ))}
      </div>
      <h2 className="addRole">Add Role</h2>
      <form className= "roleForm" onSubmit = {handleRoleSubmit}>

                <label>
                    Role Name:
                    <input type="text" value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}/>
                </label>


                <label className="salary">
                    Salary:
                    <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)}/>
                </label>

            <button type="submit">Add Role</button>


        </form>
    </div>



  );
}

export default Role;