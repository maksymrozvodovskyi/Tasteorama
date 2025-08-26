import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL =  "https://tasteoramaapi.onrender.com";
export const fetchRecipes = createAsyncThunk("/recipes/fetchAll", async (_, thunkAPI) => {

  try {
    const response = await axios.get('/api/recipes');
    console.log('recipes from backend:', response.data);
    return response.data.data.recipes;
  }catch(error){
    return thunkAPI.rejectWithValue(error.message)
  }
});
