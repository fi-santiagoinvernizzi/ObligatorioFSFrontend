import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Rutas from "./components/Rutas.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Rutas />
    </Provider>
  </StrictMode>,
);
