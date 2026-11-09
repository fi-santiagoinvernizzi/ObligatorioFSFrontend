import React, { useState } from "react";
import Pelicula from "./Pelicula.jsx";
import { useSelector } from "react-redux";

const Peliculas = () => {
  const listaPeliculas = useSelector(
    (state) => state.peliculasSlice.peliculas
  );

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas");

  const [paginaActual, setPaginaActual] = useState(1);
  const peliculasPorPagina = 8;


  // Obtener las categorías sin repetirlas.
  const categorias = [
    ...new Map(
      (listaPeliculas || [])
        .filter((pelicula) => pelicula.category)
        .map((pelicula) => [
          pelicula.category._id,
          pelicula.category,
        ])
    ).values(),
  ];
  
  const categoriaActiva = categorias.some( (categoria) => categoria._id === categoriaSeleccionada ) 
                          ? categoriaSeleccionada 
                          : "todas";

  
  const peliculasFiltradas =
    categoriaActiva === "todas"
      ? listaPeliculas
      : listaPeliculas.filter( (pelicula) => pelicula.category?._id === categoriaActiva );

  
  const totalPaginas = Math.ceil( peliculasFiltradas.length / peliculasPorPagina);

  const paginaVisible = Math.min(
    paginaActual,
    Math.max(totalPaginas, 1)
  );

  const indiceInicial = (paginaVisible - 1) * peliculasPorPagina;

  //peliculas de pagina actual
  const peliculasPagina = peliculasFiltradas.slice(
    indiceInicial,
    indiceInicial + peliculasPorPagina
  );
    

  return (
    <div>
      <h3>Listado de películas</h3>

      <div className="mb-3">
        <label htmlFor="filtroCategoria">
          Filtrar por categoría:
        </label>

        
        <select
          id="filtroCategoria"
          value={categoriaActiva}
          onChange={(e) => {
            setCategoriaSeleccionada(e.target.value);
            setPaginaActual(1);
          }}
        >
          <option value="todas">Todas las categorías</option>

          {categorias.map((categoria) => (
            <option key={categoria._id} value={categoria._id}>
              {categoria.name}
            </option>
          ))}
        </select>
      </div>

      <div className="tarjetas">
        {peliculasPagina.length > 0 ? (
          peliculasPagina.map((pelicula) => ( <Pelicula key={pelicula._id} pelicula={pelicula} /> ))
        ) : (
          <p>No hay películas para esta categoría.</p>
        )}
      </div>

      {/* filtros para paginacion */}
      {totalPaginas > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
          <button
            type="button"
            className="btn btn-outline-secondary"
            disabled={paginaVisible === 1}
            onClick={() => setPaginaActual(paginaVisible - 1)}
          >
            Anterior
          </button>

          <span>
            Página {paginaVisible} de {totalPaginas}
          </span>

          <button
            type="button"
            className="btn btn-outline-secondary"
            disabled={paginaVisible === totalPaginas}
            onClick={() => setPaginaActual(paginaVisible + 1)}
          >
            Siguiente
          </button>
        </div>
      )}

    </div>
  );
};

export default Peliculas;