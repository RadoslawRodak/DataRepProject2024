import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

const Edit = () => {
    const { id } = useParams(); // useParams hook to access the URL parameter and extract the id
    const [title, setTitle] = useState('');
    const [steps, setSteps] = useState([]);
    const [image, setImage] = useState('');
    const [allergens, setAllergens] = useState([]);
    const navigate = useNavigate(); // useNavigate hook for navigation

    const availableAllergens = [
        "Gluten", "Dairy", "Peanuts", "Eggs", "Soy", "Fish", "Shellfish", "Tree Nuts"
    ]; // predefined list of allergens

    // Fetch the recipe data from the server when the component is mounted
    useEffect(() => {
        axios.get('http://localhost:4000/api/recipe/' + id)
            .then((res) => {
                // Set the state with the fetched recipe data from the server
                console.log("Success", res.data);
                setTitle(res.data.title);
                setSteps(res.data.steps);
                setImage(res.data.image);
                setAllergens(res.data.allergens || []); // Set allergens to an empty array if no allergens are present
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    // Handle the form submission to update the recipe
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form behavior
        const recipe = { title, steps, image, allergens };

        axios.put('http://localhost:4000/api/recipe/' + id, recipe) // Axios PUT request to update the recipe
            .then((res) => {
                console.log("Edited: ", res.data);
                navigate('/read'); // Navigate back to the list after successful update
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Add a new step
    const handleAddStep = () => {
        setSteps([...steps, ""]); // Add a new empty step to the steps array
    };

    // Handle changes to individual steps
    const handleStepChange = (e, index) => {
        const updatedSteps = [...steps]; // Create a copy of the steps array
        updatedSteps[index] = e.target.value; // Update the specific step
        setSteps(updatedSteps); // Set the updated steps array
    };

    // Remove a step
    const handleRemoveStep = (index) => {
        const updatedSteps = steps.filter((step, i) => i !== index); // Remove the step at the specified index
        setSteps(updatedSteps); // Set the updated steps array
    };

    // Handle allergen checkbox changes
    const handleAllergenChange = (e) => {
        const allergen = e.target.value;
        if (e.target.checked) {
            setAllergens([...allergens, allergen]); // Add allergen to state if checkbox is checked
        } else {
            setAllergens(allergens.filter(item => item !== allergen)); // Remove allergen from state if checkbox is unchecked
        }
    };

    return (
        <Container className="my-5">
            <Card>
                <Card.Header as="h3">Edit Recipe</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        {/* Title */}
                        <Form.Group className="mb-3">
                            <Form.Label>Edit Recipe Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        {/* Steps */}
                        <Form.Group className="mb-3">
                            <Form.Label>Edit Recipe Steps</Form.Label>
                            {steps.map((step, index) => (
                                <Row className="mb-2" key={index}>
                                    <Col xs={10}>
                                        <Form.Control
                                            type="text"
                                            value={step}
                                            onChange={(e) => handleStepChange(e, index)}
                                        />
                                    </Col>
                                    <Col xs={2}>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleRemoveStep(index)}
                                        >
                                            Remove
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                            <Button variant="secondary" onClick={handleAddStep}>
                                Add Step
                            </Button>
                        </Form.Group>

                        {/* Allergens */}
                        <Form.Group className="mb-3">
                            <Form.Label>Edit Allergens</Form.Label>
                            <Row>
                                {availableAllergens.map((allergen) => (
                                    <Col xs={6} md={4} key={allergen}>
                                        <Form.Check
                                            type="checkbox"
                                            label={allergen}
                                            value={allergen}
                                            checked={allergens.includes(allergen)}
                                            onChange={handleAllergenChange}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Form.Group>

                        {/* Image */}
                        <Form.Group className="mb-3">
                            <Form.Label>Edit Recipe Image</Form.Label>
                            <Form.Control
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Edit;
