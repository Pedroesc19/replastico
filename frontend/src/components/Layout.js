import React from "react";
import "../css/Layout.css";

const Layout = ({ children }) => {
  return <div className="layout-container grid cols-12">{children}</div>;
};

export default Layout;
