import axios from "axios";

export const apiBack = axios.create({
  baseURL: "https://tasteoramaapi.onrender.com",
});
