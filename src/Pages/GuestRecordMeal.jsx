import React from 'react';
import { Link } from 'react-router-dom';
import './GuestRecordMeal.css'; 
import recordMealImage from '../assets/Record.jpg';

function GuestRecordMeal() {
  return (
    <div className="record-meal-container">
      <div className="photo-upload-section">
        {/* Displaying the RecordMeal.JPG image */}
        <img src={recordMealImage} alt="Record Meal" className="record-meal-image" />
      </div>

      <div className="explanation">
        {/* Updating the explanation */}
        <p>This is where users can record their meals.</p>
        <label htmlFor="photo-upload" className="upload-label">
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

