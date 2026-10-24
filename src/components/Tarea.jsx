import React from "react";
import { useDispatch } from "react-redux";
import {
  borrarTareaSlice,
  changeCheckedSlice,
} from "../redux/features/tareasSlice.js";

const Tarea = (propiedades) => {
  const dispatch = useDispatch();

  const { tarea } = propiedades;

  const { userId, id, title, completed } = tarea;

  const onChangeHandler = (evento) => {
    const checked = evento.target.checked;

    console.log(`Tarea ${id} - ${title} - ${checked}`);

    const payload = {
      id: id,
      checked: checked,
    };
    dispatch(changeCheckedSlice(payload));
  };

  const borrarHandler = () => {
    console.log(`Borrar tarea ${id} - ${title}`);
    dispatch(borrarTareaSlice(id));
  };

  return (
    <div className="tarjeta">
      <input
        type="checkbox"
        id={`list_${id}`}
        className="checkbox"
        checked={completed}
        onChange={onChangeHandler}
      />
      <label className="checkLabel" htmlFor={`list_${id}`}>
        {title}
      </label>

      <button onClick={borrarHandler}>Eliminar</button>
    </div>
  );
};

export default Tarea;
