import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import React, { useState } from "react";
import { loginApi } from "../services/authServices.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  
  const [valores, setValores] = useState({
    identificador: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const auxValores = { ...valores };
    const name = e.target.name;
    const type = e.target.type;
    const value =
      type == "checkbox" ? e.target.checked : e.target.value;

    auxValores[name] = value;
    setValores(auxValores);
  };

  const formularioValido = valores.identificador.trim() !== "" && valores.password.trim() !== "";

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const resultado = await loginApi(valores);
      const token = resultado.token;

      window.localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
        console.error(error);
        setError(
          error.response?.data?.message ||
            "No se pudo iniciar sesión. Verificá tus credenciales."
        );
    }
  };

  return (
    <Card style={{ width: "22rem", margin: "2rem auto" }}>
      <Card.Body>
        <Card.Title>Iniciar sesión</Card.Title>

        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicIdentificador">
            <Form.Label>Usuario o Email</Form.Label>
            <Form.Control
              type="text"
              name="identificador"
              value={valores.identificador}
              placeholder="Ingresa tu usuario o email"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={valores.password}
              placeholder="Ingresa tu contraseña"
              onChange={handleChange}
              required
            />
          </Form.Group>

          {error && <p className="text-danger">{error}</p>}

          <Button
            variant="primary"
            type="submit"
            disabled={!formularioValido}
          >
            Iniciar sesión
          </Button>

          {/* Registro */}
          <div className="mt-3">
          <span>¿No tenés una cuenta? </span>
          <Button variant="link" onClick={() => navigate("/registro")}>
            Registrate
          </Button>
        </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Login;
