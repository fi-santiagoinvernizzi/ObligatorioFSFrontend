import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { obtenerCategoriasApi } from "../services/categoriasServices.js";
import { crearPeliculaApi } from "../services/peliculasServices.js";
import { agregarPeliculaSlice } from "../redux/features/peliculasSlice.js";
import SubirImagen from "./SubirImagen.jsx";

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
  category: Yup.string()
    .required("Seleccioná una categoría."),
});

const Agregar = () => {
  const dispatch = useDispatch();
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState("");
  const [posterPersonalizado, setPosterPersonalizado] = useState(null);
  const [resetImagen, setResetImagen] = useState(0);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const resultado = await obtenerCategoriasApi();
        setCategorias(resultado);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    obtenerCategorias();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      releaseYear: "",
      category: "",
    },
    validationSchema: esquemaValidacion,
    onSubmit: async (valores, { resetForm }) => {
      setError("");

      const peliculaNueva = {
        title: valores.title.trim(),
        description: valores.description.trim(),
        releaseYear: Number(valores.releaseYear),
        category: valores.category,
        ...(posterPersonalizado && {
          posterPersonalizado: posterPersonalizado.url,
          posterCloudinaryId: posterPersonalizado.public_id,
        }),
      };

      try {
        const peliculaCreada = await crearPeliculaApi(peliculaNueva);

        dispatch(agregarPeliculaSlice(peliculaCreada));

        resetForm();
        setPosterPersonalizado(null);
        setResetImagen((valor) => valor + 1);
      } catch (error) {
        console.error("Error al crear película:", error);

        setError(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "No se pudo crear la película."
        );
      }
    },
  });

  return (
    <div className="agregar">
      <h3>Agregar película</h3>

      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
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
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.description && formik.errors.description && (
            <p role="alert">{formik.errors.description}</p>
          )}
        </div>

        <div>
          <label htmlFor="releaseYear">Año de estreno:</label>
          <input
            type="number"
            id="releaseYear"
            name="releaseYear"
            value={formik.values.releaseYear}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.releaseYear && formik.errors.releaseYear && (
            <p role="alert">{formik.errors.releaseYear}</p>
          )}
        </div>

        <div>
          <label htmlFor="category">Categoría:</label>
          <select
            id="category"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          >
            <option value="">Seleccioná una categoría</option>

            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.name}
              </option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category && (
            <p role="alert">{formik.errors.category}</p>
          )}
        </div>

        <SubirImagen
          handleImgURL={setPosterPersonalizado}
          resetKey={resetImagen}
        />

        {posterPersonalizado && (
          <p>El póster personalizado está listo para adjuntarse.</p>
        )}

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Agregando..." : "Agregar película"}
        </button>
      </form>
    </div>
  );
};

export default Agregar;