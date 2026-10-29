import React from "react";
import { useSelector } from "react-redux";

const InformeUso = () => {
  const listaPeliculas = useSelector(
    (state) => state.peliculasSlice.peliculas
  );

  let usuario = null;

  try {
    usuario = JSON.parse(localStorage.getItem("user"));
  } catch {
    usuario = null;
  }

  const cantidadPeliculas = listaPeliculas?.length || 0;

  if (!usuario) {
    return (
      <div>
        <p>No se pudo obtener la información del usuario. Iniciá sesión nuevamente.</p>
      </div>
    );
  }

  return (
    <div className="informe-uso">
      <h3>Informe de uso</h3>

      {usuario.plan === "plus" ? (
        <>
          <p>
            Películas utilizadas: {cantidadPeliculas} de 4
          </p>

          <p>
            Porcentaje de uso:{" "}
            <strong>
              {Math.round((cantidadPeliculas / 4) * 100)}%
            </strong>
          </p>
        </>
      ) : usuario.plan === "premium" ? (
        <p>
          Cantidad de películas registradas:{" "}
          <strong>{cantidadPeliculas}</strong>
        </p>
      ) : (
        <p>No se pudo determinar el plan del usuario.</p>
      )}
    </div>
  );
};

export default InformeUso;