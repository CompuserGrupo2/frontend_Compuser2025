import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const RegistroServicio = ({
  mostrarModal,
  setMostrarModal,
  nuevoServicio,
  manejarCambioInput,
  agregarServicio,
  errorCarga,
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Servicio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formDescripcionServicio">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="textarea"
              rows={3}
              name="descripcion"
              value={nuevoServicio.descripcion}
              onChange={manejarCambioInput}
              placeholder="Ingresa la descripción del servicio (máx. 40 caracteres)"
              maxLength={40}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCostoServicio">
            <Form.Label>Costo</Form.Label>
            <Form.Control
              type="number"
              name="costo"
              value={nuevoServicio.costo}
              onChange={manejarCambioInput}
              placeholder="Ingresa el costo del servicio"
              min={0}
              step={0.01}
              required
            />
          </Form.Group>
          {errorCarga && (
            <div className="text-danger mt-2">{errorCarga}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setMostrarModal(false);
        }}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={agregarServicio}>
          Guardar Servicio
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistroServicio;