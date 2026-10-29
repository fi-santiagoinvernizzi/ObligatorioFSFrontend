import { useEffect, useState } from "react";
import App from "../App.jsx";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { cambiarPlanApi } from "../services/usersServices.js";

const Dashboard = () => {
  const navigate = useNavigate();

  const [estaLogueado, setEstaLogueado] = useState(false);
  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem("user");

    try {
      return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
    } catch {
      return null;
    }
  });

  const [cargandoUpgrade, setCargandoUpgrade] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      setEstaLogueado(true);
    }
  }, [navigate]);

  const upgradePlan = async () => {
    setError("");
    setCargandoUpgrade(true);

    try {
      const usuarioActualizado = await cambiarPlanApi();

      setUsuario(usuarioActualizado);
      localStorage.setItem(
        "user",
        JSON.stringify(usuarioActualizado)
      );
    } catch (error) {
      console.error("Error al actualizar el plan:", error);
      setError(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "No se pudo actualizar el plan."
      );
    } finally {
      setCargandoUpgrade(false);
    }
  };

  return (
    <>
      {estaLogueado ? (
        <div>
          <Card className="m-3" style={{ maxWidth: "25rem" }}>
            <Card.Body>
              <Card.Title>
                Bienvenido, {usuario?.name || "usuario"}
              </Card.Title>

              <Card.Text>
                Plan actual: <strong>{usuario?.plan || "No disponible"}</strong>
              </Card.Text>

              {usuario?.plan === "plus" && (
                <Button
                  variant="primary"
                  onClick={upgradePlan}
                  disabled={cargandoUpgrade}
                >
                  {cargandoUpgrade
                    ? "Actualizando..."
                    : "Pasar a Premium"}
                </Button>
              )}

              {usuario?.plan === "premium" && (
                <p className="text-success mb-0">
                  Ya tenés el plan Premium.
                </p>
              )}

              {error && (
                <p className="text-danger mt-2">{error}</p>
              )}
            </Card.Body>
          </Card>

          <App />
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </>
  );
};

export default Dashboard;