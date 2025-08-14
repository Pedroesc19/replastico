import React from "react";
import { useLocation } from "react-router-dom";

export default function Success() {
  const { search } = useLocation();
  const sessionId = new URLSearchParams(search).get("session_id");
  return (
    <div>
      <h1>Payment successful</h1>
      {sessionId && <p>Session ID: {sessionId}</p>}
    </div>
  );
}
