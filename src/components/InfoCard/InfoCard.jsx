import React from "react";

const InfoCard = ({ data }) => {
  return (
    <>
      <div
        className="head-text"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <span className="mb-2 text-muted flex col">Monitoramento</span>
        <span style={{ fontWeight: "500" }}>{data}</span>
      </div>

      <div className="teste">teste</div>
    </>
  );
};

export default InfoCard;
