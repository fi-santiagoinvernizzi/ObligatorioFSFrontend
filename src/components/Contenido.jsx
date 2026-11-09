import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { obtenerPeliculasApi } from "../services/peliculasServices.js";
import { cargarPeliculasSlice, limpiarPeliculasSlice } from "../redux/features/peliculasSlice.js";
import AdministrarCategorias from "./AdministrarCategorias.jsx";
import { useNavigate } from "react-router-dom";
import Plan from "./Plan.jsx";
import Agregar from "./Agregar.jsx";
import Peliculas from "./Peliculas.jsx";
import InformeUso from "./InformeUso.jsx";
import GraficoCategorias from "./GraficoCategorias.jsx";


const Contenido = ({ usuario, onUpgrade, cargandoUpgrade, errorUpgrade,}) => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const [errorPeliculas, setErrorPeliculas] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const obtenerPeliculas = async () => {
      try {
        const listaPeliculas = await obtenerPeliculasApi( {}, controller.signal );

        dispatch(cargarPeliculasSlice(listaPeliculas));
      
      } catch (error) {
          if (error.code === "ERR_CANCELED") return;

          if (error.response?.status === 401) {
              dispatch(limpiarPeliculasSlice());
              navigate("/login");
              return;
          }

          console.error(error);
          setErrorPeliculas("No se pudieron cargar las películas.");
      }

    };

    obtenerPeliculas();

    return () => controller.abort();
  }, [dispatch, navigate]);

  return (
    <main className="contenido">
      {usuario?.role === "admin" ? (
        <AdministrarCategorias />
      ) : (
        <>
          <section className="fila-superior">
            <Plan
              usuario={usuario}
              onUpgrade={onUpgrade}
              cargandoUpgrade={cargandoUpgrade}
              error={errorUpgrade}
            />
                      
            <Agregar usuario={usuario} />

          </section>

          
          {errorPeliculas ? ( <p role="alert">{errorPeliculas}</p>
          ) : (
            <>
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
            </>
          )}

        </>
      )}
    </main>
  );
};

export default Contenido;