import React from "react";

const InfoCard = ({ data }) => {
  return (
    <>
      <div
        className="head-text"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <span className="text-muted flex col">Monitoramento</span>
        <span style={{ fontWeight: "600" }}>{data}</span>
      </div>
      <div style={{ fontWeight: "600", color: "red" }}>Em tempo real</div>
    </>
  );
};

export default InfoCard;
