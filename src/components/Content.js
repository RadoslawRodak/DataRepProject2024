import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Spinner } from 'react-bootstrap';

const Content = () => {
  // State for the featured recipe and loading state
  const [featuredRecipe, setFeaturedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the featured recipe from the server when the component mounts
  useEffect(() => {
    // Replace this with your API URL
    const fetchFeaturedRecipe = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/featured-recipe'); // API endpoint
        const data = await response.json();
        setFeaturedRecipe(data);
      } catch (error) {
        console.error('Error fetching featured recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedRecipe();
  }, []);

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Welcome to Recipe Organiser!</h1>
      <h2 className="text-center mb-4">It is {new Date().toLocaleTimeString()}.</h2>

      {/* Call to action buttons */}
      <div className="text-center mb-4">
        <p>Discover new recipes, organize your favorites, and share your cooking experiences!</p>
        <Link to="/read">
          <Button variant="primary" className="me-3">View All Recipes</Button>
        </Link>
        <Link to="/create">
          <Button variant="success">Add a New Recipe</Button>
        </Link>
      </div>

      {/* Featured Recipe */}
      <h3 className="mt-5 text-center">Featured Recipe</h3>
      <div className="d-flex justify-content-center">
        {loading ? (
          // Show loading spinner while fetching data
          <Spinner animation="border" variant="primary" />
        ) : (
          featuredRecipe && (
            <Card style={{ width: '18rem' }} className="mb-4">
              <Card.Img variant="top" src={featuredRecipe.image} alt={featuredRecipe.title} />
              <Card.Body>
                <Card.Title>{featuredRecipe.title}</Card.Title>
                <Link to={`/recipe/${featuredRecipe._id}`}>
                  <Button variant="info">View Recipe</Button>
                </Link>
              </Card.Body>
            </Card>
          )
        )}
      </div>
    </Container>
  );
};

export default Content;
