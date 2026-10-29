import React, { useState } from "react";
import Pelicula from "./Pelicula.jsx";
import { useSelector } from "react-redux";

const Peliculas = () => {
  const listaPeliculas = useSelector(
    (state) => state.peliculasSlice.peliculas
  );

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas");

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

  const peliculasFiltradas =
    categoriaSeleccionada === "todas"
      ? listaPeliculas
      : listaPeliculas.filter(
          (pelicula) =>
            pelicula.category?._id === categoriaSeleccionada
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
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
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
        {peliculasFiltradas?.length > 0 ? (
          peliculasFiltradas.map((pelicula) => (
            <Pelicula
              key={pelicula._id}
              pelicula={pelicula}
            />
          ))
        ) : (
          <p>No hay películas para esta categoría.</p>
        )}
      </div>
    </div>
  );
};

export default Peliculas;