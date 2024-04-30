import React, { useState } from 'react';
import { getDatabase, ref, query, orderByChild, equalTo, get } from "firebase/database";
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';
import Header from '../HeaderComponents/Header';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('User'); // Default to 'User' userType
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

        snapshot.forEach((childSnapshot) => {
          const userData = childSnapshot.val();
          // Check the provided email, password, and userType against stored values
          if (userData.password === password && userData.accountType === userType) {
            userAuthenticated = true;
            // If "Remember Me" is checked, store uid and userType in local storage
            if (rememberMe) {
              localStorage.setItem('uid', childSnapshot.key);
              localStorage.setItem('userType', userType);
            }
            // Perform navigation based on userType
            if (userType === 'User') {
              navigate('/UserDashboard');
            } else if (userType === 'Dietitian') {
              navigate('/DietitianDashboard');
            }
            return true; // Stop iterating through the loop
          }
        });

        if (!userAuthenticated) {
          console.error("Invalid credentials or account type mismatch");
          // Handle login failure
        }
      } else {
        console.error("User does not exist.");
        // Handle user not found
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      // Handle error
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
            <input
              type="email"
              placeholder="Please enter email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label className='password-container'>Password</label>
            <input
              type="password"
              placeholder="Please enter password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="userType">Type of User:</label>
            <select
              name="userType"
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="User">User</option>
              <option value="Dietitian">Dietitian</option>
            </select>
          </div>
          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
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
