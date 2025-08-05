import React from "react";
import "./ui.css";

function Button({ variant = "primary", children, ...props }) {
  return (
    <button className={`ui-button ui-button--${variant}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
