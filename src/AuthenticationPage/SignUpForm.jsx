import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { auth } from '../Firebase/Firebase'; // Adjust this import path to your Firebase config and instances
import './SignUpForm.css';
import { useNavigate, Link } from 'react-router-dom';
<<<<<<< Updated upstream
import Header from '../HeaderComponents/Header';
=======
import Header from "../HeaderComponents/Header";
>>>>>>> Stashed changes

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [accountType, setAccountType] = useState('User'); // Added accountType state with default value
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const db = getDatabase();
      const userRef = ref(db, 'Registered Accounts/' + user.uid);

      await set(userRef, {
        firstName,
        lastName,
        accountType, // This will save the selected account type
        email,
        password  // Caution: Storing passwords in plaintext is not secure. Consider security best practices.
      });

      console.log("Account created and additional information stored successfully");
      navigate('/'); // Navigate to the desired route after sign up
    } catch (error) {
      setError(error.message);
      console.error("Error creating user account:", error);
    }
  };

  return (
    <div className="signup-container">
      <Header/>
      <h1 className="header-title">Sign Up</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label className="username-container">First Name</label>
          <input
            type="text"
            placeholder="Please enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="username-container">Last Name</label>
          <input
            type="text"
            placeholder="Please enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="email-container">Email</label>
          <input
            type="email"
            placeholder="Please enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="password-container">Password</label>
          <input
            type="password"
            placeholder="Please enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="password-container">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="user-type-container">Account Type</label>
          <select value={accountType} onChange={(e) => setAccountType(e.target.value)} required>
            <option value="User">User</option>
            <option value="Dietitian">Dietitian</option>  // Example, add more account types as needed
          </select>
        </div>

        <button className="button" type="submit">Sign Up</button>
      </form>
      <p className="signup-link">Already have an account? <Link to="/signin">Sign in</Link></p>
      <p className="guest-link">Continue as Guest? <Link to="/guest">Click Here</Link></p>
    </div>
  );
}

export default SignUpForm;
