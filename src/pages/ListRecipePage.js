import { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from 'react-router-dom';

function ListRecipePage() {
    const [data, setData] = useState({ Items: [] });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(`http://localhost:3100/api/v1/recipe?size=5&page=${currentPage - 1}&search=`);
                setData(response.data);
                setTotalPages(response.data.TotalPages);
            } catch (error) {
                console.error('Error al obtener datos de la API:', error);
            }
        };

        fetchData();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    return (
        <div>
            <div class="list-group">
                {data.Items.map(item => (
                    <div key={item.IdRecipe} class="list-group-item" >
                        <Link className="list-group-item-action" key={item.IdRecipe} to={`/detail/${item.IdRecipe}`}>
                            {item.Name} - {item.Category}
                        </Link>
                    </div>
                ))}
            </div>

            <hr />
            <Link to="/new">
                <button type="submit" class="btn btn-primary mb-3">Agregar nueva receta</button>
            </Link>

            {/* Paginación */}
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <a className="page-link" href="#" onClick={() => handlePageChange(index + 1)}>{index + 1}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>




    );
}


export default ListRecipePage;