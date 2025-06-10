import React, { useEffect, useState } from "react";
import { Col, Card, Badge, Stack, Button } from 'react-bootstrap';
import { Zoom } from "react-awesome-reveal";
import EstrellasPromedio from "./EstrellasPromedio";
import RegistrarCalificacion from '../calificaciones/RegistrarCalificacion';

const Tarjeta = ({ descripcion, costo, imagen, id_ser }) => {
  const [promedio, setPromedio] = useState(0);
  const [actualizar, setActualizar] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    obtenerPromedio();
  }, [id_ser, actualizar]);

  const obtenerPromedio = async () => {
    try {
      const respuesta = await fetch(`http://127.0.0.1:3000/api/promediocalificacion/${id_ser}`);
      const datos = await respuesta.json();
      setPromedio(datos.promedio || 0);
    } catch (error) {
      console.error("Error al obtener promedio de calificación", error);
    }
  };

  const handleCalificacionExitosa = () => {
    setActualizar(!actualizar);
  };

  return (
    <>
      <Col lg={3} className="mt-3">
        <Zoom cascade triggerOnce delay={10} duration={600}>
          <Card border="">
            <Card.Img variant="top" src={`data:image/png;base64,${imagen}`} className="img-tarjeta-servicio" />
            <Card.Body>
              <Card.Title>
                <strong>{descripcion || 'Sin descripción'}</strong>
              </Card.Title>
              <Stack direction="horizontal" gap={2} className="mt-2">
                <Badge pill bg="primary">
                  <i className="bi-currency-dollar"></i> {costo.toFixed(2)}
                </Badge>
              </Stack>
              <div className="mt-1">
                <EstrellasPromedio promedio={promedio} />
              </div>
              <div className="mt-3 d-grid">
                <Button
                  variant="outline-primary"
                  onClick={() => setMostrarModal(true)}
                  disabled={!id_ser} // ⛔ evita errores si no hay id
                >
                  Calificar servicio
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Zoom>
      </Col>

      {/* ✅ Renderiza el modal solo si hay id_ser */}
      {mostrarModal && id_ser && (
        <RegistrarCalificacion
          show={mostrarModal}
          handleClose={() => setMostrarModal(false)}
          idServicio={id_ser}
          onCalificacionExitosa={handleCalificacionExitosa}
        />
      )}
    </>
  );
};

export default Tarjeta;