import RecipeItem from "./recipeitem.js";

function Recipes(props) { //props is used to pass data from one component to another
    return (
        <>
            {props.myRecipes.map((recipe) => ( //map function is used to iterate through the recipes
                <RecipeItem
                    // Pass the recipe data to the RecipeItem component
                    myRecipe={recipe}
                    key={recipe._id}
                    Reload={props.ReloadData}
                />
            ))}
        </>
    );
}

export default Recipes;