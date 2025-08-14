import React from "react";
import { useLocation } from "react-router-dom";

export default function Cancel() {
  const { search } = useLocation();
  const sessionId = new URLSearchParams(search).get("session_id");
  return (
    <div>
      <h1>Payment canceled</h1>
      {sessionId && <p>Session ID: {sessionId}</p>}
    </div>
  );
}
