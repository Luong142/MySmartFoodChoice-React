
import React, { useEffect, useState } from 'react';
import { dbRealtime } from '../Firebase/Firebase'; 
import { ref, get } from 'firebase/database'; 
import { Link } from 'react-router-dom'; 
import './GuestViewFood.css'; 

const GuestViewFood = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => 
  {
    const fetchRecipes = async () => 
    {
      try 
      {
        const dietitianId = 'Lj75Thf2h1NKYbZdukN9DKYLExI2';
        const dietitianRef = ref(dbRealtime, `Dietitian Recipe/${dietitianId}`); 
        const dietitianSnapshot = await get(dietitianRef);

        if (dietitianSnapshot.exists()) 
        {
          setRecipes(dietitianSnapshot.val());
          console.log(dietitianSnapshot.val());
        } 
        else 
        {
          console.log("No recipes found for this dietitian");
          setRecipes([]);
        }
      } 
      catch (error) 
      {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <h2>Recipes-Examples for User</h2>
      <p>This is where users view recipes under view recipes categories.</p>
      {recipes && Object.keys(recipes).length > 0 ? 
      (
        Object.keys(recipes).map(recipeId => 
          (
          <div key={recipeId} className='recipe'>
            <h3>{recipes[recipeId].strMeal}</h3>
            <p>{recipes[recipeId].strInstructions}</p>
            <ul>
              {recipes[recipeId].ingredientsManual.map((ingredientsManual, index) => 
              (
                <li key={index}>{ingredientsManual}</li>
              )
              )
              }
            </ul>
          </div>
        ))
      ) : (
        <p>No recipes found for this dietitian</p>
      )}
      <div className="back-button">
        <Link to="/guest">Back to Guest Page</Link>
      </div>
    </div>
  );
};

export default GuestViewFood;