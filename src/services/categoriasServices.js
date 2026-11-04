
import api from "./authServices.js";

export const obtenerCategoriasApi = async () => {
  const resultado = await api.get("/categories");
  return resultado.data;
};

export const obtenerCategoriaApi = async (idCategoria) => {
  const resultado = await api.get(`/categories/${idCategoria}`);

  return resultado.data;
};


//de admin
export const crearCategoriaApi = async (categoria) => {
  const resultado = await api.post("/categories", categoria);
  return resultado.data;
};

export const modificarCategoriaApi = async (idCategoria, categoria) => {
  const resultado = await api.patch(
    `/categories/${idCategoria}`,
    categoria
  );
  return resultado.data;
};

export const eliminarCategoriaApi = async (idCategoria) => {
  await api.delete(`/categories/${idCategoria}`);
};