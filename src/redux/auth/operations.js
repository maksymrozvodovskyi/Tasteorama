import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    console.log("LogoutOp");
    try {
        await axios.post('/api/auth/logout');
        axios.defaults.headers.common["Authorization"] = "";
    } catch (error) {
        console.log(error.message);
        return thunkAPI.rejectWithValue(error.message);
    }
});

