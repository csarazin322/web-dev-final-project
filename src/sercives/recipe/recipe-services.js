import axios from "axios";
const RECIPES_REST_API_URL = process.env.REST_API_URL ?
    process.env.REST_API_URL + '/recipes'
    : 'http://localhost:4000/api/recipes';

const api = axios.create({
    //withCredentials: true,
});

export const findAllRecipes = async () => {
    const response = await api.get(RECIPES_REST_API_URL)
    return response.data
};

export const findRecipeById = async (_id) => {
    const response = await api.get(`${RECIPES_REST_API_URL}/${_id}`);
    return response.data;
};

export const createRecipe = async (recipe) => {
    const response = await api.post(RECIPES_REST_API_URL, recipe)
    return response.data
};

export const updateRecipe = async (recipe) => {
    const response = await api.put(`${RECIPES_REST_API_URL}/${recipe._id}`, recipe)
    return response.data
};

export const deleteRecipe = async (recipe) => {
    const response = await api.delete(`${RECIPES_REST_API_URL}/${recipe._id}`)
    return response.data
};

export const findRecipeByTitle = async (title) => {
    const response = await api.get(`${RECIPES_REST_API_URL}/title/${title}`);
    return response.data;
};