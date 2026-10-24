import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Agregar from "./Agregar.jsx";
import Tareas from "./Tareas.jsx";
import { obtenerTareasApi } from "../services/tareasServices.js";
import { cargarTareasInicialesSlice } from "../redux/features/tareasSlice.js";

const Contenido = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();

    const obtenerTareas = async () => {
      try {
        const listaTareas = await obtenerTareasApi(controller.signal);
        dispatch(cargarTareasInicialesSlice(listaTareas));
      } catch (error) {
        if (error.code === "ERR_CANCELED") {
          console.log("Petición cancelada");
          return;
        }
        console.error(error);
        // setError("No se pudieron cargar los usuarios");
      }
    };

    //llamamos al servicio de tareas
    obtenerTareas();
    //limpiar la llamada a la api cuando se destruya el componente
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="contenido">
      <Agregar />
      <Tareas />
    </div>
  );
};

export default Contenido;
