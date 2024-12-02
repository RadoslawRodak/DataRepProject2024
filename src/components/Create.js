import axios from "axios";
import { useState } from "react";

const Create = () => {
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
    setSteps([...steps, '']);
  };

  // Deletes a step at a specific index
  const deleteStep = (index) => {
    const updatedSteps = steps.filter((_, stepIndex) => stepIndex !== index);
    setSteps(updatedSteps);
  };

  const handleAllergenChange = (e) => {
    const value = e.target.value;
    setAllergens((prevAllergens) => 
      prevAllergens.includes(value) 
        ? prevAllergens.filter(item => item !== value) // Remove if already selected
        : [...prevAllergens, value] // Add if not selected
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipe = { title, steps, image, allergens};
    console.log(recipe);

    axios.post('http://localhost:4000/api/recipes', recipe)
      .then((res) => { console.log(res.data); })
      .catch((error) => {
        console.error("Error adding the recipe:", error);
      });
  }

  return (
    <div>
      <h3>Add Recipe</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Add Recipe Name: </label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => { setTitle(e.target.value); }}
          />
        </div>
        
        <div className="form-group">
          <label>Add Instructions:</label>
          {steps.map((step, index) => (
            <div key={index} className="step-group">
              <label>Step {index + 1}: </label>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <input
                  type="text"
                  className="form-control"
                  value={step}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                />
                <button type="button" onClick={() => deleteStep(index)} className="btn btn-danger">
                  Delete Step
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={addStep} className="btn btn-secondary mt-2">
            Add Next Step
          </button>
        </div>

        <div className="form-group">
          <label>Add Image: </label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => { setImage(e.target.value); }}
          />
        </div>

        <div className="form-group">
          <label>Select Allergens: </label>
          <div>
            {allergensList.map((allergen) => (
              <div key={allergen}>
                <input
                  type="checkbox"
                  value={allergen}
                  onChange={handleAllergenChange}
                />
                <label>{allergen}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <input type="submit" value="Add Recipe" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default Create;
