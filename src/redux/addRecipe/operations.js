import { createAsyncThunk } from "@reduxjs/toolkit";
import { createRecipe } from "../../services/recipesAPI";

const formDataToObject = (formData) => {
  const obj = {};
  for (const [key, value] of formData.entries()) {
    if (key === "ingredients") {
      const parsed = JSON.parse(value);
      obj[key] = parsed.map(({ name, amount, ...rest }) => ({
        ...rest,
        measure: amount, // перейменували amount → measure
      }));
    } else if (key === "thumb") {
      if (value instanceof File && value.size > 0) {
        obj["thumb"] = value;
      }
    } else if (key === "selectedIngredient") {
      // ❌ пропускаємо, нічого не додаємо
      continue;
    } else {
      obj[key] = value;
    }
  }
  return obj;
};

export const addRecipe = createAsyncThunk(
  "addRecipe/add",
  async (formData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const accessToken = state.auth.accessToken;

      const debugData = formDataToObject(formData);

      const res = await createRecipe(debugData, accessToken);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
