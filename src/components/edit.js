import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Edit = () => {
    const {id} = useParams(); //useParams hook is used to access the URL parameter and extract the id
    const [title, setTitle] = useState(''); //useState hook is used to create a state variable
    const [steps, setSteps] = useState(['']); //useState hook is used to create a state variable
    const [image, setImage] = useState(''); //useState hook is used to create a state variable
    const navigate = useNavigate(); //useNavigate hook is used to navigate to a different URL

    useEffect(()=>{
        {/*Fetch the recipe data from the server*/}
        axios.get('http://localhost:4000/api/recipe/'+id)
        .then((res)=>{
            console.log("sucess "+res.data);
            setTitle(res.data.title);
            setSteps(res.data.steps);
            setImage(res.data.image);
        })
        //error handling
        .catch((err)=>{console.log(err)});
    },[id]); //useEffect hook is used to fetch the data when id is specified

    const handleSubmit = (e) => { //handleSubmit function is used to update the movie
        e.preventDefault(); //preventDefault is used to prevent the default action of the form
        const recipe = {title,steps,image}; //movie object is created with the updated values
        console.log(recipe); //log the movie object

        axios.put('http://localhost:4000/api/recipe/'+id, recipe) //axios put request is used to update the movie
        .then((res)=>{ 
            console.log("Edited: "+res.data);
            navigate('/read');
        })
        .catch((err)=>{
            console.log(err);
        });
      
    }

    return (
        <div>
            <h3>Hello from edit component!</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Edit Recipe Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Edit Recipe Steps: </label>
                    <input type="text"
                        className="form-control"
                        value={steps}
                        onChange={(e) => { setSteps(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Edit Recipe Image: </label>
                    <input type="text"
                        className="form-control"
                        value={image}
                        onChange={(e) => { setImage(e.target.value) }}
                    />
                </div>
                <div>
                    <input type="submit" value="Edit Recipe"></input>
                </div>
            </form>
        </div>
    );
}
export default Edit;