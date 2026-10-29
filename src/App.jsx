import "./styles/estilos.css";
import Menu from "./components/Menu.jsx";
import Contenido from "./components/Contenido.jsx";

const App = ({ usuario, onUpgrade, cargandoUpgrade, errorUpgrade }) => {
  return (
    <>
      <Menu />
      <Contenido
        usuario={usuario}
        onUpgrade={onUpgrade}
        cargandoUpgrade={cargandoUpgrade}
        errorUpgrade={errorUpgrade}
      />
    </>
  );
};

export default App;