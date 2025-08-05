import React, { useEffect, useRef } from "react";
import "./ui.css";
import motion from "../../design/motion";

function Modal({ isOpen, onClose, children }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    if (closeRef.current) {
      closeRef.current.focus();
    }
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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
        <button
          ref={closeRef}
          className="ui-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
