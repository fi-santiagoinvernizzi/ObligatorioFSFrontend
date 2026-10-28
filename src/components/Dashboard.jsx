
import { useEffect, useState } from "react";
import App from "../App.jsx";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [estaLogueado, setEstaLogueado] = useState(false);

  const validarLogin = () => {
    const token = window.localStorage.getItem("token");
    const estaLogueado = token ? true : false;

    if (!estaLogueado) {
      navigate("/login");
    } else {
      setEstaLogueado(estaLogueado);
    }
  };

  useEffect(() => {
    validarLogin();
  }, []);

  return (
    <>
      {estaLogueado ? (
        <div>
          <App />
        </div>
      ) : (
        <p>Cargando</p>
      )}
    </>
  );
};

export default Dashboard;
