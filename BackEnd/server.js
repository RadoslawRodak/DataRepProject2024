const express = require('express');
const app = express();
//port connecting to
const port = 4000;

//cors used as browser may block requests from different origins
const cors = require('cors');
app.use(cors());

//middleware that allows for cross origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@recipes.rnhgk.mongodb.net/');

const recipeSchema = new mongoose.Schema({
  title: String,
  steps: [String], // Steps as an array
  image: String,
  allergens: [String]
});

// Model is a representation of the schema
const recipeModel = mongoose.model('Recipes', recipeSchema);

// Find all recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await recipeModel.find({});
    res.status(200).json({ recipes });
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipes" });
  }
});

// Find recipe by ID
app.get('/api/recipe/:id', async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.params.id);
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching the recipe" });
  }
});

// Update recipe by ID
app.put('/api/recipe/:id', async (req, res) => {
  try {
    const recipe = await recipeModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (recipe) {
      res.status(200).send(recipe);
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating the recipe" });
  }
});

// Delete recipe by ID
app.delete('/api/recipe/:id', async (req, res) => {
  try {
    console.log('Deleting recipe with ID:', req.params.id);
    const recipe = await recipeModel.findByIdAndDelete(req.params.id);
    if (recipe) {
      res.status(200).send({ message: "Recipe deleted successfully", recipe });
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting the recipe" });
  }
});

// Add a new recipe
app.post('/api/recipes', async (req, res) => {
  try {
    console.log(req.body.title);
    const { title, steps, image, allergens } = req.body;

    if (!Array.isArray(steps)) {
      return res.status(400).json({ error: "Steps must be an array of strings" });
    }

    const newRecipe = new recipeModel({ title, steps, image, allergens });
    await newRecipe.save();

    res.status(201).json({ message: "Recipe Added!", Recipe: newRecipe });
  } catch (error) {
    res.status(500).json({ error: "Error adding the recipe" });
  }
});

// randomly select recipe to appear on main page
app.get('/api/featured-recipe', async (req, res) => {
    try {
      // This will randomly select a recipe from the database
      const count = await recipeModel.countDocuments(); // Count the number of recipes in the database
      const randomIndex = Math.floor(Math.random() * count); // Pick a random index
  
      const featuredRecipe = await recipeModel.findOne().skip(randomIndex); // Get a random recipe based on the index
  
      if (featuredRecipe) {
        res.status(200).json(featuredRecipe);
      } else {
        res.status(404).json({ error: "No recipes found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching featured recipe" });
    }
  });

// Always has to be at the bottom
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
