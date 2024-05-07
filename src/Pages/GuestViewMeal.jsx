import React from 'react';
import { Link } from 'react-router-dom';
import './GuestViewMeal.css'; 
import daysImage from '../assets/LogMyMeal.jpg'; 
import recordMealImage from '../assets/MealHistory.jpg'; 

function GuestViewMeal() {
  return (
    <div className="view-meal-container">
      {/* Display images */}
      <div className="images-section">
        <img src={daysImage} alt="Days" className="days-image" />
        <img src={recordMealImage} alt="Record Meal" className="record-meal-image" />
      </div>

      {/* Information */}
      <div className="info-section">
        <p>This is what a user can see in the View Meal History where Users can upload a food photo and save it under Morning, Afternoon, and Night.</p>
      </div>

      {/* Back button */}
      <div className="back-button">
        <Link to="/guest">Back to Guest Page</Link>
      </div>
    </div>
  );
}

export default GuestViewMeal;
