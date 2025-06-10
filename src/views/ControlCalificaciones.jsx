import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Badge, Alert, Card } from "react-bootstrap";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import Paginacion from "../components/ordenamiento/Paginacion";

const ControlCalificaciones = () => {
  const [calificaciones, setCalificaciones] = useState([]);
  const [filtradas, setFiltradas] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  const [mostrarModal, setMostrarModal] = useState(false);
  const [calificacionSeleccionada, setCalificacionSeleccionada] = useState(null);
  const [respuesta, setRespuesta] = useState("");
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    obtenerCalificaciones();
  }, []);

  useEffect(() => {
    filtrarCalificaciones();
  }, [calificaciones, textoBusqueda]);

  const obtenerCalificaciones = async () => {
    try {
      const res = await fetch("http://127.0.0.1:3000/api/obtenercalificaciones");
      const data = await res.json();
      const ordenadas = Array.isArray(data)
        ? data.sort((a, b) => (a.respuesta_calificacion ? 1 : -1))
        : [];
      setCalificaciones(ordenadas);
    } catch (error) {
      console.error("Error al obtener calificaciones:", error);
      setCalificaciones([]);
    }
  };

  const filtrarCalificaciones = () => {
    const texto = textoBusqueda.toLowerCase();
    const resultado = calificaciones.filter((califica) =>
      califica.comentario?.toLowerCase().includes(texto) ||
      califica.cliente?.toLowerCase().includes(texto) ||
      califica.servicio?.toLowerCase().includes(texto) ||
      califica.respuesta_calificacion?.toLowerCase().includes(texto) 
    );
    setFiltradas(resultado);
    establecerPaginaActual(1);
  };

  const calificacionesPaginadas = filtradas.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  const abrirModal = (calificacion) => {
    setCalificacionSeleccionada(calificacion);
    setRespuesta("");
    setMensaje(null);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setRespuesta("");
    setMensaje(null);
  };

  const enviarRespuesta = async () => {
    if (!respuesta.trim()) {
      setMensaje({ texto: "La respuesta no puede estar vacía.", tipo: "danger" });
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:3000/api/calificaciones/${calificacionSeleccionada.id_cali}/responder`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ respuesta }),
      });

      const data = await res.json();

      if (res.ok) {
        const actualizadas = calificaciones.map((c) =>
          c.id_cali === calificacionSeleccionada.id_cali
            ? { ...c, respuesta_calificacion: respuesta }
            : c
        );
        setCalificaciones(actualizadas);
        cerrarModal();
      } else {
        setMensaje({ texto: data.mensaje || "Error inesperado.", tipo: "danger" });
      }
    } catch (error) {
      console.error("Error al enviar respuesta:", error);
      setMensaje({ texto: "Error al conectar con el servidor.", tipo: "danger" });
    }
  };

  const renderEstrellas = (valor) => {
    const estrellas = [];
    for (let i = 1; i <= 5; i++) {
      if (valor >= i) estrellas.push(<FaStar key={i} color="#ffc107" />);
      else if (valor >= i - 0.5) estrellas.push(<FaStarHalfAlt key={i} color="#ffc107" />);
      else estrellas.push(<FaRegStar key={i} color="#ccc" />);
    }
    return estrellas;
  };

  return (
    <div className="container mt-4 d-flex flex-column justify-content-between" style={{ minHeight: "60vh" }}>
      <h3 className="mb-4">Gestión de Calificaciones</h3>

      <CuadroBusquedas
        textoBusqueda={textoBusqueda}
        manejarCambioBusqueda={(e) => setTextoBusqueda(e.target.value)}
        placeholder="Buscar por cliente, servicio o comentario..."
      />
      <div className="d-none d-md-block">
        <Table striped bordered hover responsive className="mt-3">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Servicio</th>
              <th>Calificación</th>
              <th>Comentario</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Respuesta</th>
            </tr>
          </thead>
          <tbody>
            {calificacionesPaginadas.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No hay calificaciones.</td>
              </tr>
            ) : (
              calificacionesPaginadas.map((cal) => (
                <tr key={cal.id_cali}>
                  <td>{cal.id_cali}</td>
                  <td>{cal.cliente}</td>
                  <td>{cal.servicio}</td>
                  <td>{renderEstrellas(cal.calidad_servicio)}</td>
                  <td>{cal.comentario || <em> Sin comentario.</em>}</td>
                  <td>{new Date(cal.fecha_calificacion).toLocaleDateString()}</td>
                  <td>
                    {cal.respuesta_calificacion ? (
                      <Badge bg="success">Respondido</Badge>
                    ) : (
                      <Badge bg="warning text-dark">Pendiente</Badge>
                    )}
                  </td>
                  <td>
                    {cal.respuesta_calificacion ? (
                      <span>{cal.respuesta_calificacion}</span>
                    ) : (
                      <Button size="sm" variant="primary" onClick={() => abrirModal(cal)}>
                        Responder
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      <div className="d-block d-md-none">
      {calificacionesPaginadas.map((cal) => (
        <Card key={cal.id_cali} className="mb-2 shadow-sm">
          <Card.Body>
            <Card.Title><strong>ID:</strong> {cal.id_cali}</Card.Title>
            <Card.Text><strong>Cliente:</strong> {cal.cliente}</Card.Text>
            <Card.Text><strong>Servicio:</strong> {cal.servicio}</Card.Text>
            <Card.Text><strong>Calificación:</strong>
              {renderEstrellas(cal.calidad_servicio)}
            </Card.Text>
            <Card.Text><strong>Comentario:</strong>
              {cal.comentario || <em> Sin comentario.</em>}
            </Card.Text>
            <Card.Text>
              <strong>Fecha:</strong>
              {new Date(cal.fecha_calificacion).toLocaleDateString()}
            </Card.Text>
            <Card.Text><strong>Estado:</strong> {cal.respuesta_calificacion ? (
              <Badge bg="success">Respondido</Badge>
              ) : (
              <Badge bg="warning text-dark">Pendiente</Badge>
              )}
            </Card.Text>
            <Card.Text><strong>Comentario:</strong>
              {cal.respuesta_calificacion ? (
                <span>{cal.respuesta_calificacion}</span>
              ) : (
                <Button size="sm" variant="primary" onClick={() => abrirModal(cal)}>
                  Responder
                </Button>
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>

      <div className="mt-auto">
        <Paginacion
          elementosPorPagina={elementosPorPagina}
          totalElementos={filtradas.length}
          paginaActual={paginaActual}
          establecerPaginaActual={establecerPaginaActual}
        />
      </div>

      {/* Modal para responder */}
      <Modal show={mostrarModal} onHide={cerrarModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Responder Calificación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Respuesta del empleado</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              maxLength={100}
              placeholder="Escribe tu respuesta (máx. 100 caracteres)"
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
            />
            <div className="text-end text-muted">{respuesta.length}/100</div>
          </Form.Group>
          {mensaje && (
            <Alert className="mt-3" variant={mensaje.tipo}>
              {mensaje.texto}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={enviarRespuesta}>
            Enviar Respuesta
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ControlCalificaciones;