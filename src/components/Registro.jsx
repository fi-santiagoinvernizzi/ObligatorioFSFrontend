import React, { useState,  } from "react";
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

  
const nombreValido = valores.name.trim().length >= 3 && valores.name.trim().length <= 30;

const usuarioValido = /^[a-zA-Z0-9]{3,30}$/.test(valores.username.trim()); //solo letras y números, entre 3 y 30 caracteres

const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valores.email.trim()); //formato mail

const contrasenaValida = valores.password.length >= 3 && valores.password.length <= 30;

const contrasenasCoinciden = valores.password === valores.confirmPassword;

const formularioValido = nombreValido && usuarioValido && emailValido && contrasenaValida 
                          && valores.confirmPassword !== "" && contrasenasCoinciden;

  const registrarHandler = async (evento) => {
    evento.preventDefault();
    setError("");

    try {
      const resultado = await registrarUsuarioApi(valores);

      localStorage.setItem("token", resultado.token);
      localStorage.setItem("user", JSON.stringify(resultado.user));

      navigate("/dashboard");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setError(error.response?.data?.message || "No se pudo registrar el usuario.");
    }
  };

  return (
    <main className="pagina-autenticacion">
      <section className="registro-panel">
        <div className="registro-encabezado">
          <div className="registro-logo">M</div>
          <h1>Crear cuenta</h1>
          <p>Registrate para comenzar a organizar tu colección.</p>
        </div>

        <form onSubmit={registrarHandler} className="registro-formulario">
          <div className="campo-registro">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={valores.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
            />
          </div>

          <div className="campo-registro">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={valores.username}
              onChange={handleChange}
              placeholder="Elegí un nombre de usuario"
              required
            />
          </div>

          <div className="campo-registro">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={valores.email}
              onChange={handleChange}
              placeholder="nombre@ejemplo.com"
              required
            />
          </div>

          <div className="campo-registro">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={valores.password}
              onChange={handleChange}
              placeholder="Ingresá tu contraseña"
              required
            />
          </div>

          <div className="campo-registro">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={valores.confirmPassword}
              onChange={handleChange}
              placeholder="Repetí tu contraseña"
              required
            />
          </div>

          {!contrasenasCoinciden &&
            valores.confirmPassword !== "" && (
              <p className="registro-error">
                Las contraseñas no coinciden.
              </p>
            )}

          {error && (
            <p className="registro-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="registro-boton"
            disabled={!formularioValido}
          >
            Registrarse
          </button>
        </form>

        <div className="registro-pie">
          <span>¿Ya tenés una cuenta?</span>
          <button type="button" onClick={() => navigate("/login")}>
            Iniciar sesión
          </button>
        </div>
      </section>
    </main>
  );
};

export default Registro;
