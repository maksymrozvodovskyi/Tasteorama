import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://tasteoramaapi.onrender.com/api";

const setAuthHeader = (value) => {
  axios.defaults.headers.common.Authorization = `Bearer ${value}`;
};

export const registerUserThunk = createAsyncThunk(
  "auth/register",
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post("/auth/register", newUser);

      console.log("response.data:", response.data); //  Debug log

      if (!response.data?.accessToken) {
        throw new Error("No token in response");
      }
      setAuthHeader(response.data.accessToken);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const response = await axios.post("/auth/login", credentials);
      const data = response.data.data;
      const accessToken = data.accessToken;
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
      await axios.post("/auth/logout");
      setAuthHeader("");
      console.log("Authorization", axios.defaults.headers.common.Authorization);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
