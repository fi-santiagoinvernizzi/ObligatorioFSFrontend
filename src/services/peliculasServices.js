import api from "./authServices.js";

// export const obtenerPeliculasApi = async (filtros = {}, signal) => {
//   const resultado = await api.get("/movies", {
//     params: filtros,
//     signal: signal,
//   });

//   return resultado.data;
// };

//cambio con paginacion
export const obtenerPeliculasApi = async (filtros = {}, signal) => {
  const respuesta = await api.get("/movies", {
    params: { ...filtros, page: 1, limit: 10 },
    signal: signal,
  });

  const peliculas = [...respuesta.data.data];
  const totalPaginas = respuesta.data.pagination.totalPages;

  for (let pagina = 2; pagina <= totalPaginas; pagina++) {
    const siguienteRespuesta = await api.get("/movies", {
      params: { ...filtros, page: pagina, limit: 10 },
      signal: signal,
    });

    peliculas.push(...siguienteRespuesta.data.data);
  }

  return {
    data: peliculas,
    pagination: respuesta.data.pagination,
  };
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

export const eliminarPosterPersonalizadoApi = async (idPelicula) => {
  const resultado = await api.delete(`/movies/${idPelicula}/poster`);
  return resultado.data;
};

