import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  // Inicializa el estado leyendo los datos de localStorage al montar el componente.
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("userInfo");
    if (token && user) {
      setUserInfo(JSON.parse(user));
    }
  }, []);

  // Función para guardar la información del usuario en el contexto y localStorage.
  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ name: data.name, email: data.email, role: data.role })
    );
    setUserInfo({ name: data.name, email: data.email, role: data.role });
  };

  // Función de logout.
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
