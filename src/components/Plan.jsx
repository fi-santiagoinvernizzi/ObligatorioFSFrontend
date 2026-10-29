import Button from "react-bootstrap/Button";

const Plan = ({ usuario, onUpgrade, cargandoUpgrade, error }) => {
  return (
    <section className="panel-plan">
      <div>
        <span className="etiqueta-seccion">TU CUENTA</span>
        <h3>Plan actual</h3>
        <p className="plan-nombre">
          {usuario?.plan === "premium" ? "Premium" : "Plus"}
        </p>
        <p className="plan-descripcion">
          {usuario?.plan === "premium"
            ? "Tenés acceso sin límite de películas."
            : "Podés registrar hasta 4 películas."}
        </p>
      </div>

      {usuario?.plan === "plus" && (
        <Button
          className="boton-upgrade"
          onClick={onUpgrade}
          disabled={cargandoUpgrade}
        >
          {cargandoUpgrade ? "Actualizando..." : "Pasar a Premium"}
        </Button>
      )}

      {usuario?.plan === "premium" && (
        <span className="estado-premium">Plan Premium activo</span>
      )}

      {error && <p className="mensaje-error">{error}</p>}
    </section>
  );
};

export default Plan;