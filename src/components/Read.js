import axios from "axios";
import { useState, useEffect } from "react";
import Recipes from "./recipes";

function Read() {
    const [data, setData] = useState([]);
    
    const Reload = () => { //Reload function is used to reload the movie data
        console.log("Reloading recipe data..."); //log the message
        axios.get('http://localhost:4000/api/recipes') //axios get request is used to fetch the movie data
            .then((response) => { //then function is used to handle the response
                setData(response.data.recipes); //set the data with the response data
            })
            .catch((error) => {
                console.error("Error reloading data:", error);
            });
    };

    useEffect(() => {
        Reload(); //useEffect hook is used to call the Reload function
    }, []);

    return (
        <div>
            <h2>Recipe List</h2>
            <Recipes myRecipes={data} ReloadData={Reload} /> {/*Recipes component is used to display the recipe data*/}
        </div>
    );
}

export default Read;