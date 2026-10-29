import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import SubirImagen from "./SubirImagen.jsx";

import { modificarPeliculaApi, eliminarPeliculaApi, eliminarPosterPersonalizadoApi, } from "../services/peliculasServices.js";

import { modificarPeliculaSlice, eliminarPeliculaSlice,} from "../redux/features/peliculasSlice.js";

const esquemaValidacion = Yup.object({
  title: Yup.string()
    .trim()
    .required("El título es obligatorio."),
  description: Yup.string()
    .trim()
    .required("La descripción es obligatoria."),
  releaseYear: Yup.number()
    .typeError("El año debe ser un número.")
    .integer("El año debe ser un número entero.")
    .required("El año de estreno es obligatorio."),
});

const Pelicula = ({ pelicula }) => {
  const {
    title,
    description,
    releaseYear,
    category,
    posterPersonalizado,
    posterCloudinaryId,
  } = pelicula;

  const posterAMostrar =
    posterPersonalizado || pelicula.poster || pelicula.posterTMDB;

  const [editando, setEditando] = useState(false);
  const [error, setError] = useState("");
  const [eliminando, setEliminando] = useState(false);
  const [eliminandoPoster, setEliminandoPoster] = useState(false);
  const [posterSubido, setPosterSubido] = useState(null);
  const [resetImagen, setResetImagen] = useState(0);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: title || "",
      description: description || "",
      releaseYear: releaseYear ?? "",
    },
    validationSchema: esquemaValidacion,
    enableReinitialize: true,
    onSubmit: async (valores) => {
      setError("");

      const peliculaModificada = {
        title: valores.title.trim(),
        description: valores.description.trim(),
        releaseYear: Number(valores.releaseYear),
        ...(posterSubido && { posterPersonalizado: posterSubido.url, posterCloudinaryId: posterSubido.public_id, }),
      };

      try {
        const respuesta = await modificarPeliculaApi(
          pelicula._id,
          peliculaModificada
        );

        const peliculaActualizada = {
          ...pelicula,
          ...respuesta,
          _id: respuesta.id || respuesta._id || pelicula._id,
          category: pelicula.category,
          ...(posterSubido && {
            posterPersonalizado: posterSubido.url,
            posterCloudinaryId: posterSubido.public_id,
            poster: posterSubido.url,
          }),
        };

        dispatch(modificarPeliculaSlice(peliculaActualizada));
        setPosterSubido(null);
        setEditando(false);

      } catch (error) {
        console.error("Error al modificar película:", error);

        setError(
          error.response?.data?.message ||
            "No se pudo modificar la película."
        );
      }
    },
  });

  const handlerEditar = () => {
    setError("");
    setPosterSubido(null);
    setResetImagen((valor) => valor + 1);

    formik.resetForm({
      values: {
        title: pelicula.title || "",
        description: pelicula.description || "",
        releaseYear: pelicula.releaseYear ?? "",
      },
    });

    setEditando(true);
  };

  const handlerCancelar = () => {
    formik.resetForm();
    setError("");
    setEditando(false);
  };

  const handlerBorrar = async () => {
    const confirmar = window.confirm(
      `¿Estás seguro de que querés eliminar "${pelicula.title}"?`
    );

    if (!confirmar) return;

    setError("");
    setEliminando(true);

    try {
      await eliminarPeliculaApi(pelicula._id);
      dispatch(eliminarPeliculaSlice(pelicula._id));
    } catch (error) {
      console.error("Error al eliminar película:", error);

      setError(
        error.response?.data?.message ||
          "No se pudo eliminar la película."
      );
    } finally {
      setEliminando(false);
    }
  };

  const handlerBorrarPoster = async () => {
    const confirmar = window.confirm(
      `¿Querés quitar el póster personalizado de "${pelicula.title}"? Se volverá a mostrar el póster de TMDB.`
    );

    if (!confirmar) return;

    setError("");
    setEliminandoPoster(true);

    try {
      const respuesta = await eliminarPosterPersonalizadoApi(
        pelicula._id
      );

      const peliculaActualizada = {
        ...pelicula,
        ...respuesta,
        _id: respuesta.id || respuesta._id || pelicula._id,
        category: pelicula.category,
        posterPersonalizado: null,
        posterCloudinaryId: null,
        poster: respuesta.posterTMDB || respuesta.poster || pelicula.posterTMDB || null,
      };

      dispatch(modificarPeliculaSlice(peliculaActualizada));
    } catch (error) {
      console.error("Error al quitar el póster personalizado:", error);

      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "No se pudo quitar el póster personalizado."
      );
    } finally {
      setEliminandoPoster(false);
    }
  };

  return (
    <div className="tarjeta">
      {posterAMostrar && (
        <img
          src={posterAMostrar}
          alt={`Póster de ${title}`}
        />
      )}

      {editando ? (
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor={`title-${pelicula._id}`}>
              Título:
            </label>
            <input
              type="text"
              id={`title-${pelicula._id}`}
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.title && formik.errors.title && (
              <p role="alert">{formik.errors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor={`description-${pelicula._id}`}>
              Descripción:
            </label>
            <textarea
              id={`description-${pelicula._id}`}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.description &&
              formik.errors.description && (
                <p role="alert">{formik.errors.description}</p>
              )}
          </div>

          <div>
            <label htmlFor={`releaseYear-${pelicula._id}`}>
              Año de estreno:
            </label>
            <input
              type="number"
              id={`releaseYear-${pelicula._id}`}
              name="releaseYear"
              value={formik.values.releaseYear}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.releaseYear &&
              formik.errors.releaseYear && (
                <p role="alert">{formik.errors.releaseYear}</p>
              )}
          </div>

          <SubirImagen handleImgURL={setPosterSubido} resetKey={resetImagen} />
          {posterSubido && (<p>El nuevo póster se guardará al confirmar los cambios.</p>)}

          {error && <p role="alert">{error}</p>}

          <button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Guardando..." : "Guardar cambios"}
          </button>

          <button type="button" onClick={handlerCancelar}>
            Cancelar
          </button>
        </form>
      ) : (
        <>
          <h3>{title}</h3>
          <p>{description}</p>
          <p>Año: {releaseYear}</p>
          <p>Categoría: {category?.name || "Sin categoría"}</p>

          {error && <p role="alert">{error}</p>}

          {posterPersonalizado && posterCloudinaryId && (
            <button type="button" onClick={handlerBorrarPoster} disabled={eliminandoPoster}>
              {eliminandoPoster ? "Quitando póster..." : "Quitar póster personalizado"}
            </button>
          )}

          <button type="button" onClick={handlerEditar}>
            Editar
          </button>

          <button type="button" onClick={handlerBorrar} disabled={eliminando}>
            {eliminando ? "Eliminando..." : "Eliminar"}
          </button>
        </>
      )}
    </div>
  );
};

export default Pelicula;