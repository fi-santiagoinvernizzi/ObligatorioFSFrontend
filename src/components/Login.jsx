import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import React, { useState } from "react";
import { loginApi } from "../services/authServices.js";

const Login = ({ onLogin }) => {
  const [valores, setValores] = useState({
    identificador: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const auxValores = { ...valores };
    const name = e.target.name;
    const type = e.target.type;
    //aca hay que saber el type para saber si es un checkbox u otro tipo
    const value = type == "checkbox" ? e.target.checked : e.target.value;
    auxValores[name] = value; //se usa para saber quien ejecuto el evento
    
    setValores(auxValores);
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const resultado = await loginApi(valores);
      const token = resultado.token;

      window.localStorage.setItem("token", token);

      onLogin();
      
    } catch (error) {
      console.error(error);
      setError( error.response?.data?.message || "No se pudo iniciar sesión. Verificá tus credenciales.");
    }
  };

  

  return (
    <Card style={{ width: "22rem", margin: "2rem auto" }}>
      <Card.Body>
        <Card.Title>Iniciar sesión</Card.Title>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Usuario o Email</Form.Label>
            <Form.Control
              type="email"
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

          <Button variant="primary" type="submit">Iniciar sesión</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Login;
