import axios from "axios";
import { useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";

const Create = () => {
  // State variables for the form fields and functions to update them
  const [title, setTitle] = useState('');
  const [steps, setSteps] = useState(['']);
  const [image, setImage] = useState('');
  const [allergens, setAllergens] = useState([]);

  // List of allergens
  const allergensList = [
    "Peanuts", 
    "Dairy", 
    "Gluten", 
    "Shellfish", 
    "Eggs", 
    "Soy", 
    "Tree Nuts", 
    "Wheat", 
    "Fish"
  ];

  // Handles input change for a specific step
  const handleStepChange = (index, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = value;
    setSteps(updatedSteps);
  };

  // Adds a new step field
  const addStep = () => {
    setSteps([...steps, '']); // Add a new empty string to the steps array
  };

  // Deletes a step at a specific index
  const deleteStep = (index) => {
    const updatedSteps = steps.filter((_, stepIndex) => stepIndex !== index); // Filter out the step at the specified index
    setSteps(updatedSteps);
  };

  const handleAllergenChange = (e) => {
    const value = e.target.value;
    setAllergens((prevAllergens) => 
      prevAllergens.includes(value) 
        ? prevAllergens.filter(item => item !== value) // Remove if already selected, ? is used to check if the allergen is already selected
        : [...prevAllergens, value] // Add if not selected
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipe = { title, steps, image, allergens}; // Create a new recipe object
    console.log(recipe);

    axios.post('http://localhost:4000/api/recipes', recipe) // Axios POST request to add the recipe to the database
      .then((res) => { console.log(res.data); })
      .catch((error) => {
        console.error("Error adding the recipe:", error);
      });
  };

  return (
    // Form to add a new recipe and bootstrap styling
    <Container className="my-5">
      <Card className="shadow-lg p-4">
        <h3 className="text-center mb-4">Add a New Recipe</h3>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="recipeTitle">
                <Form.Label>Recipe Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter recipe title"
                  value={title}
                  onChange={(e) => { setTitle(e.target.value); }}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="recipeImage">
                <Form.Label>Image URL:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image URL"
                  value={image}
                  onChange={(e) => { setImage(e.target.value); }}                  
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Instructions:</Form.Label>
            {steps.map((step, index) => (
              <Row key={index} className="mb-3">
                <Col>
                  <Form.Control
                    type="text"
                    value={step}
                    placeholder={`Step ${index + 1}`}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    required
                  />
                </Col>
                <Col xs="auto" className="align-self-center">
                  <Button variant="danger" onClick={() => deleteStep(index)} className="btn-sm">
                    Delete
                  </Button>
                </Col>
              </Row>
            ))}
            <Button variant="secondary" onClick={addStep} className="mt-2">Add Next Step</Button>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select Allergens:</Form.Label>
            <div>
              {allergensList.map((allergen) => (
                <Form.Check
                  key={allergen}
                  type="checkbox"
                  label={allergen}
                  value={allergen}
                  onChange={handleAllergenChange}
                  checked={allergens.includes(allergen)}
                  inline
                />
              ))}
            </div>
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit">Add Recipe</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Create;
