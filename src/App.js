import './App.css';
import {useState} from "react";
import Axios from 'axios';


function App() {

  const [title,setTitle] = useState("");
  const [ingredients,setIngredients] = useState("");
  const [preparation,setPreparation] = useState("");
  const [id_category,setIdCategory] = useState("");

  const saveRecipe = () => {
    Axios.post("http://localhost:3100/api/v1/recipe", {
      Name: title,
      Ingredients: ingredients,
      Preparation: preparation,
      IdCategory: "9dcc7647-4fb6-493b-b25e-b243f1713833"
    }).then(() => {
      alert("Receta guardada exitosamente");
    });
  }

  return (
    <div className="App">
      <div className="datos">
        <label>Titulo: <input 
        onChange={(event)=> {
          setTitle(event.target.value);
        }}
        type="text"/></label>
        <label>Ingredientes: <input
        onChange={(event)=> {
          setIngredients(event.target.value);
        }}
        type="text"/></label>
        <label>Preparación: <input 
          onChange={(event)=> {
            setPreparation(event.target.value);
          }}
        type="text"/></label>
        <select value="{selectedValue}" onChange="{handleSelectChange}">
          <option value="">Selecciona una categoria</option>
          <option value="">Almuerzo</option>
          <option value="">Postre</option>
          <option value="">Reposteria</option>
        </select>
        <button onClick={saveRecipe}>Crear</button>
      </div>
    </div>
  );
}

export default App;
