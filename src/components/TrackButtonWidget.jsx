import React, { useState } from "react";
import "./TrackButtonWidget.css";

/**
 * TrackButtonWidget
 * Props:
 *   - size: 'large' | 'small' (opcional, default 'large')
 */
export default function TrackButtonWidget({ size = "large" }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      // API genérica de ejemplo
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      if (!res.ok) throw new Error("Error en la consulta");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`as-track-button-widget as-track-button-widget--${size}`} style={{ textAlign: "center", margin: 16 }}>
      <button
        className={`as-track-button as-track-button--${size}`}
        onClick={handleClick}
        disabled={loading}
        style={{
          padding: size === "large" ? "12px 32px" : "8px 20px",
          fontSize: size === "large" ? 20 : 14,
          borderRadius: 8,
          background: "#22243a",
          color: "#fff",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Consultando..." : "Consultar Tracking"}
      </button>
      <div style={{ marginTop: 16, minHeight: 40 }}>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {result && (
          <pre style={{ textAlign: "left", background: "#f4f4f4", padding: 12, borderRadius: 6 }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
} 