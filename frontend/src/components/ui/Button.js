import React from "react";
import "./ui.css";

function Button({ variant = "primary", className = "", children, ...props }) {
  return (
    <button
      className={`ui-button ui-button--${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
