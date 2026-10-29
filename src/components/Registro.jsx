import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarUsuarioApi } from "../services/authServices.js";


const Registro = () => {
  const navigate = useNavigate();
  
  const [valores, setValores] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (evento) => {
    const auxValores = { ...valores };
    const name = evento.target.name;
    const value = evento.target.value;

    auxValores[name] = value;
    setValores(auxValores);
  };

  const contrasenasCoinciden =
    valores.password === valores.confirmPassword;

  const formularioValido =
    valores.name.trim() !== "" &&
    valores.username.trim() !== "" &&
    valores.email.trim() !== "" &&
    valores.password !== "" &&
    valores.confirmPassword !== "" &&
    contrasenasCoinciden;

  const registrarHandler = async (evento) => {
    evento.preventDefault();
    setError("");

    try {
        const resultado = await registrarUsuarioApi(valores);

        localStorage.setItem("token", resultado.token);
        window.localStorage.setItem("user", JSON.stringify(resultado.user));
        navigate("/dashboard");
        
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        setError(error.response?.data?.message || "No se pudo registrar el usuario.");
}
  };

  return (
    <div>
      <h2>Registro</h2>

      <form onSubmit={registrarHandler}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={valores.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={valores.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={valores.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={valores.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">
            Repetir contraseña:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={valores.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {!contrasenasCoinciden &&
          valores.confirmPassword !== "" && (
            <p>Las contraseñas no coinciden.</p>
          )}

        {error && <p>{error}</p>}

        <button type="submit" disabled={!formularioValido}>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Registro;
