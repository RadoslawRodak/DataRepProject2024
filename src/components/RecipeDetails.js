import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // For getting the URL params
import axios from 'axios';

function RecipeDetails() {
  const { id } = useParams();  // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch the recipe details from the server
    axios.get(`http://localhost:4000/api/recipe/${id}`)
      .then(response => {
        setRecipe(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the recipe!", error);
      });
  }, [id]);  // Re-fetch if the recipe ID changes

  return (
    <div>
      <h1>{recipe.title}</h1>
      <img 
        src={recipe.image} 
        alt={recipe.title} 
        style={{ width: '100%', height: 'auto', maxWidth: '600px' }} 
      />
      <h3>Steps</h3>
      <ul>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
      <h3>Allergens</h3>
      <ul>
        {recipe.allergens.map((allergen, index) => (
          <li key={index}>{allergen}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeDetails;
