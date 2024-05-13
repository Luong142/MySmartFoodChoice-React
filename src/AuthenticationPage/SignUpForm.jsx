import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { auth } from '../Firebase/Firebase'; // Adjust this import path to your Firebase config and instances
import './SignUpForm.css';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../HeaderComponents/Header';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userType, setUserType] = useState('user');
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
        email, // Optional: Firebase Authentication already stores the email, but you might store it for easier querying
       userType,
    
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
        {/* <div className="form-group">
     <label htmlFor="birthday" className="birthday-container">Birthday</label>
     <input
       type="date"
       id="birthday"
       value={birthday}
       onChange={(e) => setBirthday(e.target.value)}
     />
   </div>

        { <div className="form-group">
          <label htmlFor="contactNumber" className="contact-container">Contact Number</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div> } */}
        

        {/* <div className="form-group">
          <label htmlFor="userType" className="user-type-container">User Type</label>
          <select id="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="user">User</option>
            <option value="dietician">Dietician</option>
          </select>
        </div>
        {userType === 'user' && (
     <div className="form-group">
       <label htmlFor="dietaryPreference" className="dietary-preference-container">Dietary Preference</label>
       <select
         id="dietaryPreference"
         value={dietaryPreference}
         onChange={(e) => setDietaryPreference(e.target.value)}
       >
         <option value="">Select your dietary preference</option>
         <option value="non-vegetarian">Non-Vegetarian</option>
         <option value="vegetarian">Vegetarian</option>
         <option value="vegan">Vegan</option>
       </select>
     </div>
   )}
         {userType === 'user' && (
     <>
       <div className="form-group">
         <label htmlFor="peanutAllergy">Peanut Allergy</label>
         <select
           id="peanutAllergy"
           value={peanutAllergy}
           onChange={(e) => setPeanutAllergy(e.target.value)}
         >
           <option value="no">No</option>
           <option value="yes">Yes</option>
         </select>
       </div>
       <div className="form-group">
         <label htmlFor="seafoodAllergy">Seafood Allergy</label>
         <select
           id="seafoodAllergy"
           value={seafoodAllergy}
           onChange={(e) => setSeafoodAllergy(e.target.value)}
         >
           <option value="no">No</option>
           <option value="yes">Yes</option>
         </select>
       </div>
       <div className="form-group">
         <label htmlFor="dairyAllergy">Dairy Allergy</label>
         <select
           id="dairyAllergy"
           value={dairyAllergy}
           onChange={(e) => setDairyAllergy(e.target.value)}
         >
           <option value="no">No</option>
           <option value="yes">Yes</option>
         </select>
       </div>
     </>
   )} */}

        <button className="button" type="submit">Sign Up</button>
      </form>
      <p className="signup-link">Already have an account? <a href="/signin">Sign in</a></p>
      <p className="guest-link"> <Link to="/guest">Continue as Guest?</Link></p>
    </div>
  );
}

export default SignUpForm;
