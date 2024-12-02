import RecipeItem from "./recipeitem.js";

function Recipes(props) { //props is used to pass data from one component to another
    return (
        <> 
            {props.myRecipes.map((recipe) => ( //map function is used to iterate through the movies
                <RecipeItem
                    myRecipe={recipe} //myMovie is used to pass the movie object to the MovieItem component
                    key={recipe._id} //key is used to uniquely identify the movie
                    Reload={props.ReloadData} //Reload is used to reload the data
                />
            ))}
        </>
    );
}

export default Recipes;