import React from "react";
import Pelicula from "./Pelicula.jsx";
import { useSelector } from "react-redux";

const Peliculas = () => {
  const listaPeliculas = useSelector(
    (state) => state.peliculasSlice.peliculas
  );

  return (
    <div className="tarjetas">
      {listaPeliculas?.map((pelicula) => ( <Pelicula key={pelicula._id} pelicula={pelicula} />))}
    </div>
  );
};

export default Peliculas;