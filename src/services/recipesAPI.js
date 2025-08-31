import axios from "axios";

export const createRecipe = async (formData, token) => {
  const response = await axios.post("/api/recipes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
