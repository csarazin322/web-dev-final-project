import * as recipeServices from './recipe-services'
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createRecipeThunk = createAsyncThunk (
    "recipes/createRecipe",
    async (recipe, thunkAPI) => await recipeServices.createRecipe(recipe)
);

export const updateRecipeThunk = createAsyncThunk (
    "recipes/updateRecipe",
    async (recipe, thunkAPI) => await recipeServices.updateRecipe(recipe)
);

export const deleteRecipeThunk = createAsyncThunk (
    "recipes/deleteRecipe",
    async (_id, thunkAPI) => await recipeServices.deleteRecipe(_id)
);

export const findRecipeByTitleThunk = createAsyncThunk (
    "recipes/findRecipeByTitle",
    async (title, thunkAPI) => await recipeServices.deleteRecipe(title)
);