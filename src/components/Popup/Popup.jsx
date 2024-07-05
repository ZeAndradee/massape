import React from "react";
import warningIcon from "../../assets/high-risk-icon.svg"; // Caminho para o ícone de aviso

const Popup = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000, // High z-index to ensure it covers other content
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "white",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <img
          src={warningIcon}
          alt="Warning"
          style={{ width: "50px", height: "50px", marginRight: "20px" }}
        />
        <p
          style={{
            maxWidth: "600px", // Limit width of the text
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          Atenção: Evacuação iminente devido a deslizamento! Por favor, evacue a
          área imediatamente.
        </p>
      </div>
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "none",
          border: "none",
          color: "white",
          fontSize: "1.5rem",
          cursor: "pointer",
        }}
      >
        ×
      </button>
    </div>
  );
};

export default Popup;
