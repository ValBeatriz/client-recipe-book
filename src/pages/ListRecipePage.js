import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import GetAllRecipe from '../service/get-all-recipe.service';

function ListRecipePage() {
    const [data, setData] = useState({ Items: [] });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading ] = useState(false);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = async (page) => {
        setCurrentPage(page);
        setLoading(true);
        GetAllRecipe.fetchData(page, search)
            .then(response => {
                setData(response.data);
                setTotalPages(response.data.TotalPages);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.error('Error al obtener datos de la API:', error);
            });
    };

    const handlePageChange = (page) => {
        if(page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleClick = (id) => {
        navigate(`/detail/${id}`);  
    };

    const handleCreateRecipeClick = (id) => {
        navigate(`/new`);  
    };


    return (
        <div class="container">

            <h2>Listado de Recetas</h2>

            <hr/>

            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Ingrese busqueda" aria-label="Ingrese busqueda" aria-describedby="button-addon2" onChange={(event) => { setSearch(event.target.value); }}/>
                <button class="btn btn-outline-primary" onClick={() => fetchData(1)}>Buscar</button>
                <button class="btn btn-success" onClick={() => handleCreateRecipeClick()}>Nueva Receta</button>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Categria</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.Items.map(item => (
                            <tr>
                                <td>{item.Name}</td>
                                <td>{item.Category}</td>
                                <td>
                                    <button onClick={() => handleClick(item.IdRecipe)} class="btn btn-primary mb-3">Ver Detalle</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li class="page-item"><a class="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>Previous</a></li>
                    {
                        Array.from({ length: totalPages }, (_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <a className="page-link" href="#" onClick={() => handlePageChange(index + 1)}>{index + 1}</a>
                            </li>
                        ))
                    }
                    <li class="page-item"><a class="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>Next</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default ListRecipePage;