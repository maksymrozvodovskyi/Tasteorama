import { createSlice } from "@reduxjs/toolkit";
import {
  registerUserThunk,
  loginUserThunk,
  logoutUserThunk,
  fetchCurrentUser,
} from "../auth/operations";

const initialState = {
  accessToken: null,
  // accessToken: localStorage.getItem("accessToken") || null,
  userName: null,
  isLoading: false,
  error: null,
  hasAvatar: false,
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
        state.userName = payload.user.name;
      })
      .addCase(registerUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.response.data;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken;
        // state.user = { name: payload.name, email: payload.email };
        state.isLoading = false;
        state.error = null;
        // localStorage.setItem("accessToken", payload.accessToken);
      })
      .addCase(loginUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.response.data;
      })
      .addCase(logoutUserThunk.fulfilled, (state, { payload }) => {
        console.log("Logged out token:", payload);
        state.accessToken = null;
        state.userName = null;
        state.hasAvatar = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.response.data;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
        state.userName = payload.data.name;
        state.isLoading = false;
        state.hasAvatar = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload?.response?.data || payload;
      }),
});

export default slice.reducer;
