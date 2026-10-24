import api from "./authServices.js";

export const obtenerPeliculasApi = async (filtros = {}) => {
  const resultado = await api.get("/movies", {
    params: filtros,
  });

  return resultado.data;
};

export const obtenerPeliculaApi = async (idPelicula) => {
  const resultado = await api.get(`/movies/${idPelicula}`);

  return resultado.data;
};

export const crearPeliculaApi = async (pelicula) => {
  const resultado = await api.post("/movies", pelicula);

  return resultado.data;
};

export const modificarPeliculaApi = async (idPelicula, pelicula) => {
  const resultado = await api.patch(
    `/movies/${idPelicula}`,
    pelicula,
  );

  return resultado.data;
};

export const reemplazarPeliculaApi = async (idPelicula, pelicula) => {
  const resultado = await api.put(
    `/movies/${idPelicula}`,
    pelicula,
  );

  return resultado.data;
};

export const eliminarPeliculaApi = async (idPelicula) => {
  await api.delete(`/movies/${idPelicula}`);
};
