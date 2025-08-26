import axios from "axios";

const api = axios.create({
    baseURL: "https://tasteoramaapi.onrender.com/api",
});

export function setAuthToken(token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export async function addToFavorites(id) {
    await api.post(`/favorites/${id}`);
    return id;
};

export async function removeFromFavorites(id) {
    await api.delete(`/favorites/${id}`);
    return id;
};