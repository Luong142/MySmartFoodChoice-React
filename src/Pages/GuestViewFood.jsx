import React, { useEffect, useState } from 'react';
import { dbRealtime } from '../Firebase/Firebase'; 
import { ref, get, set, child } from 'firebase/database'; 
import { Link } from 'react-router-dom'; 
import './GuestViewFood.css'; 

const GuestViewFood = () => {
  const [recipes, setRecipes] = useState([]);
  const [nameRecipe, setNameRecipe] = useState("Bak Chor Mee")
  const [category, setCategory] = useState("Singapore");
  const [cuisine, setCuisine] = useState("Chinese");
  const [ingredients, setIngredients] = useState(["Radish", "Vege"]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const dietitianId = 'specificRecipeId';
        const dietitianRef = ref(dbRealtime, `React Dietitian Recipe/${dietitianId}`); 
        const dietitianSnapshot = await get(dietitianRef);

        if (dietitianSnapshot.exists()) 
        {
          setRecipes([dietitianSnapshot.val()]); // Changed to array containing single recipe
        }
        else 
         {
          console.log("No recipes found for this dietitian, creating a new recipe.");
          await createRecipes();
          setRecipes([]);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    const createRecipes = async () => {
      try {
        const newRecipe = {
          category: category,
          cuisine: cuisine,
          ingredients: ingredients,
          foodName: "Carrot Cake" // Added random food name
        };
        const recipesRef = ref(dbRealtime, 'React Dietitian Recipe');
        const specificRecipeId = 'specificRecipeId'; // Specific ID instead of random
        const specificRecipeRef = child(recipesRef, specificRecipeId);
        await set(specificRecipeRef, newRecipe);
        console.log("New recipe created successfully with ID:", specificRecipeId);
      } catch (error) {
        console.error("Error creating new recipe with specific ID:", error);
      }
    };

    fetchRecipes();
  }, [category, cuisine]);

  return (
    <div>
      <h2>Recipes-Examples for User</h2>
      <p>This is where users view recipes under view recipes categories.</p>
      {recipes && recipes.length > 0 ? 
        recipes.map((recipe, index) => 
          (
          <div key={index} className='recipe'>
            <h3>{recipe.foodName}</h3> {/* Displaying the food name */}
            <p>{recipe.category}</p>
            <p>{recipe.cuisine}</p>
            <ul>
              <li>{recipe.ingredients.join(', ')}</li>
            </ul>
          </div>
        )) : (
          <p>No recipes found for this dietitian</p>
        )
      }
      <div className="back-button">
        <Link to="/guest">Back to Guest Page</Link>
      </div>
    </div>
  );
};

export default GuestViewFood;
