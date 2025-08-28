import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://tasteoramaapi.onrender.com/";

const setAuthHeader = (value) => {
  axios.defaults.headers.common.Authorization = `Bearer ${value}`;
};

export const registerUserThunk = createAsyncThunk(
  "auth/register",
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post("api/auth/register", newUser);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const response = await axios.post(
        "api/auth/login",
        credentials
      );
      const data = response.data.data;
      const accessToken = data.accessToken;
      console.log("data", data);
      
      if (!accessToken)
        throw new Error("No access token in response");
      setAuthHeader(accessToken);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axios.post("api/auth/logout");
      setAuthHeader("");
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);