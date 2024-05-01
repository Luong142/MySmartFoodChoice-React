import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/Firebase'; 

import './GuestViewFood.css';

function GuestViewFood() {
  const [foodRecipes, setFoodRecipes] = useState([]);

  useEffect(() => {
    const fetchFoodRecipes = async () => {
      try {
        const foodRecipesCollection = collection(db, 'foodRecipes');
        const snapshot = await getDocs(foodRecipesCollection);
        const recipesData = snapshot.docs.map((doc) => doc.data());
        setFoodRecipes(recipesData);
      } catch (error) {
        console.error('Error fetching food recipes:', error);
      }
    };

    fetchFoodRecipes();
  }, []);

  return (
    <div className="food-container">
      <h2>Food Recipes</h2>
      {foodRecipes.map((recipe, index) => (
        <div key={index} className="recipe">
          <h3>{recipe.title}</h3>
          <p>Description: {recipe.description}</p>
          <p>Items Needed: {recipe.itemsNeeded}</p>
          <p>Steps: {recipe.steps}</p>
        </div>
      ))}
      <div className="back-button">
        <Link to="/guest">Back to Guest Page</Link>
      </div>
    </div>
  );
}

export default GuestViewFood;
