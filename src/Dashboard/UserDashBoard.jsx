import React, { useState, useEffect } from 'react';
import { getDatabase, ref, query, orderByChild, equalTo, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import './DietitianDashBoard.css';
import Header from "../HeaderComponents/Header";

function DietitianDashBoard() {
  const [firstName, setFirstName] = useState('');
  const [hasBusinessProfile, setHasBusinessProfile] = useState(false);
  const userEmail = localStorage.getItem('email');
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const userRef = query(ref(db, 'Registered Accounts'), orderByChild('email'), equalTo(userEmail));

    const unsubscribeUser = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const userKey = Object.keys(userData)[0];
        const userFirstName = userData[userKey].firstName;
        setFirstName(userFirstName);

        const businessRef = ref(db, `Business Profile/${userKey}`);
        const unsubscribeBusiness = onValue(businessRef, (snapshot) => {
          setHasBusinessProfile(snapshot.exists());
        });

        return () => {
          unsubscribeBusiness();
        };
      } else {
        console.log('User not found');
      }
    }, (error) => {
      console.error("Error fetching data: ", error);
    });
    return () => unsubscribeUser();
  }, [userEmail]);

  const handleCreateProfile = () => {
    navigate('/CreateBusinessProfile');
  };

  const handleCreateRecipe = () => {
    navigate('/CreateRecipe');
  };

  const handleViewRecipes = () => {
    navigate('/ViewRecipes');
  };

  return (
    <div className="dashboard-container">
      <Header />
      {firstName && (
        <div>
          <h1>Welcome {firstName}!!!</h1>
          {!hasBusinessProfile ? (
            <div>
              <p>You need to create a business profile to manage recipes.</p>
              <button onClick={handleCreateProfile}>Create Business Profile</button>
            </div>
          ) : (
            <div className="action-buttons">
              <button onClick={handleCreateRecipe}>Create Food Recipe</button>
              <button onClick={handleViewRecipes}>View Food Recipes</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DietitianDashBoard;