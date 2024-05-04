import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../Firebase/Firebase'; // Adjust this import path to where your Firebase config and instances are defined
import './SignUpForm.css'; // Ensure the CSS file is correctly linked
import { useNavigate, Link  } from 'react-router-dom';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [userType, setUserType] = useState('user');
  const [dietaryPreference, setDietaryPreference] = useState('');
  const [peanutAllergy, setPeanutAllergy] = useState('no');
  const [seafoodAllergy, setSeafoodAllergy] = useState('no');
  const [dairyAllergy, setDairyAllergy] = useState('no');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      // Create user with email and password using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user details in Firestore under the 'users' collection
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email, // Optional: Firebase Authentication already stores the email, but you might store it for easier querying
        contactNumber,
        userType,
        ...(userType === 'user' && {
          dietaryPreference,
          allergies: {
            peanuts: peanutAllergy,
            seafood: seafoodAllergy,
            dairy: dairyAllergy
          }
        }),
        birthday,
      });

      console.log("Account created and additional information stored successfully");
      navigate('/'); // Redirect to the homepage or dashboard after successful signup
    } catch (error) {
      setError(error.message); // Set the error state to display error message
      console.error("Error creating user account:", error);
    }
  };

  return (
    <div className="signup-form">
      <h2 className="signup-title">Sign Up</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="username-container">First Name</label>
          <input
            type="text"
            placeholder="Please enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="username-container">Last Name</label>
          <input
            type="text"
            placeholder="Please enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="email-container">Email</label>
          <input
            type="email"
            placeholder="Please enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="password-container">Password</label>
          <input
            type="password"
            placeholder="Please enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
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
            type="text"
            placeholder="Please enter contact number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div> }
        

        <div className="form-group">
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
   )}

        <button className="button" type="submit">Sign Up</button>
      </form>
      <p className="signup-link">Already have an account? <a href="/signin">Sign in</a></p>
      <p className="guest-link"> <Link to="/guest">Continue as Guest?</Link></p>
    </div>
  );
}

export default SignUpForm;
