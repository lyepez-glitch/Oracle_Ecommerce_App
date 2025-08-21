import { useState } from 'react';
import axios from 'axios';
import Department from './Department';

function Role({setRoles,roles,departments,setDepartments}){
  const [roleName, setRoleName] = useState('');
    const [roleId, setRoleId] = useState('');
    const [salary, setSalary] = useState('');
    const[edit,setEdit] = useState(null);
    const [editedRoleName,setEditedRoleName] = useState('');
    const [editedRoleId,setEditedRoleId] = useState('');
    const [editedSalary,setEditedSalary] = useState('');
    const [addRole,setAddRole] = useState(true);
    const [rolesList,setRolesList] = useState(false);
    const [deptsPage,setDeptsPage] = useState(false);
    const [status,setStatus] = useState("")
    const [editRoleStatus,setEditRoleStatus] = useState("")
    const [deleteRoleStatus,setDeleteRoleStatus] = useState("")
    const [deletedRoleId,setDeletedRoleId] = useState(null);


    // const backendUrl = import.meta.env.VITE_RENDER_URL;
    const backendUrl = 'http://localhost:8080';
    console.log('rolesList:', rolesList, 'deptsPage:', deptsPage, Boolean(deptsPage));

    const cancelEditRole = () => {
      setEdit(null);
    }

  const handleDeleteRoleClick = async (id) => {
    console.log('handleDeleteRoleClick')
    setDeletedRoleId(id);

    try{

      const response = await axios.delete(`${backendUrl}/roles/delete/${id}`);
      setDeleteRoleStatus("success")

      setTimeout(async ()=>{
        const fetchRoles = await axios.get(`${backendUrl}/roles`);
        console.log('fetchroles',fetchRoles);
        setRoles(fetchRoles.data);
        setDeleteRoleStatus("")
        setDeletedRoleId(null);

      },1500);
    }catch(error){
      console.log("error",error)
      setDeleteRoleStatus("error")
    }

  }
  const handleAddRole = (e) =>{
    e.preventDefault();
    setAddRole(true);
    setRolesList(false);
    setDeptsPage(false);
  }
  const handleDepts = (e) => {
    e.preventDefault();
    setAddRole(false);
    setRolesList(false);
    setDeptsPage(true);
  }
  const handleRolesList = (e) =>{
    e.preventDefault();
    setAddRole(false);
    setRolesList(true);

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
    try{
      const response = await axios.put(`${backendUrl}/roles/update/${id}`,roleDTO);
      setEditRoleStatus("success")

      setTimeout(async ()=>{
        setEditedRoleName('');
        setEditedSalary('');
        const fetchRoles = await axios.get(`${backendUrl}/roles`);

        setEdit(null);
        setRoles(fetchRoles.data);
        setEditRoleStatus("")

    },1500);

    }catch(error){
      console.log('error')
      setEditRoleStatus("error")
    }



  }

  const handleRoleSubmit = async (event) =>{
    event.preventDefault();
    const roleDTO = {
      roleName,
      salary: Number(salary)
    }

    try{
      const response = await axios.post(`${backendUrl}/roles/add`,roleDTO);
      setStatus("success");

      setTimeout(async ()=>{
        setRoleName('');
        setRoleId('');
        setSalary('');
        const fetchRoles = await axios.get(`${backendUrl}/roles`);
        setRoles(fetchRoles.data);
        setStatus("");
      },1500);



    }catch(error){
      setStatus("error")
    }


  }
  return (
    <div style={{
      maxWidth: rolesList ? '80%' : deptsPage? '80%':'40%',left: rolesList || deptsPage ? '27%': '45%'

    }} className={"rolesCont " + (rolesList? 'maxWidthRolesCont':deptsPage?'deptContClass':'' )}>


      <div className="horizontalNav">
              <span style={{color:'#fff'}}>ADMIN</span>
          </div>
          <div style={{gap:'20px'}} className="horizontalSubNav">
            <button onClick={handleAddRole} style={{color:'#fff'}}>Add Role</button>
            <button onClick={handleRolesList} style={{color:'#fff'}}>Roles List</button>
            <button onClick={handleDepts} style={{color:'#fff'}}>Departments</button>

          </div>

          {
            rolesList?(
              <>
                <div className="roleDivider">
            Job Titles
          </div>
          <div className="recordsFound">
            <span>{roles.length} </span>Records Found




          </div>


              <div className="rolesContainer">
        <div className="roleKeys"><span>Job Title</span> <span style={{marginLeft:'30px'}}>Salary</span><span>Actions</span></div>

          {roles.map((role, index) => (
            edit === role.id?(
              <form className="editRoleForm" key={role.id} onSubmit = {(e)=>handleEditRoleSubmit(e,role.id,role)}>
                <div className="editRoleDiv" style={{gap: '50px',display: 'flex',padding:'0px'}}>
                <label>
                    <input type="text" value={editedRoleName}
                        onChange={(e) => setEditedRoleName(e.target.value)}/>
                    </label>

                    <label>

                    <input type="number" value={editedSalary} onChange={(e) => setEditedSalary(e.target.value)}/>
                </label>
                </div>

            <button style={{marginRight: '-40px'}} onClick={cancelEditRole} className="cancel">Cancel</button>
            <button type="submit">Save</button>


            <div style={{marginLeft:'30%'}} className={"editRoleStatusEle " + (editRoleStatus === "success" ? "successMsg" : editRoleStatus === "error" ? "errorMsg" : "") + (editRoleStatus === "" ? " hidden" : "")
           }>
            {editRoleStatus === "success" && "Role successfully edited!"}
            {editRoleStatus === "error" && "Something went wrong."}
           </div>
           {/* <div style={{marginLeft:'30%'}} className="successMsg">
            Role successfully edited!

           </div> */}
            {/* <div style={{marginLeft:'30%'}} className="errorMsg">
            Something went wrong.

           </div> */}






        </form>
            ):(
              <>

              <div className="role" key={role.id}>

                  <p>{role.roleName}</p>
                  <p>{role.salary}</p>

                  <div className="roleBtnCont">
                    <button className="editRoleBtn" onClick={()=>handleEditRoleClick(role)}>Edit</button>
                    <button className="deleteRoleBtn" onClick={()=>handleDeleteRoleClick(role.id)}>Delete</button>

                  </div>
                  {

                    deletedRoleId === role.id && (
                      <div className={"deleteRoleStatusEle " + (deleteRoleStatus === "success" ? "successMsg" : deleteRoleStatus === "error" ? "errorMsg" : "") + (deleteRoleStatus === ""? " hidden" : "")}>
                    {deleteRoleStatus === "success" && "Role successfully deleted!"}
                    {deleteRoleStatus === "error" && "Something went wrong"}
                  </div>
                    )
                  }




              </div>
              </>


            )

          ))}
      </div>
              </>

            ):addRole?(<>
              <h2 style={{display:'none'}} className="addRole">Add Role</h2>
              <div className = "addJobTitle" style={{color:'#64728c',fontWeight:'bold',borderBottom: '1px solid lightgray',textAlign:'left',width: '90%',
    borderRadius: '0px',marginLeft: '20px'}}>Add Job Title</div>

      <form style={{}} className= "roleForm" onSubmit = {handleRoleSubmit}>

                <label>
                    Role Name
                    <input type="text" value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}/>
                </label>


                <label className="salary">
                    Salary
                    <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)}/>
                </label>

                <div style={{position: 'absolute',marginTop: '200px',maxWidth: '50%'}} className={status === "success" ? "successMsg" : status === "error" ? "errorMsg" : "hidden"}>
                {status === "success" && "Role successfully added!"}
                {status === "error" && "Something went wrong."}
                </div>
                {/* <div style={{position: 'absolute',marginTop: '200px',maxWidth: '50%'}} className="errorMsg">

                Something went wrong.
                </div> */}








                <div style={{display: 'flex',justifyContent: 'flex-end',paddingRight: '0px'}}>
                <button type="submit">Save</button>

                </div>




        </form>
            </>):deptsPage?(
              <Department setDepartments={setDepartments} departments={departments} />
            ):null
          }


    </div>



  );
}

export default Role;