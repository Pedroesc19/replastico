import React from "react";
import "./ui.css";

function Card({ children, ...props }) {
  return (
    <div className="ui-card" {...props}>
      {children}
    </div>
  );
}

export default Card;
