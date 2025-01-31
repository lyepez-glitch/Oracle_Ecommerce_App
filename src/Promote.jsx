import {useState} from 'react';
import axios from 'axios';

function Promote({emp,employees,setEmployees}){
  const [promoteSalary,setPromoteSalary] = useState('')
  const [promoteRole,setPromoteRole] = useState('')
  const [promote,setPromote] = useState('');
  const backendUrl = import.meta.env.VITE_RENDER_URL;
  const handlePromoteClick = async(event,emp)=>{
    setPromote(emp.id);
  }

  const handlePromoteSubmit = async(event,emp)=>{
    event.preventDefault();
    const promoteDTO = {
      employeeId: emp.id,
      roleId: promoteRole,
      salary: promoteSalary

    }


    const response = await axios.put(`${backendUrl}/employees/promote/${emp.id}`,promoteDTO);

    setPromoteSalary('');
    setPromoteRole('');
    setPromote('');
    const fetchEmployees = await axios.get(`${backendUrl}/employees`);

    setEmployees(fetchEmployees.data);
  }

  return (
    <>
      <div style={{width:'40%',marginLeft:'15%'}}>
        {
          promote === emp.id?(
            <form className="promoteForm" key={emp.id} onSubmit = {(e)=>handlePromoteSubmit(e,emp)}>


                <label>
                    Promote Role ID:
                    <input type="number" value={promoteRole} onChange={(e) => setPromoteRole(e.target.value)}/>
                </label>


                <label>
                    Promote Salary:
                    <input type="number" value={promoteSalary} onChange={(e) => setPromoteSalary(e.target.value)}/>
                </label>

            <button style={{width:'50%'}} type="submit">Promote</button>


        </form>

          ):(
            <button style={{marginLeft:'25%'}} onClick={(event)=>handlePromoteClick(event,emp)}>Promote</button>
          )
        }
      </div>

    </>
  )
}
export default Promote;