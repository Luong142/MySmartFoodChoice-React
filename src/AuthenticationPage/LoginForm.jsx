import React, { useState } from 'react';
import { getDatabase, ref, query, orderByChild, equalTo, get } from "firebase/database";
import { useNavigate, Link } from 'react-router-dom';
import './LoginForm.css';
import Header from '../HeaderComponents/Header';


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('User');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const db = getDatabase();
    const usersRef = ref(db, 'Registered Accounts');
    const emailQuery = query(usersRef, orderByChild('email'), equalTo(email));

    try {
      const snapshot = await get(emailQuery);
      if (snapshot.exists()) {
        let userAuthenticated = false;
        // Convert snapshot to an array and use a regular for loop
        const usersArray = [];
        snapshot.forEach(childSnapshot => {
          usersArray.push({ key: childSnapshot.key, data: childSnapshot.val() });
        });

        for (const { key, data } of usersArray) {
          if (data.password === password && data.accountType === userType) {
            userAuthenticated = true;
            localStorage.setItem('uid', key);
            localStorage.setItem('userType', userType);
            localStorage.setItem('email', email);  // Store email on successful login
            if (userType === 'User') {
              navigate('/UserDashBoard');
            } else if (userType === 'Dietitian') {
              navigate('/DietitianDashBoard');
            }
            break;
          }
        }

        if (!userAuthenticated) {
          console.error("Invalid credentials or account type mismatch");
          alert("Invalid credentials or account type mismatch");
        }
      } else {
        console.error("User does not exist.");
        alert("User does not exist.");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <Header/>
      <div className="login-form">
        <h2 className='login-title'>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label className='email-container'>Email</label>
            <input type="email" placeholder="Enter your email" value={email} required onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label className='password-container'>Password</label>
            <input type="password" placeholder="Enter your password" value={password} required onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="userType">Type of User:</label>
            <select name="userType" id="userType" value={userType} required onChange={(e) => setUserType(e.target.value)}>
              <option value="User">User</option>
              <option value="Dietitian">Dietitian</option>
            </select>
          </div>
          <div className="remember-me">
            <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
            <label htmlFor="rememberMe">Remember me?</label>
          </div>
          <button className='login-button' type="submit">LOGIN</button>
        </form>
        <div className='signup-link'>
          Need an Account? <Link to="/SignUp">SIGN UP</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
