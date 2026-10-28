import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { obtenerCategoriasApi } from "../services/categoriasServices.js";
import { crearPeliculaApi } from "../services/peliculasServices.js";
import { agregarPeliculaSlice } from "../redux/features/peliculasSlice.js";

const Agregar = () => {
  const dispatch = useDispatch();

  const [categorias, setCategorias] = useState([]);

  const [valores, setValores] = useState({
    title: "",
    description: "",
    releaseYear: "",
    category: "",
  });

  const [error, setError] = useState("");

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

  const handleChange = (evento) => {
    const auxValores = { ...valores };
    const name = evento.target.name;
    const value = evento.target.value;

    auxValores[name] = value;
    setValores(auxValores);
  };

  const agregarHandler = async (evento) => {
    evento.preventDefault();
    setError("");

    const peliculaNueva = {
      title: valores.title.trim(),
      description: valores.description.trim(),
      releaseYear: Number(valores.releaseYear),
      category: valores.category,
    };

    if (!peliculaNueva.title || !peliculaNueva.description || !peliculaNueva.releaseYear || !peliculaNueva.category) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const peliculaCreada = await crearPeliculaApi(peliculaNueva);

      dispatch(agregarPeliculaSlice(peliculaCreada));

      setValores({
        title: "",
        description: "",
        releaseYear: "",
        category: "",
      });
      
    } catch (error) {
      console.error("Error al crear película:", error);

      setError(
        error.response?.data?.message ||
          "No se pudo crear la película."
      );
    }
  };

  return (
    <div className="agregar">
      <h3>Agregar película</h3>

      <form onSubmit={agregarHandler}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={valores.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={valores.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="releaseYear">Año de estreno:</label>
          <input
            type="number"
            id="releaseYear"
            name="releaseYear"
            value={valores.releaseYear}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Categoría:</label>
          <select
            id="category"
            name="category"
            value={valores.category}
            onChange={handleChange}
            required
          >
            <option value="">Seleccioná una categoría</option>

            {categorias.map((categoria) => (
              <option key={categoria._id} value={categoria._id}>
                {categoria.name}
              </option>
            ))}
          </select>
        </div>

        {error && <p>{error}</p>}

        <button type="submit">Agregar película</button>
      </form>
    </div>
  );
};

export default Agregar;
