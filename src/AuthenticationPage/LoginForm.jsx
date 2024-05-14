import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { auth } from '../Firebase/Firebase'; // Ensure this path is correct for your Firebase configuration
import { doc, getDoc } from "firebase/firestore";
import { db } from '../Firebase/Firebase'; // Ensure this path is correct for your Firestore configuration

async function fetchUserType(uid) {
  try {
    const userDoc = doc(db, "users", uid); // Assuming 'users' is the collection where user data is stored
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      return docSnap.data().userType; // Assuming 'userType' is the field where user type is stored
    } else {
      console.error("No such user found!");
      return null; // Handle the case where user data does not exist
    }
  } catch (error) {
    console.error("Error fetching user type:", error);
    return null; // Handle errors in fetching user data
  }
}
function LoginForm() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user'); // Ensure this is set to 'user' by default
  const navigate = useNavigate(); // Initialize navigate hook for programmatically navigating
  // Handle form submission for login
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    
    // Fixed admin credentials for demonstration purposes
    const adminEmail = "admin@example.com";
    const adminPassword = "adminPass";
    
    if (email === adminEmail && password === adminPassword) {
      window.alert("Admin login successful");
      navigate('/adminDashboard'); // Navigate to admin dashboard
      return; // Prevent further execution
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Assuming you have a method to fetch user type from your backend or auth service
      const fetchedUserType = await fetchUserType(user.uid); // This function needs to be implemented
  
      if (fetchedUserType !== userType) {
        window.alert("Login failed: Incorrect user type selected.");
        console.error("Login failed: User type does not match.");
        return; // Stop execution if the user type does not match
      }
  
      console.log("Login successful");
      // Navigate based on user type
      switch(userType) {
        case 'user':
          window.alert("User Login succesful ");
          navigate('/userDashboard');
          break;
        case 'vendorDietitian':
          window.alert("Dietician Login succesful ");
          navigate('/dietitianDashboard');
          break;
        default:
          console.error("Access Denied: Unauthorized user type");
          break;
      }
    } catch (error) {
      window.alert("Login failed: Incorrect credentials.");
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="login-container">
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

          <div className="dropdown">
            <label htmlFor="logInAs">Log In As:</label>
            <select id="logInAs" value={userType} onChange={(e) => setUserType(e.target.value)}>
              <option value="user">User</option>
              <option value="vendorDietitian">Dietitian</option>
            </select>
          </div>

          <div className="remember-me">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember me?</label>
          </div>

          <button className='login-button' type="submit">LOGIN</button>
        </form>

        <a href="#" className="forgot-password">Forget Password?</a>

        <div className="divider">OR</div>

        <div className='signup-link'>
          Need an Account? <Link to="/SignUp">SIGN UP</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
