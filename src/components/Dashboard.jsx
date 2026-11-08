import { useEffect, useState } from "react";
import App from "../App.jsx";
import { useNavigate } from "react-router-dom";
import { cambiarPlanApi } from "../services/usersServices.js";

import { useDispatch } from "react-redux";
import { limpiarPeliculasSlice } from "../redux/features/peliculasSlice.js";
import { programarVencimiento, cancelarVencimiento } from "../utils/sesion.js";


const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [estaLogueado, setEstaLogueado] = useState(false);

  const [usuario, setUsuario] = useState(() => {
    try {
      const usuarioGuardado = localStorage.getItem("user");
      return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
    } catch {
      return null;
    }
  });

  const [cargandoUpgrade, setCargandoUpgrade] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
          navigate("/login");
          return;
      }

      programarVencimiento(token, () => {
          localStorage.removeItem("user");
          dispatch(limpiarPeliculasSlice());
          navigate("/login", { replace: true });
      });

      setEstaLogueado(true);

      return () => {
          cancelarVencimiento();
      };
  }, [navigate, dispatch]);


  const upgradePlan = async () => {
    setError("");
    setCargandoUpgrade(true);

    try {
      const usuarioActualizado = await cambiarPlanApi();

      setUsuario(usuarioActualizado);
      localStorage.setItem("user", JSON.stringify(usuarioActualizado));
    } catch (error) {
      console.error("Error al actualizar el plan:", error);

      setError(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "No se pudo actualizar el plan."
      );
    } finally {
      setCargandoUpgrade(false);
    }
  };

  if (!estaLogueado) {
    return <p>Cargando...</p>;
  }

  return (
    <App
      usuario={usuario}
      onUpgrade={upgradePlan}
      cargandoUpgrade={cargandoUpgrade}
      errorUpgrade={error}
    />
  );
};

export default Dashboard;