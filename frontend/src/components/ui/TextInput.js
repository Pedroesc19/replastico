import React from "react";
import "./ui.css";

function TextInput({ label, id, ...props }) {
  return (
    <div className="ui-field">
      {label && (
        <label htmlFor={id} className="ui-label">
          {label}
        </label>
      )}
      <input id={id} className="ui-input" {...props} />
    </div>
  );
}

export default TextInput;
