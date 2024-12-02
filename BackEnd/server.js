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
  title:String,
  steps:String,
  image:String
});

//model is a representation of the schema
const recipeModel = new mongoose.model('sdfsdfsdf45',recipeSchema);

//find all recipes
app.get('/api/recipes', async (req, res) => {
    const recipes = await recipeModel.find({});
    res.status(200).json({recipes})
});

//find recipe by id
app.get('/api/recipe/:id', async (req ,res)=>{
  const recipe = await recipeModel.findById(req.params.id);
  res.json(recipe);
})

//update recipe by id
app.put('/api/recipe/:id', async (req, res)=>{
  const recipe = await recipeModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.send(recipe);
})

//delete recipe by id
app.delete('/api/recipe/:id', async (req, res) => {
  
  console.log('Deleting recipe with ID:', req.params.id);
  const recipe = await recipeModel.findByIdAndDelete(req.params.id);
  res.status(200).send({ message: "Recipe deleted successfully", recipe });
  
});

//add movie
app.post('/api/recipes',async (req, res)=>{
    console.log(req.body.title);
    const {title, steps, image} = req.body;

    const newRecipe = new recipeModel({title, steps, image});
    await newRecipe.save();

    res.status(201).json({"message":"Recipe Added!",Recipe:newRecipe});
})

//always has to be at the bottom, code works down from the top and must end with this
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// {
//   "Title": "Avengers: Infinity War (server)",
//   "Year": "2018",
//   "imdbID": "tt4154756",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
// },
// {
//   "Title": "Captain America: Civil War (server)",
//   "Year": "2016",
//   "imdbID": "tt3498820",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
// },
// {
//   "Title": "World War Z (server)",
//   "Year": "2013",
//   "imdbID": "tt0816711",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
// }