import React, { useState, useEffect } from 'react';
import { getDatabase, ref, query, orderByChild, equalTo, onValue } from 'firebase/database';
import Header from "../HeaderComponents/Header";
import './DietitianDashBoard.css'; // Import the stylesheet

function DietitianDashBoard() {
  const [firstName, setFirstName] = useState('');
  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    const db = getDatabase();
    const userRef = query(ref(db, 'Registered Accounts'), orderByChild('email'), equalTo(userEmail));

    const unsubscribe = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const userKey = Object.keys(userData)[0];
        const userFirstName = userData[userKey].firstName;
        setFirstName(userFirstName);
      } else {
        console.log('User not found');
      }
    }, (error) => {
      console.error("Error fetching data: ", error);
    });

    return () => unsubscribe();
  }, [userEmail]);

  return (
    <div className="dashboard-container"> {/* Use the class for styling */}
    <Header/>
      {firstName ? (
        <h1>Welcome {firstName}!!!</h1>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DietitianDashBoard;
