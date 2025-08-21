import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Employee from './Employee.jsx';
import Role from './Role';
import Audit from './Audit';


function App() {
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [audits, setAudits] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [review, setReview] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoggedIn, setLogin] = useState(false);
  const [isSignedUp, setSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [addEmp,setAddEmp] = useState(true);
  const [empList,setEmpList] = useState(false);
  const [pim,setPIM] = useState(true);
  const [admin,setAdmin] = useState(false);
  const [audit,setAudit] = useState(false);
  // const backendUrl = import.meta.env.VITE_RENDER_URL;

  const backendUrl = 'http://localhost:8080';
  console.log('backend url',backendUrl);

  const handleAuditPage = (e)=>{
    e.preventDefault();
    setPIM(false);
    setAdmin(false);
    setAudit(true);
  }

  const handlePIMPage = (e) =>{
    e.preventDefault();
    setPIM(true);
    setAdmin(false);
  }

  const handleAdminPage = (e)=>{
    e.preventDefault();
    setAdmin(true);
    setPIM(false);
  }

  const handleLoginLink = (e) =>{
    e.preventDefault();
    setSignUp(true);
    setLogin(false);
  }
  const handleSignUpLink = (e) =>{
    e.preventDefault();
    setSignUp(false);
    setLogin(false);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/auth/login`, {
        username,
        password,
      });

      setLogin(true); // Mark as loggedin
    } catch (error) {
      console.error('Login failed:');
    }
  };
  const handleAddEmp = () => {
    setAddEmp(true);
  }
  const handleEmpList = async() =>{
    setAddEmp(false);
    setEmpList(true);
    const fetchReviews = await axios.get(`${backendUrl}/reviews`);
    console.log("fetchReviews",fetchReviews.data);
    setReviews(fetchReviews.data);
    console.log('handleemplist reviews',reviews);
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log('handle sign up');
    try {
      const response = await axios.post(`${backendUrl}/api/auth/signup`,
      {
        username,
        password,
      }
      // {
      //   withCredentials: true, // Include credentials with the request
      // }
    );

      setSignUp(true); // Mark as signed up
    } catch (error) {
      console.error('Signup failed:');
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${backendUrl}/employees`);

        setEmployees(response.data);

        const roleResponse = await axios.get(`${backendUrl}/roles`);

        setRoles(roleResponse.data);

        const auditResponse = await axios.get(`${backendUrl}/employeeAudits`);

        setAudits(auditResponse.data); // Should be 'data', not 'date'
        const fetchDepartments = await axios.get(`${backendUrl}/departments`);

        setDepartments(fetchDepartments.data);
      } catch (error) {
        console.error('Error fetching data:');
      }
    };
    fetchEmployees();
  }, []);

  return (

    <>
      {isSignedUp && isLoggedIn ? (

        <>
          <div className="navBar">
          <div onClick={handlePIMPage} className="nav-item">PIM</div>
          <div onClick={handleAdminPage} className="nav-item">ADMIN</div>
          <div onClick={handleAuditPage} className="nav-item">Audit Trail</div>
      </div>

      {
        pim?(
        <>
          <div className="horizontalNav">
        <span style={{color:'#fff'}}>PIM</span>
      </div>
      <div className="horizontalSubNav">
      <button onClick={handleAddEmp} style={{color:'#fff'}}>Add Employee</button>
      <button onClick={handleEmpList} style={{color:'#fff'}}>Employee List</button>
      </div>
      <Employee
            roles={roles}
            departments={departments}
            review={review}
            setReview={setReview}
            setReviews={setReviews}
            reviews={reviews}
            setAudits={setAudits}
            setEmployees={setEmployees}
            employees={employees}
            addEmp={addEmp}
            setAddEmp={setAddEmp}
            empList={empList}
          />
        </>

        ):admin?(
        <>
          <Role departments={departments} setDepartments={setDepartments} setRoles={setRoles} roles={roles} />
        </>
      ):audit?(<Audit setAudits={setAudits} audits={audits} />):null
      }






        </>
      ) : isSignedUp && !isLoggedIn ? (


          <form className = "loginForm" onSubmit={handleLogin}>
            <div style={{textAlign: 'left', fontSize: '30px', paddingTop: '0px',marginTop:'20px'}}>Log In</div>
            <input
              style={{marginTop:'40px'}}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}

            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Log In</button>
            <div onClick={handleSignUpLink} className="signUpLink">Looking to <span><a href="">Create an account</a>?</span></div>
          </form>

      ) : (
        <form className="signUpForm" onSubmit={handleSignup}>
          <div className="registerEle" style={{textAlign:'left',fontSize:'30px',paddingTop:'0px',marginBottom:'20px',marginTop:'20px'}}>Register</div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{marginTop:'20px'}}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
            <div onClick={handleLoginLink} className="logInLink">Don't have an account? <span><a href="">Log In</a></span></div>
          </form>
      )}
    </>
  );
}

export default App;
