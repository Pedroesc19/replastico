import React from "react";
import "./ui.css";
import motion from "../../design/motion";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }
  return (
    <div
      className="ui-modal-overlay"
      style={motion.fade({ overlay: true })}
      role="dialog"
      aria-modal="true"
    >
      <div className="ui-modal" style={motion.scale({ overlay: true })}>
        <button className="ui-modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
