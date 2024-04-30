import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Link } from 'react-router-dom';


function DetailRecipePage() {
    const [data, setData] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

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

    return (
        <div>
            {data && (
                <div>
                    <h2>{data.Name} </h2>
                    <p><strong>Categoría:</strong> {data.Category}</p>
                    <p><strong>Ingredientes:</strong> {data.Ingredients}</p>
                    <p><strong>Preparación:</strong> {data.Preparation}</p>
                   
                        <button onClick={handleClick} type="button" class="btn btn-primary mb-3">Editar</button>
                    
                </div>
            )}
        </div>
    );
}


export default DetailRecipePage;