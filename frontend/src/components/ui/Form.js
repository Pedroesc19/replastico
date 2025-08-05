import React from "react";
import "./ui.css";

function Form({ className = "", children, ...props }) {
  return (
    <form className={`ui-form ${className}`} {...props}>
      {children}
    </form>
  );
}

export default Form;
