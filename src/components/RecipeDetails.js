import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // For getting the URL params
import axios from 'axios';
import { Container, Card, ListGroup, Image, Spinner } from 'react-bootstrap';

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

  //used to handle the case when the recipe data is still being fetched from the server and hasn't been loaded
  if (!recipe) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading recipe details...</p>
      </Container>
    );
  }


  return (
    // Display the recipe details with Bootstrap styling
    <Container className="my-5">
      <Card>
        <Card.Header as="h1" className="text-center">
          {recipe.title}
        </Card.Header>
        <Card.Body>
          <div className="text-center">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fluid
              style={{ maxWidth: '600px', height: 'auto' }}
            />
          </div>
          <Card.Text as="h3" className="mt-4">Steps</Card.Text>
          <ListGroup variant="flush">
            {recipe.steps.map((step, index) => (
              <ListGroup.Item key={index}>
                Step {index + 1}: {step}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Card.Text as="h3" className="mt-4">Allergens</Card.Text>
          <ListGroup variant="flush">
            {recipe.allergens.length > 0 ? (
              recipe.allergens.map((allergen, index) => (
                <ListGroup.Item key={index}>{allergen}</ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>No allergens specified</ListGroup.Item>
            )}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RecipeDetails;
