import React from "react";
import "./ui.css";
import motion from "../../design/motion";

function Button({ variant = "primary", className = "", children, ...props }) {
  return (
    <button
      className={`ui-button ui-button--${variant} ${className}`}
      style={motion.fade()}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
