import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function EditRecipePage() {

    const location = useLocation();
    const navigate = useNavigate();

    const { recipeData } = location.state;
    const { id } = useParams();

    const [title, setTitle] = useState(recipeData.Name);
    const [oldTitle] = useState(recipeData.Name);
    const [ingredients, setIngredients] = useState(recipeData.Ingredients);
    const [preparation, setPreparation] = useState(recipeData.Preparation);
    const [options, setOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(recipeData.IdCategory);

    const [showAlert, setShowToast] = useState(false);
    const [tipeMessage, setTipeMessage] = useState('primary');
    const [messageAlert, setMessageAlert] = useState('');

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

        Axios.put(`http://localhost:3100/api/v1/recipe/${id}`, {
            Name: title,
            Ingredients: ingredients,
            Preparation: preparation,
            IdCategory: selectedCategory
        }).then(() => {
            setShowToast(true);
            setTipeMessage('success')
            setMessageAlert('Se han editar correctamente la receta!')
            setTimeout(() => {
                handleReturnClick();
            }, 2000);
        }).catch(error => {
            console.error('Error al editar la receta:', error);
            setMessageAlert('Error al guardar la receta, volver a intentar!')
            setShowToast(true);
            setTipeMessage('danger')
        });
    }

    const handleReturnClick = () => {
        navigate(-1);
    };


    return (
        <div class="container">

            <h2>Detalle Receta: {oldTitle}</h2>
            <hr/>
            {
                showAlert ? (
                <div className={`alert alert-${tipeMessage}`} role="alert">
                    {messageAlert}
                </div>) : (<br/>)
            }
            <form class="row g-3" onSubmit={saveRecipe}>
                <div class="mb-3">
                    <label for="titleFormInput" class="form-label"><strong>Titulo</strong></label>
                    <input onChange={(event) => { setTitle(event.target.value); }} type="text" class="form-control" id="titleFormInput" value={title} />
                </div>
                <div class="mb-3">
                    <label for="titleFormInput" class="form-label"><strong>Categoría</strong></label>
                    <select class="form-select" value={selectedCategory} onChange={handleSelectChange} disabled>
                        <option value="">Selecciona una categoria</option>
                        {options.map(option => (
                            <option key={option.value} value={option.IdCategory}>{option.Category} </option>
                        ))}
                    </select>
                </div>
                <div class="mb-3">
                    <label for="ingredientsFormInput" class="form-label"><strong>Ingredientes</strong></label>
                    <textarea onChange={(event) => { setIngredients(event.target.value); }} class="form-control" id="ingredientsFormInput" rows="3" value={ingredients}></textarea>
                </div>
                <div class="mb-3">
                    <label for="preparationFormInput" class="form-label"><strong>Preparación</strong></label>
                    <textarea onChange={(event) => { setPreparation(event.target.value); }} class="form-control" id="preparationFormInput" rows="3" value={preparation}></textarea>
                </div>
                <p class="d-inline-flex gap-1">
                    <button onClick={handleReturnClick} type="button" class="btn btn-outline-primary mb-3" data-bs-toggle="button">Volver</button>
                    <button type="submit"  class="btn btn-primary mb-3">Guardar Cambios</button>
                </p>
                
            </form>
        </div>
    );
}


export default EditRecipePage;