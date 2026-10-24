import React from "react";
import Tarea from "./Tarea.jsx";
import { useSelector } from "react-redux";

const Tareas = () => {
  const listaTareas = useSelector((state) => state.tareasSlice); //este state representa la pizza completa

  return (
    <div className="tarjetas">
      {listaTareas?.map((tarea) => (
        <Tarea key={tarea.id} tarea={tarea} />
      ))}
    </div>
  );
};

export default Tareas;
