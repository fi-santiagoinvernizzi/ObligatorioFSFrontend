import "./App.css";
import "./styles/estilos.css";

import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/Login.jsx";


const App = () => {
  const [logueado, setLogueado] = useState( () => Boolean(window.localStorage.getItem("token")));
  const manejarLogin = () => {
    setLogueado(true);
  };

  return (<>{logueado ? (<Dashboard />) : (<Login onLogin={manejarLogin} />)}</>);
};

export default App;
