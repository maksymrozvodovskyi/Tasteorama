// Приклад:
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchContacts = createAsyncThunk(
//   "contacts/fetchAll",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get("/contacts");
//       return response.data; // payload
//     } catch {
//       return thunkAPI.rejectWithValue(404);
//     }
//   }
// );
