import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from "axios";

function RecipeItem(props) { 
  const handleDelete = (e) => { 
      e.preventDefault(); 
      axios.delete('http://localhost:4000/api/recipe/' + props.myRecipe._id) // Axios DELETE request to delete the recipe from the server
          .then(() => {
              props.Reload(); // Refresh the recipe list after deletion
          })
          .catch((error) => {
              console.error("Error deleting recipe:", error);
          });
  };

  return (
    // Display the recipe details
    <div>
      <Card>
        <Card.Header>{props.myRecipe.title}</Card.Header> 
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <img src={props.myRecipe.image} alt={props.myRecipe.title} />
            
            {/* Displaying steps */}
            <h5>Steps:</h5>
            <ul>
              {props.myRecipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>

            {/* Displaying allergens */}
            {props.myRecipe.allergens && props.myRecipe.allergens.length > 0 && (
              <div>
                <h5>Allergens:</h5>
                <ul>
                  {props.myRecipe.allergens.map((allergen, index) => (
                    <li key={index}>{allergen}</li>
                  ))}
                </ul>
              </div>
            )}
          </blockquote>
        </Card.Body>
        <Link className="btn btn-primary" to={"/edit/"+props.myRecipe._id}>Edit</Link>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Card>
    </div>
  );
}

export default RecipeItem;
