import React from "react";
import "./ui.css";

function TextInput({ label, id, className = "", ...props }) {
  return (
    <div className="ui-field">
      {label && (
        <label htmlFor={id} className="ui-label">
          {label}
        </label>
      )}
      <input id={id} className={`ui-input ${className}`} {...props} />
    </div>
  );
}

export default TextInput;
