import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { obtenerPeliculasApi } from "../services/peliculasServices.js";
import { cargarPeliculasSlice } from "../redux/features/peliculasSlice.js";

import Plan from "./Plan.jsx";
import Agregar from "./Agregar.jsx";
import Peliculas from "./Peliculas.jsx";
import InformeUso from "./InformeUso.jsx";
import GraficoCategorias from "./GraficoCategorias.jsx";

const Contenido = ({
  usuario,
  onUpgrade,
  cargandoUpgrade,
  errorUpgrade,
}) => {
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
        if (error.code === "ERR_CANCELED") return;

        console.error(error);
      }
    };

    obtenerPeliculas();

    return () => controller.abort();
  }, [dispatch]);

  return (
    <main className="contenido">
      <section className="fila-superior">
        <Plan
          usuario={usuario}
          onUpgrade={onUpgrade}
          cargandoUpgrade={cargandoUpgrade}
          error={errorUpgrade}
        />

        <Agregar />
      </section>

      <section className="fila-estadisticas">
        <InformeUso />
        <GraficoCategorias />
      </section>

      <section className="seccion-listado">
        <div className="encabezado-listado">
          <span className="etiqueta-seccion">TU COLECCIÓN</span>
        </div>

        <Peliculas />
      </section>
    </main>
  );
};

export default Contenido;