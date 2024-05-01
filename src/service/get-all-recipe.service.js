import Axios from 'axios';

class GetAllRecipe {
    async fetchData(currentPage, search) {
        try {
            return await Axios.get(`http://localhost:3100/api/v1/recipe?size=5&page=${currentPage}&search=${search}`);
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
            throw error;
        }
    }
}

export default new GetAllRecipe();