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
    const [addDept,setAddDept] = useState(false);
    const [status,setStatus] = useState("");
    const [editStatus,setEditStatus] = useState("");
    const [deleteStatus,setDeleteStatus] = useState("");
    const [deletedDeptId,setDeletedDeptId] = useState(null);
    // const backendUrl = import.meta.env.VITE_RENDER_URL;
    const backendUrl = 'http://localhost:8080';

    const cancelAddDept = () => {
      setAddDept(false);
    }

    const cancelEditDept = () => {
      setEdit(null);
    }

    const handleAddDept = (e) =>{
      e.preventDefault();
      setAddDept(true);
    }

    const handleDeleteDepartmentClick = async (id) => {
      setDeletedDeptId(id);

      try {
          const response = await axios.delete(`${backendUrl}/departments/delete/${id}`);
          setDeleteStatus("success");
          setTimeout(async ()=>{
            // Update the state immediately to reflect the deletion
            setDepartments((prevDepartments) => {

              return prevDepartments.filter(department => department.id !== id);
            });
            setDeleteStatus("")
            setDeletedDeptId(null);
          },1500);

      } catch (error) {
          setDeleteStatus("error");
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



    try{
      const response = await axios.put(`${backendUrl}/departments/update/${id}`,departmentDTO);
      setEditStatus("success");
      setTimeout(async ()=>{
        setEditedDepartmentName('');
        setEditedDepartmentManager('');
        const fetchDepartments = await axios.get(`${backendUrl}/departments`);
        setEdit(null);
        setDepartments(fetchDepartments.data);
        setEditStatus("");
      },1500);
    }catch(error){
      setEditStatus("error");
    }


  }

  const handleDepartmentSubmit = async (event) =>{
    event.preventDefault();
    const departmentDTO = {
      departmentName,
      departmentManager: Number(departmentManager)
    }

    try{
      const response = await axios.post(`${backendUrl}/departments/add`,departmentDTO);
      setStatus("success")

      setTimeout(async ()=>{
        setDepartmentName('');
        setDepartmentManager(0);
        const fetchDepartments = await axios.get(`${backendUrl}/departments`);
        setDepartments(fetchDepartments.data);
        setAddDept(false);
        setStatus("");
      },1500);

    }catch(error){
      setStatus("error")
    }





  }
  return (
    <>
      {
        addDept?(
          <div className="departmentsContainer">

      <form style={{}} className ="deptForm" onSubmit = {handleDepartmentSubmit}>
        <label style={{borderBottom: '1px solid lightgray',paddingBottom:'10px',fontSize:'25px'}}>Add Organization Unit</label>

        <label>
            Department Name
            <input type="text" value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}/>
        </label>

        <label>
            Department Manager
            <input type="number" value={departmentManager} onChange={(e) => setDepartmentManager(e.target.value)}/>
        </label>
        <label>
            Salary
            <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)}/>
        </label>

        <label style={{display: 'flex',justifyContent: 'flex-end',alignItems: 'flex-end'}}>
        <div className={(status === "success" ? "successMsg" : status === "error" ? "errorMsg" : "")+(status === ""? " hidden" : "")}>
                {status === "success" && "Dept successfully added!"}
                {status === "error" && "Something went wrong."}
        </div>
        {/* <div className="errorMsg">

                Something went wrong.
        </div> */}

          <div className="deptFormBtns" style={{display:'flex',justifyContent:'flex-end',gap:'10px'}}>
            <button style={{marginLeft:'300px'}} onClick={cancelAddDept} className="cancel">Cancel</button>
            <button type="submit">Save</button>
          </div>

        </label>



      </form>

      {/* <div className="deptsContainer">

      </div> */}



    </div>

        ):null
      }



    <div className="deptsWrapper">
      <div style={{ paddingTop: '0px',marginBottom:'80px'}} className="deptsHeadDivider">
        <div className="orgStructure" style={{color:'#64728c',fontWeight:'bold',borderBottom:'1px solid lightgray',padding: '10px',textAlign:'left',paddingRight: '10px',borderRadius:'0px',width: '90%'}}>Organization Structure</div>
        <div className="plusAddCont" style={{display: 'flex',justifyContent: 'flex-end',paddingRight: '0px',borderRadius: '0px'}}>
          {/* <div>dept deleted successfully</div> */}
          {/* <span style={{marginRight:'35%',marginTop:'25px'}} className={"deleteDeptStatusEle " + (deleteStatus === "success" ? "successMsg" : deleteStatus === "error" ? "errorMsg" : "") + (deleteStatus === "" ? " hidden" : "")
           }>
            {deleteStatus === "success" && "Dept successfully deleted!"}
            {deleteStatus === "error" && "Something went wrong."}
           </span> */}
          <button onClick={handleAddDept} style={{marginRight:'50px',backgroundColor: '#2e21bc',borderRadius: '20px'}}>+Add</button>
        </div>

      </div>
      <div className="deptLabels">
        <span>Name</span>
        <span>Managed by</span>
        <span>Actions</span>
      </div>

      {departments.map((department, index) => (
            edit === department.id?(
              <form className="editDept" key={department.id} onSubmit = {(e)=>handleEditDepartmentSubmit(e,department.id,department)}>
                <div className="editDeptContent">
                  <label style={{ color: '#64728c',fontWeight:'bold',textAlign:'left',borderBottom:'1px solid lightgray',paddingBottom:'5px',marginBottom:'20px'}}>Edit Organization Unit</label>
                <label>
                    Department Name
                    <input type="text" value={editedDepartmentName}
                        onChange={(e) => setEditedDepartmentName(e.target.value)}/>
                </label>

                <label>
                    Department
                    <input type="number" value={editedDepartmentManager} onChange={(e) => setEditedDepartmentManager(e.target.value)}/>
                </label>
                <label>
                    Salary
                    <input type="number" value={editedSalary} onChange={(e) => setEditedSalary(e.target.value)}/>
                </label>
                <label style={{borderBottom: '1px solid lightgray', width: '100%',marginTop:'40px',marginBottom:'10px'}} className="editDeptDivider"></label>
                <label style={{flexDirection:'row'}} className="editDeptBtnCont">


                <div style={{marginTop: '20px',marginLeft: '40px'}} className={(editStatus === "success" ? "successMsg" : editStatus === "error" ? "errorMsg" : "") + (editStatus === "" ? " hidden" : "")}>
                {editStatus === "success" && "Dept edited successfully!"}
                {editStatus === "error" && "Something went wrong."}
            </div>

{/* <div style={{marginTop: '20px',marginLeft: '40px'}} className="errorMsg">

                Something went wrong.
            </div> */}
            {/* <div style={{marginTop: '20px',marginLeft: '40px'}} className="successMsg">
                Dept edited successfully!

            </div> */}


            <button style={{marginLeft:'200px',marginRight:'0'}} onClick={cancelEditDept} className="cancel">Cancel</button>
            <button  type="submit">Save</button>
                </label>

                </div>




        </form>
            ):(
              <div className="dept" key={department.id}>
                  <p>{department.departmentName}</p>
                  <p>Managed by {department.departmentManager}</p>


                  {
                    deletedDeptId === department.id && (
                      <div style={{marginRight:'35%',marginTop:'25px'}} className={"deleteDeptStatusEle " + (deleteStatus === "success" ? "successMsg" : deleteStatus === "error" ? "errorMsg" : "") + (deleteStatus === "" ? " hidden" : "")
                      }>
                        {deleteStatus === "success" && "Dept successfully deleted!"}
                        {deleteStatus === "error" && "Something went wrong."}
                      </div>
                    )
                  }
                  {/* {
                    deletedDeptId === department.id && (
                      <div style={{marginRight:'35%',marginTop:'25px'}} className="deleteDeptStatusEle successMsg">
                       Dept successfully deleted!

                      </div>
                    )
                  } */}





                  <div className="deptBtnCont">
                  <button onClick={()=>handleEditDepartmentClick(department)}>Edit</button>
                  <button onClick={()=>handleDeleteDepartmentClick(department.id)}>Delete</button>
                  </div>

              </div>

            )

          ))}
    </div>

</>

  );
}

export default Department;