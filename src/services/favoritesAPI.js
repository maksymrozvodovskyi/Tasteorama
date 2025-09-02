import axios from "axios";

const api = axios.create({
  baseURL: "https://tasteoramaapi.onrender.com/api",
});

export function setAuthToken(token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export async function addToFavorites(id) {
  const res = await api.post(`/recipes/favorites/${id}`);
  return res.data;
}

export async function removeFromFavorites(id) {
  const res = await api.delete(`/recipes/favorites/${id}`);
  return res.data;
}

export async function getFavorites(page, perPage) {
  const res = await api.get(
    `/recipes/favorites?page=${page}&perPage=${perPage}`
  );
  return res;
}
