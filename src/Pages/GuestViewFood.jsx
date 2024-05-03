import React, { useEffect, useState } from 'react';
import { dbRealtime } from '../Firebase/Firebase'; 
import { ref, get } from 'firebase/database'; 

const GuestViewFood = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const dietitianId = '3uXPL9DJvFOWYn3jR4W8sW8BHLT2';
        const dietitianRef = ref(dbRealtime, `Dietitian Recipe/${dietitianId}`); 
        const dietitianSnapshot = await get(dietitianRef);

        if (dietitianSnapshot.exists()) {
          setRecipes(dietitianSnapshot.val());
        } else {
          console.log("No recipes found for this dietitian");
          setRecipes([]);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <h2>Recipes for Dietitian with ID: 3uXPL9DJvFOWYn3jR4W8sW8BHLT2</h2>
      {recipes && Object.keys(recipes).length > 0 ? (
        Object.keys(recipes).map(recipeId => (
          <div key={recipeId} className='recipe'>
            <h3>{recipes[recipeId].strMeal}</h3>
            <p>{recipes[recipeId].strInstructions}</p>
            <ul>
              {recipes[recipeId].ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No recipes found for this dietitian</p>
      )}
    </div>
  );
};

export default GuestViewFood;



























