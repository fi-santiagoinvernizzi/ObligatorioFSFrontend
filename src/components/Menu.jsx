
import React from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="menu">
      <h2>Mis peliculas</h2>

      <button type="button" onClick={cerrarSesion}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Menu;
