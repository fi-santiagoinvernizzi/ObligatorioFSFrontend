import React from "react";
import { useDispatch } from "react-redux";

const Pelicula = (propiedades) => {
  const dispatch = useDispatch();

  const { pelicula } = propiedades;

  const { _id, title, description, releaseYear, category, poster } = pelicula;

  return (
    <div className="tarjeta">
      {poster && (<img src={poster} alt={`Póster de ${title}`}/>)}

      <h3>{title}</h3>
      <p>{description}</p>
      <p>Año: {releaseYear}</p>
      <p> Categoría: {category?.name || "Sin categoría"} </p>
    </div>
  );
};

export default Pelicula;