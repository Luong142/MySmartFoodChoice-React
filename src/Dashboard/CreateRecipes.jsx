import React, { useState } from 'react';
import { getDatabase, ref, push, set } from 'firebase/database'; // Make sure 'set' is imported
import { useNavigate } from 'react-router-dom';
import Header from "../HeaderComponents/Header";
import './CreateRecipes.css';

function CreateRecipe() {
    const [meal, setMeal] = useState('');
    const [area, setArea] = useState('');
    const [category, setCategory] = useState('');
    const [instructions, setInstructions] = useState('');
    const navigate = useNavigate();

    const handleCreateRecipe = async (event) => {
        event.preventDefault();
        const db = getDatabase();
        const userId = localStorage.getItem('uid'); // Retrieve the user's ID from local storage

        const recipeRef = ref(db, `Dietitian Recipe/${userId}`);
        const newRecipeRef = push(recipeRef); // Create a new recipe ID under the user's path
        try {
            await set(newRecipeRef, {
                strMeal: meal,
                strArea: area,
                strCategory: category,
                strInstructions: instructions
            });
            alert('Recipe created successfully!');
            navigate('/'); // Redirect or handle navigation as needed
        } catch (error) {
            console.error('Failed to save recipe:', error);
            alert('Failed to save recipe');
        }
    };

    return (
        <div className="recipe-form-container">
            <h1>Create Food Recipe</h1>
            <form onSubmit={handleCreateRecipe}>
                <label>
                    Meal:
                    <input type="text" value={meal} onChange={(e) => setMeal(e.target.value)} required />
                </label>
                <label>
                    Area:
                    <input type="text" value={area} onChange={(e) => setArea(e.target.value)} required />
                </label>
                <label>
                    Category:
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                </label>
                <label>
                    Instructions:
                    <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
                </label>
                <button type="submit">Create Recipe</button>
            </form>
        </div>
    );
}

export default CreateRecipe;
