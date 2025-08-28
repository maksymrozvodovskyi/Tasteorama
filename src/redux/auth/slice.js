import { createSlice } from "@reduxjs/toolkit";
import {
  registerUserThunk,
  loginUserThunk,
  logoutUserThunk,
} from "../auth/operations";

const initialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  user: null,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.user = { name: payload.name, email: payload.email };
      })
      .addCase(registerUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.user = { name: payload.name, email: payload.email };
        state.isLoading = false;
        state.error = null;
        localStorage.setItem("accessToken", payload.accessToken);
      })
      .addCase(loginUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.accessToken = null;
        state.user = null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      }),
});

export default slice.reducer;
