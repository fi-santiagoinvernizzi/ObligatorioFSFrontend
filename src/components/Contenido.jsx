import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { obtenerPeliculasApi } from "../services/peliculasServices.js";
import { cargarPeliculasSlice } from "../redux/features/peliculasSlice.js";

import Agregar from "./Agregar.jsx";
import Peliculas from "./Peliculas.jsx";
import InformeUso from "./InformeUso.jsx";
import GraficoCategorias from "./GraficoCategorias.jsx";

const Contenido = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();

    const obtenerPeliculas = async () => {
      try {
        const listaPeliculas = await obtenerPeliculasApi(
          {},
          controller.signal
        );

        dispatch(cargarPeliculasSlice(listaPeliculas));
      } catch (error) {
        if (error.code === "ERR_CANCELED") {
          console.log("Petición cancelada");
          return;
        }

        console.error(error);
      }
    };

    obtenerPeliculas();

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  return (
    <div className="contenido">
      <Agregar />

      <InformeUso />

      <GraficoCategorias />

      <Peliculas />
    </div>
  );
};

export default Contenido;