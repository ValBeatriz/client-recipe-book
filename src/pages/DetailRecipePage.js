import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';


function DetailRecipePage() {
    const [data, setData] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const [showAlert, setShowToast] = useState(false);
    const [tipeMessage, setTipeMessage] = useState('primary');
    const [messageAlert, setMessageAlert] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(`http://localhost:3100/api/v1/recipe/${id}`);
                console.log(id);
                setData(response.data); // Almacena los datos en el estado
                console.log(response.data);
            } catch (error) {
                console.error('Error al obtener datos de la API:', error);
            }
        };

        fetchData(); // Llama a la función para obtener los datos cuando el componente se monte
    }, []);

    const handleClick = () => {
        if(data){
            navigate(`/edit/${id}`,{state: {recipeData: data}});
        }  
    };

    const handleDeleteClick = () => {
        Axios.delete(`http://localhost:3100/api/v1/recipe/${id}`)
            .then(() => {
            setShowToast(true);
            setTipeMessage('success')
            setMessageAlert('Se ha eliminado correctamente la receta!')
            setTimeout(() => {
                handleReturnClick();
            }, 2000);
        }).catch(error => {
            console.error('Error al eliminar la receta:', error);
            setMessageAlert('Error al eliminar la receta, volver a intentar!')
            setShowToast(true);
            setTipeMessage('danger')
        });
    };

    const handleReturnClick = () => {
        navigate(-1);
    };

    return (
        <div class="container">
            {data && (
                <div>
                    <h2>Detalle Receta: {data.Name}</h2>
                    <hr/>

                    {
                        showAlert ? (
                        <div className={`alert alert-${tipeMessage}`} role="alert">
                            {messageAlert}
                        </div>) : (<br/>)
                    }

                    <form class="row g-3">
                        
                        <div class="mb-3">
                            <label for="ingredientsFormInput" class="form-label"><strong>Categoría</strong></label>
                            <input type="text" class="form-control" id="titleFormInput" placeholder="Ingrese titulo" value={data.Category} disabled/>
                        </div>
                        <div class="mb-3">
                            <label for="ingredientsFormInput" class="form-label"><strong>Ingredientes</strong></label>
                            <textarea class="form-control" id="ingredientsFormInput" rows="3" value={data.Ingredients} disabled></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="preparationFormInput" class="form-label"><strong>Preparación</strong></label>
                            <textarea class="form-control" id="preparationFormInput" rows="3" value={data.Preparation} disabled></textarea>
                        </div>
                        
                    </form>

                    <p class="d-inline-flex gap-1">
                        <button onClick={handleReturnClick} type="button" class="btn btn-outline-primary mb-3" data-bs-toggle="button">Volver</button>
                        <button onClick={handleClick} type="button" class="btn btn-primary mb-3" data-bs-toggle="button">Editar Receta</button>
                        <button onClick={handleDeleteClick} type="button" class="btn btn-danger mb-3" data-bs-toggle="button">Eliminar Receta</button>
                    </p>
                    
                </div>
            )}
        </div>
    );
}


export default DetailRecipePage;