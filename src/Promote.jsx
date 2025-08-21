import {useState} from 'react';
import axios from 'axios';

function Promote({emp,employees,setEmployees,status,setStatus}){
  const [promoteSalary,setPromoteSalary] = useState('')
  const [promoteRole,setPromoteRole] = useState('')
  const [promote,setPromote] = useState('');
  const backendUrl = import.meta.env.VITE_RENDER_URL;
  // const backendUrl = 'http://localhost:8080';
  const handlePromoteClick = async(event,emp)=>{
    setPromote(emp.id);
  }
  const cancelPromoteEmp = () =>{
    setPromote('');
  }

  const handlePromoteSubmit = async(event,emp)=>{
    event.preventDefault();
    const promoteDTO = {
      employeeId: emp.id,
      roleId: promoteRole,
      salary: promoteSalary

    }



    try{

      const response = await axios.put(`${backendUrl}/employees/promote/${emp.id}`,promoteDTO);
      setStatus("success");

      setTimeout(async ()=>{
        setPromoteSalary('');
        setPromoteRole('');
        setPromote('');
        const fetchEmployees = await axios.get(`${backendUrl}/employees`);
        setEmployees(fetchEmployees.data);
        setStatus("");
      },1500);

    }catch(error){
      setStatus("error");
    }

  }

  return (
    <>
      <div className="promoteFormCont" style={{width:'40%',marginLeft:'15%',padding:'0',margin:'0'}}>
        {
          promote === emp.id?(
            <div className="promotionCont">

              <form className="promoteForm" key={emp.id} onSubmit = {(e)=>handlePromoteSubmit(e,emp)}>
              <label style={{fontSize:'25px'}} className="promoteEmpLabel">Promote Employee</label>
                <label style={{marginTop:'80px'}}>
                    Role ID
                    <input type="number" value={promoteRole} onChange={(e) => setPromoteRole(e.target.value)}/>
                </label>


                <label style={{}}>
                    Salary
                    <input type="number" value={promoteSalary} onChange={(e) => setPromoteSalary(e.target.value)}/>
                </label>
                <div className="promoteFormDivider"></div>
                <div className="promoteBtnCont">
                <div className={status === "success" ? "successMsg" : status === "error" ? "errorMsg" : "hidden"}>
                {status === "success" && "Promoted employee successfully!"}
                {status === "error" && "Something went wrong."}
                </div>
                {/* <div className="successMsg">
                Promoted employee successfully!

                </div> */}


                  <div className="promoteBtns">
                    <button style={{marginRight:'20px'}} onClick={cancelPromoteEmp} className="cancel">Cancel</button>
                    <button style={{width:'50%'}} type="submit">Save</button>
                  </div>

                </div>



                </form>
            </div>


          ):(
            <button style={{marginLeft:'25%',padding:'0',margin:'0'}} onClick={(event)=>handlePromoteClick(event,emp)}>Promote</button>
          )
        }
      </div>

    </>
  )
}
export default Promote;