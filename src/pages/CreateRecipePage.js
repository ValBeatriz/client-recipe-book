import '../styles/global.css';
import {useState, useEffect} from "react";
import Axios from 'axios';


function CreateRecipePage() {

  const [title,setTitle] = useState("");
  const [ingredients,setIngredients] = useState("");
  const [preparation,setPreparation] = useState("");
  const [options,setOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSelectChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:3100/api/v1/category")
    .then(response => response.json())
    .then(data => setOptions(data))
    .catch(error => console.error('Error al obtener opciones', error));
  }, []);

  const saveRecipe = () => {
    Axios.post("http://localhost:3100/api/v1/recipe", {
      Name: title,
      Ingredients: ingredients,
      Preparation: preparation,
      IdCategory: selectedCategory
      //IdCategory: "9dcc7647-4fb6-493b-b25e-b243f1713833"
    }).then(() => {
      alert("Receta guardada exitosamente");
    }).catch(error => {
        console.error('Error al guardar la receta:',error);
        alert("Ocurrió un error al guardar la receta");
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
        <select value={selectedCategory} onChange={handleSelectChange}>
          <option value="">Selecciona una categoria</option>
          {options.map(option => (
            <option key={option.value} value={option.IdCategory}>{option.Category} </option>
          ))}
          {/* <option value="">Almuerzo</option>
          <option value="">Postre</option>
          <option value="">Reposteria</option> */}
        </select>
        <button onClick={saveRecipe}>Crear</button>
      </div>
    </div>
  );
}

export default CreateRecipePage;
