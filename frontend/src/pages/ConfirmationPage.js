import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/ConfirmationPage.css";
import { Button } from "../components/ui";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Podemos recibir un estado (state) con información del pedido o un simple flag de éxito
  // Por ejemplo: navigate("/confirmation", { state: { success: true } })
  const { state } = location;
  const isSuccess = state?.success;
  const message = state?.message || "";

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="confirmation-page">
      {isSuccess ? (
        <>
          <h1>¡Pedido Exitoso!</h1>
          <p>Tu pedido se ha registrado correctamente.</p>
        </>
      ) : (
        <>
          <h1>Ocurrió un error</h1>
          <p>{message || "No se pudo procesar tu pedido."}</p>
        </>
      )}

      <Button onClick={handleGoHome} className="btn-back-home">
        Volver al Inicio
      </Button>
    </div>
  );
};

export default ConfirmationPage;
