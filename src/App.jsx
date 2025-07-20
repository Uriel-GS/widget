import React from "react";
import TrackButtonWidget from "./components/TrackButtonWidget";

export default function App() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Demo Widget estilo AfterShip</h1>
      {/* Puedes poner el widget donde quieras */}
      <TrackButtonWidget size="large" />
      <div style={{ marginTop: 40 }}>
        <h2>Otro ejemplo (botón pequeño)</h2>
        <TrackButtonWidget size="small" />
      </div>
    </div>
  );
} 