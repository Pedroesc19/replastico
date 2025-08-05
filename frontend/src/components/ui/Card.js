import React from "react";
import "./ui.css";

function Card({ className = "", children, ...props }) {
  return (
    <div className={`ui-card ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Card;
