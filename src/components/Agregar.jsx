// import { useState, useRef } from "react";
// import { agregarTareaSlice } from "../redux/features/tareasSlice.js";
// import { useDispatch } from "react-redux";
// import { crearTareaApi } from "../services/tareasServices.js";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { obtenerCategoriasApi } from "../services/categoriasServices.js";

const Agregar = () => {
  const dispatch = useDispatch();

  // const inputRef = useRef();
  const [categorias, setCategorias] = useState([]);

  const [valores, setValores] = useState({
    title: "",
    description: "",
    releaseYear: "",
    category: "",
  });

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const resultado = await obtenerCategoriasApi();

        console.log("Categorías recibidas:", resultado);
        setCategorias(resultado);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    obtenerCategorias();
  }, []);
  
  const handleChange = (evento) => {
    const name = evento.target.name;
    const value = evento.target.value;

    const valoresAux = { ...valores };
    valoresAux[name] = value;

    setValores(valoresAux);
  };
  
  // const agregarHandler = async (evento) => {
  //   const title = inputRef.current.value;
  //   // agregarTarea(title);

  //   const tareaNueva = {
  //     title,
  //     userId: 1,
  //   };

  //   const tareaCreada = await crearTareaApi(tareaNueva);

  //   //aca llamamos a la api que nos devuelve una tarea completa
  //   //recien cuando salio todo bien llamamos al dispatch

  //   dispatch(agregarTareaSlice(tareaCreada));

  //   inputRef.current.value = "";
  // };

  const agregarHandler = (evento) => {
    evento.preventDefault();

    console.log("Datos del formulario:", valores);
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

        <button type="submit">Agregar película</button>
      </form>
    </div>
  );
};

export default Agregar;
