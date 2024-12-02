import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from "axios";

function RecipeItem(props) { //props is used to pass data from one component to another
  const handleDelete = (e) => { //handleDelete function is used to delete the recipe
      e.preventDefault(); 
      axios.delete('http://localhost:4000/api/recipe/' + props.myRecipe._id) //axios delete request is used to delete the recipe
          .then(() => {
              props.Reload(); // Refresh the recipe list after deletion
          })
          .catch((error) => {
              console.error("Error deleting movie:", error);
          });
  };
  return (
    <div>
      <Card>
        <Card.Header>{props.myRecipe.title}</Card.Header> 
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <img src={props.myRecipe.image} alt={props.myRecipe.title} />
            <footer>{props.myRecipe.steps}</footer>
          </blockquote>
        </Card.Body>
        <Link className="btn btn-primary" to={"/edit/"+props.myRecipe._id}>Edit</Link>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Card>
    </div>
  );
}

export default RecipeItem;