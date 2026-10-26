
import api from "./authServices.js";

export const obtenerCategoriasApi = async () => {
  const resultado = await api.get("/categories");
  console.log("Categorías recibidas:", resultado.data);
  return resultado.data;
};

export const obtenerCategoriaApi = async (idCategoria) => {
  const resultado = await api.get(`/categories/${idCategoria}`);

  return resultado.data;
};
