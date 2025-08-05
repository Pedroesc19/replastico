import React from "react";
import { useLocation } from "react-router-dom";
import motion from "../design/motion";

function PageTransition({ children }) {
  const location = useLocation();
  return (
    <div key={location.pathname} style={motion.slide()}>
      {children}
    </div>
  );
}

export default PageTransition;
