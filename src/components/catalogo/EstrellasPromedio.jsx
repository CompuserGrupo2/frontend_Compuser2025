import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Tooltip } from "react-tooltip"; 

const EstrellasPromedio = ({ promedio }) => {
  const estrellas = [];

  for (let i = 1; i <= 5; i++) {
    let icon = null;
    if (promedio >= i) {
      icon = <FaStar color="#ffc107" />;
    } else if (promedio >= i - 0.5) {
      icon = <FaStarHalfAlt color="#ffc107" />;
    } else {
      icon = <FaRegStar color="#ccc" />;
    }

    estrellas.push(
      <span
        key={i}
        data-tooltip-id="tooltipEstrellas"
        data-tooltip-content={`${promedio} estrellas`}
        style={{ cursor: "default" }}
      >
        {icon}
      </span>
    );
  }

  return (
    <div>
      {estrellas}
      <Tooltip
        id="tooltipEstrellas"
        place="top"
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "8px 12px",
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: 500,
          boxShadow: "0 1px 1px rgba(0, 0, 0, 0.25)",
        }}
      />
    </div>
  );
};

export default EstrellasPromedio;