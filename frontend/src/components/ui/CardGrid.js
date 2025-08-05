import React from "react";
import "./ui.css";

function CardGrid({ className = "", children, ...props }) {
  return (
    <div className={`ui-card-grid ${className}`} {...props}>
      {children}
    </div>
  );
}

export default CardGrid;
