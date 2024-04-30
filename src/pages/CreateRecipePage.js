import '../styles/global.css';
import { useState, useEffect } from "react";
import Axios from 'axios';


function CreateRecipePage() {

    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [preparation, setPreparation] = useState("");
    const [options, setOptions] = useState([]);
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

    const saveRecipe = (event) => {

        event.preventDefault();

        Axios.post("http://localhost:3100/api/v1/recipe", {
            Name: title,
            Ingredients: ingredients,
            Preparation: preparation,
            IdCategory: selectedCategory
            //IdCategory: "9dcc7647-4fb6-493b-b25e-b243f1713833"
        }).then(() => {
            console.log("pasa por el primer then");
            alert("Receta guardada exitosamente");
        }).catch(error => {
            console.error('Error al guardar la receta:', error);
            alert("Ocurrió un error al guardar la receta");
        });
    }

    return (
        <div className="App">
            {/*
                <div className="datos">
                <label>Titulo: <input
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                    type="text" /></label>
                <label>Ingredientes: <input
                    onChange={(event) => {
                        setIngredients(event.target.value);
                    }}
                    type="text" /></label>
                <label>Preparación: <input
                    onChange={(event) => {
                        setPreparation(event.target.value);
                    }}
                    type="text" /></label>
                <select value={selectedCategory} onChange={handleSelectChange}>
                    <option value="">Selecciona una categoria</option>
                    {options.map(option => (
                        <option key={option.value} value={option.IdCategory}>{option.Category} </option>
                    ))}
                </select>
                <button onClick={saveRecipe}>Crear</button>
            </div>
            */}
            
            <hr />
            <form class="row g-3" onSubmit={saveRecipe}>
                <div class="mb-3">
                    <label for="titleFormInput" class="form-label">Titulo</label>
                    <input onChange={(event) => { setTitle(event.target.value); }} type="text" class="form-control" id="titleFormInput" placeholder="Ingrese titulo" />
                </div>
                <div class="mb-3">
                    <label for="ingredientsFormInput" class="form-label">Ingredientes</label>
                    <textarea onChange={(event) => { setIngredients(event.target.value); }} class="form-control" id="ingredientsFormInput" rows="3" placeholder="Ejemplo:&#10;-Azúcar&#10;-Huevos"></textarea>
                </div>
                <div class="mb-3">
                    <label for="preparationFormInput" class="form-label">Preparación</label>
                    <textarea onChange={(event) => { setPreparation(event.target.value); }} class="form-control" id="preparationFormInput" rows="3" placeholder="Ejemplo:&#10;-Mezclar azucar con huevos, mantequilla y leche"></textarea>
                </div>
                <div class="mb-3">
                    <select class="form-select" value={selectedCategory} onChange={handleSelectChange}>
                        <option value="">Selecciona una categoria</option>
                        {options.map(option => (
                            <option key={option.value} value={option.IdCategory}>{option.Category} </option>
                        ))}
                    </select>
                </div>
                <div class="mb-3">
                    <button type="submit"  class="btn btn-primary mb-3">Crear</button>
                </div>
            </form>
        </div>
    );
}

export default CreateRecipePage;
