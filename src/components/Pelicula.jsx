import React from "react";
import Borrar from "./Borrar.jsx";

const Pelicula = (propiedades) => {

  const { pelicula } = propiedades;

  const { _id, title, description, releaseYear, category, poster } = pelicula;

  return (
    <div className="tarjeta">
      {poster && (<img src={poster} alt={`Póster de ${title}`}/>)}

      <h3>{title}</h3>
      <p>{description}</p>
      <p>Año: {releaseYear}</p>
      <p> Categoría: {category?.name || "Sin categoría"} </p>

      <Borrar pelicula={pelicula} />
    </div>
  );
};

export default Pelicula;