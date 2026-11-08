import React from "react";
import { useDispatch } from "react-redux";
import { limpiarPeliculasSlice } from "../redux/features/peliculasSlice.js";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(limpiarPeliculasSlice());
    
    navigate("/login");
  };

  return (
    <header className="menu">
      <div className="menu-contenido">
        <div className="menu-marca">
          <div className="menu-icono">M</div>
          <h2>Mis películas</h2>
        </div>

        <button
          type="button"
          className="menu-cerrar-sesion"
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Menu;