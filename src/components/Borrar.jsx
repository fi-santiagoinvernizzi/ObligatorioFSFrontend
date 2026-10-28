import React from "react";
import { useDispatch } from "react-redux";
import { eliminarPeliculaApi } from "../services/peliculasServices.js";
import { eliminarPeliculaSlice } from "../redux/features/peliculasSlice.js";

const Borrar = (propiedades) => {
  const dispatch = useDispatch();

  const { pelicula } = propiedades;

  const eliminarHandler = async () => {
    try {
      await eliminarPeliculaApi(pelicula._id);
      dispatch(eliminarPeliculaSlice(pelicula._id));
    } catch (error) {
      console.error("Error al eliminar película:", error);
    }
  };

  return (
    <button type="button" onClick={eliminarHandler}>
      Eliminar
    </button>
  );
};

export default Borrar;
