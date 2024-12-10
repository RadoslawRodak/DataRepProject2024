import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
        //form for editing a recipe with bootstrap styling
        <div>
            <h3>Edit Recipe</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Edit Recipe Title: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Steps Input */}
                <div className="form-group">
                    <label>Edit Recipe Steps: </label>
                    {steps.map((step, index) => (
                        <div key={index} className="step-container">
                            <input
                                type="text"
                                className="form-control"
                                value={step}
                                onChange={(e) => handleStepChange(e, index)}
                            />
                            <button type="button" className="btn btn-danger" onClick={() => handleRemoveStep(index)}>
                                Remove Step
                            </button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={handleAddStep}>
                        Add Step
                    </button>
                </div>

                {/* Allergens Checkbox Input */}
                <div className="form-group">
                    <label>Edit Allergens: </label>
                    {availableAllergens.map((allergen) => (
                        <div key={allergen} className="checkbox-container">
                            <label>
                                <input
                                    type="checkbox"
                                    value={allergen}
                                    checked={allergens.includes(allergen)} // Check if the allergen is selected
                                    onChange={handleAllergenChange} // Handle change for the checkbox
                                />
                                {allergen}
                            </label>
                        </div>
                    ))}
                </div>

                {/* Image Input */}
                <div className="form-group">
                    <label>Edit Recipe Image: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>

                <div>
                    <input type="submit" value="Edit Recipe" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
};

export default Edit;
