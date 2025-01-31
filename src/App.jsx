import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Employee from './Employee.jsx';
import Role from './Role';
import Audit from './Audit';
import Department from './Department';

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
  const backendUrl = import.meta.env.VITE_RENDER_URL;

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

  const handleSignup = async (e) => {
    e.preventDefault();
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

    <div>
      {isSignedUp && isLoggedIn ? (

        <div id="innerRoot">
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
          />

          <Role setRoles={setRoles} roles={roles} />
          <Audit setAudits={setAudits} audits={audits} />
          <Department setDepartments={setDepartments} departments={departments} />

        </div>
      ) : isSignedUp && !isLoggedIn ? (
        <div>
          <h1>Log In</h1>
          <form onSubmit={handleLogin}>
            <input
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
          </form>
        </div>
      ) : (
        <div>
          <h1>Sign Up</h1>
          <form onSubmit={handleSignup}>
            <input
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
            <button type="submit">Sign Up</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
