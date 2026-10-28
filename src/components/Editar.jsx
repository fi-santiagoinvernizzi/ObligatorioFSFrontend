
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { modificarPeliculaApi } from "../services/peliculasServices.js";
import { modificarPeliculaSlice } from "../redux/features/peliculasSlice.js";

const Editar = (propiedades) => {
  const dispatch = useDispatch();
  const { pelicula } = propiedades;

  const [editando, setEditando] = useState(false);
  const [valores, setValores] = useState({
    title: pelicula.title || "",
    description: pelicula.description || "",
    releaseYear: pelicula.releaseYear || "",
  });
  const [error, setError] = useState("");

  const handleChange = (evento) => {
    const auxValores = { ...valores };
    const name = evento.target.name;
    const value = evento.target.value;

    auxValores[name] = value;
    setValores(auxValores);
  };

  const editarHandler = async (evento) => {
        evento.preventDefault();
        setError("");

        const peliculaModificada = {
        title: valores.title.trim(),
        description: valores.description.trim(),
        releaseYear: Number(valores.releaseYear),
        };

        if ( !peliculaModificada.title || !peliculaModificada.description || !peliculaModificada.releaseYear) {
        setError("Todos los campos son obligatorios.");
        return;
        }

        try {
        const respuesta = await modificarPeliculaApi(
            pelicula._id,
            peliculaModificada
        );

        dispatch( modificarPeliculaSlice(respuesta.data || respuesta) );
        setEditando(false);

        } catch (error) {
        console.error("Error al modificar película:", error);
        setError(error.response?.data?.message ||  "No se pudo modificar la película." );
        }
    };

  if (!editando) {
    return (
      <button type="button" onClick={() => setEditando(true)}>
        Editar
      </button>
    );
  }

  return (
    <form onSubmit={editarHandler}>
      <div>
        <label htmlFor={`title-${pelicula._id}`}>Título:</label>
        <input
          type="text"
          id={`title-${pelicula._id}`}
          name="title"
          value={valores.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor={`description-${pelicula._id}`}>
          Descripción:
        </label>
        <textarea
          id={`description-${pelicula._id}`}
          name="description"
          value={valores.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor={`releaseYear-${pelicula._id}`}>
          Año de estreno:
        </label>
        <input
          type="number"
          id={`releaseYear-${pelicula._id}`}
          name="releaseYear"
          value={valores.releaseYear}
          onChange={handleChange}
          required
        />
      </div>

      {error && <p>{error}</p>}

      <button type="submit">Guardar cambios</button>

      <button
        type="button"
        onClick={() => {
          setValores({
            title: pelicula.title || "",
            description: pelicula.description || "",
            releaseYear: pelicula.releaseYear || "",
          });
          setError("");
          setEditando(false);
        }}
      >
        Cancelar
      </button>
    </form>
  );
};

export default Editar;
