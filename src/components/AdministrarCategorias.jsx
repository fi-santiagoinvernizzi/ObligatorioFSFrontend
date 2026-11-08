import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { obtenerCategoriasApi, crearCategoriaApi, modificarCategoriaApi, 
          eliminarCategoriaApi,} from "../services/categoriasServices.js";

const esquemaValidacion = Yup.object({
  name: Yup.string()
    .trim()
    .max(50, "El nombre no puede superar los 50 caracteres.")
    .required("El nombre de la categoría es obligatorio."),

  description: Yup.string()
    .trim()
    .max(255, "La descripción no puede superar los 255 caracteres.")
    .required("La descripción es obligatoria."),
});


const AdministrarCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [cargandoCrear, setCargandoCrear] = useState(false);

  const cargarCategorias = async () => {
    try {
      const resultado = await obtenerCategoriasApi();
      setCategorias(resultado);
    } catch (error) {
      setMensaje( error.response?.data?.message || "No se pudieron cargar las categorías." );
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  // Formulario para crear categorías
  const formikCrear = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: esquemaValidacion,
    onSubmit: async (valores, { resetForm }) => {
      setMensaje("");
      setCargandoCrear(true);

      try {
        await crearCategoriaApi({
          name: valores.name.trim(),
          description: valores.description.trim(),
        });

        resetForm();
        setFormularioAbierto(false);
        setMensaje("Categoría creada correctamente.");
        await cargarCategorias();
      } catch (error) {
        setMensaje(
          error.response?.data?.message ||
          error.response?.data?.error ||
          "No se pudo crear la categoría."
        );
      } finally {
        setCargandoCrear(false);
      }
    },
  });

  const handlerCrear = () => {
    setMensaje("");
    formikCrear.resetForm();
    setFormularioAbierto(true);
  };

  const handlerCancelarCrear = () => {
    formikCrear.resetForm();
    setFormularioAbierto(false);
    setMensaje("");
  };

  // Edición de categorías
  const handlerEditar = (categoria) => {
    setErrores((anteriores) => ({ ...anteriores, [categoria.id || categoria._id]: "", }));

    setCategorias((anteriores) =>
      anteriores.map((item) => ({
        ...item,
        editando: (item.id || item._id) === (categoria.id || categoria._id),
      }))
    );
  };

  const handlerCancelar = (idCategoria) => {
    setCategorias((anteriores) =>
      anteriores.map((categoria) => ({
        ...categoria,
        editando: false,
      }))
    );

    setErrores((anteriores) => ({
      ...anteriores,
      [idCategoria]: "",
    }));
  };

  const handlerGuardar = async (categoria, valores) => {
    const idCategoria = categoria.id || categoria._id;

    setErrores((anteriores) => ({
      ...anteriores,
      [idCategoria]: "",
    }));

    try {
      const respuesta = await modificarCategoriaApi(idCategoria, {
        name: valores.name.trim(),
        description: valores.description.trim(),
      });

      setCategorias((anteriores) =>
        anteriores.map((item) =>
          (item.id || item._id) === idCategoria
            ? {
                ...item,
                ...respuesta,
                id: respuesta.id || respuesta._id || idCategoria,
                editando: false,
              }
            : item
        )
      );

      setMensaje("Categoría modificada correctamente.");
    } catch (error) {
      setErrores((anteriores) => ({
        ...anteriores,
        [idCategoria]: error.response?.data?.message || error.response?.data?.error || "No se pudo modificar la categoría.",
      }));
    }
  };

  // Eliminación de categorías
  const handlerBorrar = async (categoria) => {
    const idCategoria = categoria.id || categoria._id;

    const confirmar = window.confirm(
      `¿Estás seguro de que querés eliminar la categoría "${categoria.name}"?`
    );

    if (!confirmar) return;

    setErrores((anteriores) => ({
      ...anteriores,
      [idCategoria]: "",
    }));

    try {
      await eliminarCategoriaApi(idCategoria);

      setCategorias((anteriores) =>
        anteriores.filter(
          (item) => (item.id || item._id) !== idCategoria
        )
      );

      setMensaje("Categoría eliminada correctamente.");
    } catch (error) {
      setErrores((anteriores) => ({
        ...anteriores,
        [idCategoria]: error.response?.data?.message || error.response?.data?.error || "No se pudo eliminar la categoría.",
      }));
    }
  };

  return (
    <section className="administrar-categorias">
      <div className="encabezado-categorias">
        <h2>Administración de categorías</h2>

        {!formularioAbierto && (
          <button type="button" onClick={handlerCrear}>
            Crear categoría
          </button>
        )}
      </div>

      {formularioAbierto && (
        <form onSubmit={formikCrear.handleSubmit}>
          <h3>Crear categoría</h3>

          <div>
            <label htmlFor="nombreCategoria">Nombre:</label>
            <input
              id="nombreCategoria"
              name="name"
              type="text"
              value={formikCrear.values.name}
              onChange={formikCrear.handleChange}
              onBlur={formikCrear.handleBlur}
              required
            />
            {formikCrear.touched.name && formikCrear.errors.name && (
              <p role="alert">{formikCrear.errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="descripcionCategoria">Descripción:</label>
            <textarea
              id="descripcionCategoria"
              name="description"
              value={formikCrear.values.description}
              onChange={formikCrear.handleChange}
              onBlur={formikCrear.handleBlur}
              required
            />
            {formikCrear.touched.description &&
              formikCrear.errors.description && (
                <p role="alert">{formikCrear.errors.description}</p>
              )}
          </div>

          <button type="submit" disabled={cargandoCrear}>
            {cargandoCrear ? "Guardando..." : "Crear categoría"}
          </button>

          <button type="button" onClick={handlerCancelarCrear}>
            Cancelar
          </button>
        </form>
      )}

      {mensaje && <p role="status">{mensaje}</p>}

      <div className="lista-categorias">
        <h3>Categorías existentes</h3>

        {categorias.length === 0 ? (
          <p>No hay categorías registradas.</p>
        ) : (
          categorias.map((categoria) => {
            const idCategoria = categoria.id || categoria._id;

            return (
              <CategoriaFila
                key={idCategoria}
                categoria={categoria}
                error={errores[idCategoria]}
                handlerEditar={handlerEditar}
                handlerCancelar={handlerCancelar}
                handlerGuardar={handlerGuardar}
                handlerBorrar={handlerBorrar}
              />
            );
          })
        )}
      </div>
    </section>
  );
};

// Formulario de cada categoría, definido en el mismo archivo
const CategoriaFila = ({ categoria, error, handlerEditar, handlerCancelar, handlerGuardar, handlerBorrar,}) => {
  const formik = useFormik({
    initialValues: {
      name: categoria.name || "",
      description: categoria.description || "",
    },
    enableReinitialize: true,
    validationSchema: esquemaValidacion,
    onSubmit: (valores) => handlerGuardar(categoria, valores),
  });

  return (
    <article className="categoria-admin">
      {categoria.editando ? (
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor={`nombre-${categoria.id || categoria._id}`}>
              Nombre:
            </label>
            <input
              id={`nombre-${categoria.id || categoria._id}`}
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.name && formik.errors.name && (
              <p role="alert">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor={`descripcion-${categoria.id || categoria._id}`}>
              Descripción:
            </label>
            <textarea
              id={`descripcion-${categoria.id || categoria._id}`}
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

          {error && <p role="alert">{error}</p>}

          <button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Guardando..." : "Guardar cambios"}
          </button>

          <button
            type="button"
            onClick={() => handlerCancelar(categoria.id || categoria._id)}
          >
            Cancelar
          </button>
        </form>
      ) : (
        <>
          <div>
            <h4>{categoria.name}</h4>
            <p>{categoria.description}</p>
          </div>

          {error && <p role="alert">{error}</p>}

          <div>
            <button
              type="button"
              onClick={() => handlerEditar(categoria)}
            >
              Editar
            </button>

            <button
              type="button"
              onClick={() => handlerBorrar(categoria)}
            >
              Eliminar
            </button>
          </div>
        </>
      )}
    </article>
  );
};

export default AdministrarCategorias;
