import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const formDataToObject = (formData) => {
  const obj = {};
  for (const [key, value] of formData.entries()) {
    if (key === "ingredients") {
      const parsed = JSON.parse(value);
      obj[key] = parsed.map(({ name, amount, ...rest }) => ({
        ...rest,
        measure: amount,
      }));
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
      console.log("FormData as object:", debugData);

      const res = await axios.post("/api/recipes", debugData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
