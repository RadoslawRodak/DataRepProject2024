import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Read() {
  const [data, setData] = useState([]);

  const Reload = () => {
    console.log("Reloading recipe data...");
    axios.get('http://localhost:4000/api/recipes')
      .then((response) => {
        setData(response.data.recipes);
      })
      .catch((error) => {
        console.error("Error reloading data:", error);
      });
  };

  useEffect(() => {
    Reload();
  }, []);

  // Handle delete recipe
  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/api/recipe/${id}`)
      .then((response) => {
        console.log(response.data);
        Reload(); // Reload recipes after deleting
      })
      .catch((error) => {
        console.error("Error deleting recipe:", error);
      });
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Recipe List</h2>
      <Row>
        {data.map((recipe) => (
          <Col md={4} sm={6} xs={12} key={recipe._id} className="mb-4">
            <Card className="shadow-sm">
              <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text>
                  <strong>Allergens:</strong>
                  <ul>
                    {recipe.allergens.length > 0 ?
                      recipe.allergens.map((allergen, index) => (
                        <li key={index}>{allergen}</li>
                      )) : (
                        <li>No allergens specified</li>
                      )}
                  </ul>
                </Card.Text>
                <Button
                  variant="primary"
                  href={`/recipe/${recipe._id}`}
                  className="w-100 mb-2"
                >
                  View Recipe
                </Button>
                <Row>
                  <Col>
                    <Link to={`/edit/${recipe._id}`}>
                      <Button variant="warning" className="w-100 mb-2">Edit</Button>
                    </Link>
                  </Col>
                  <Col>
                    <Button
                      variant="danger"
                      className="w-100"
                      onClick={() => handleDelete(recipe._id)}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Read;
