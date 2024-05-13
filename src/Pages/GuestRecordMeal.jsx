import React from 'react';
import { Link } from 'react-router-dom';
import './GuestRecordMeal.css'; // Import the CSS file for styling
import photoIcon from '../assets/PhotoIcon.jpg'; // Import the photo icon

function GuestRecordMeal() {
  return (
    <div className="record-meal-container">
      
      <div className="photo-upload-section">
        
        <label htmlFor="photo-upload" className="upload-label">
          <img src={photoIcon} alt="Photo Icon" className="photo-icon" />
          Please upload the food photo:
        </label>
        <input type="file" id="photo-upload" accept="image/*" className="upload-input" />
      </div>

      
      <div className="back-button">
        <Link to="/guest">Back to Guest Page</Link>
      </div>
    </div>
  );
}

export default GuestRecordMeal;
