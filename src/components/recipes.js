import RecipeItem from "./recipeitem.js";

function Recipes(props) { //props is used to pass data from one component to another
    return (
        <> 
            {props.myRecipes.map((recipe) => ( //map function is used to iterate through the recipes
                <RecipeItem
                    myRecipe={recipe} //myRecipe is used to pass the recipe object to the recipeItem component
                    key={recipe._id} //key is used to uniquely identify the recipe
                    Reload={props.ReloadData} //Reload is used to reload the data
                />
            ))}
        </>
    );
}

export default Recipes;