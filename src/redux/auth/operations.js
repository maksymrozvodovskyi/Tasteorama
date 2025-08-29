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
      return thunkAPI.rejectWithValue(error);
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
      
      if (!accessToken)
        throw new Error("No access token in response");
      setAuthHeader(accessToken);
      return data;
    } catch (error) {     
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;
    console.log("Token before logout:", token);

    if (!token) {
      return thunkAPI.rejectWithValue("No access token, cannot logout");
    }

    try {
      setAuthHeader(token);
      await axios.post("api/auth/logout");
      setAuthHeader("");
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/user",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("api/users");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);