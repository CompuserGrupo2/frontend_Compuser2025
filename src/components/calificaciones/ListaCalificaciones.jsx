import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ListaCalificaciones = ({ idServicio }) => {
  const [calificaciones, setCalificaciones] = useState([]);

  useEffect(() => {
    const fetchCalificaciones = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:3000/obtenercalificacionesporservicio/${idServicio}`);
        const data = await res.json();
        setCalificaciones(data);
      } catch (error) {
        console.error("Error al obtener calificaciones:", error);
      }
    };

    fetchCalificaciones();
  }, [idServicio]);

  const renderEstrellas = (valor) => {
    const estrellas = [];
    for (let i = 1; i <= 5; i++) {
      if (valor >= i) {
        estrellas.push(<FaStar key={i} color="#ffc107" />);
      } else if (valor >= i - 0.5) {
        estrellas.push(<FaStarHalfAlt key={i} color="#ffc107" />);
      } else {
        estrellas.push(<FaRegStar key={i} color="#ccc" />);
      }
    }
    return estrellas;
  };

  return (
    <div>
      <h4>Opiniones de los clientes</h4>
      {calificaciones.length === 0 ? (
        <p>No hay calificaciones para este servicio aún.</p>
      ) : (
        calificaciones.map((cal) => (
          <div key={cal.id_cali} style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "15px", margin: "10px 0", background: "#f9f9f9" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <strong>{cal.nombre_cliente}</strong>
              <span style={{ fontSize: "14px", color: "#666" }}>{new Date(cal.fecha_calificacion).toLocaleDateString()}</span>
            </div>
            <div>{renderEstrellas(cal.calidad_servicio)}</div>
            {cal.comentario && <p style={{ marginTop: "10px" }}>💬 {cal.comentario}</p>}
            {cal.respuesta_calificacion && (
              <p style={{ marginTop: "10px", backgroundColor: "#e9f7ef", padding: "10px", borderRadius: "5px", fontStyle: "italic" }}>
                🛠️ Respuesta del empleado: {cal.respuesta_calificacion}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ListaCalificaciones;
