import React from "react";
import "./ui.css";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="ui-modal-overlay" role="dialog" aria-modal="true">
      <div className="ui-modal">
        <button className="ui-modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
