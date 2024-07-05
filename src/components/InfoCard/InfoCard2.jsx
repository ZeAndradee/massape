import React from "react";

const InfoCard = ({ data, endereco }) => {
  return (
    <>
      <div
        className="head-text"
        style={{
          display: "flex",
          flexDirection: "column",
          borderBottom: "1px solid #E7E7E7",
          borderRadius: "10px",
          paddingTop: "10px",
          paddingLeft: "10px",
        }}
      >
        <span className="text-muted flex col">Reportado por</span>
        <span style={{ fontWeight: "500", color: "#1AB3FF" }}>{data}</span>
      </div>
      <div
        className="head-text"
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        <span className="text-muted flex col">Endereço</span>
        <span style={{ fontWeight: "500" }}>{endereco}</span>
      </div>
    </>
  );
};

export default InfoCard;
