import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { userInfo } = useContext(AuthContext);

  // Si no hay usuario, redirecciona al login
  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  // Si se requiere admin y el usuario no es admin, redirecciona a home o a otra página
  if (adminOnly && userInfo.role !== "admin") {
    return <Navigate to="/" />;
  }

  // Si pasa las validaciones, renderiza los componentes hijos
  return children;
};

export default ProtectedRoute;
