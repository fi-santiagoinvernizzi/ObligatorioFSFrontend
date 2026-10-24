import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";


import { obtenerPeliculasApi } from "../services/peliculasServices.js";
import { cargarPeliculasSlice } from "../redux/features/peliculasSlice.js";

import Agregar from "./Agregar.jsx";
import Peliculas from "./Peliculas.jsx";

const Contenido = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();

    const obtenerPeliculas = async () => {
      try {
        const listaPeliculas = await obtenerPeliculasApi({}, controller.signal);
        dispatch(cargarPeliculasSlice(listaPeliculas));

      } catch (error) {
        if (error.code === "ERR_CANCELED") {
          console.log("Petición cancelada");
          return;
        }
        console.error(error);
      }
    };

    //llamamos al servicio de peliculas
    obtenerPeliculas();

    //limpiar la llamada a la api cuando se destruya el componente
    return () => {controller.abort();};
  }, []);

  return (
    <div className="contenido">
      <Agregar />
      <Peliculas />
    </div>
  );
};

export default Contenido;
