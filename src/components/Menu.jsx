import React from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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