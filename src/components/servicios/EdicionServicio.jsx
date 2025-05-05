import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const EdicionServicio = ({
  mostrarModalEdicion,
  setMostrarModalEdicion,
  servicioEditado,
  manejarCambioInputEdicion,
  actualizarServicio,
  errorCarga,
}) => {
  return (
    <Modal show={mostrarModalEdicion} onHide={() => setMostrarModalEdicion(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Servicio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formDescripcionServicio">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="textarea"
              rows={3}
              name="descripcion"
              value={servicioEditado?.descripcion || ''}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa la descripción del servicio (máx. 40 caracteres)"
              maxLength={40}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCostoServicio">
            <Form.Label>Costo</Form.Label>
            <Form.Control
              type="number"
              name="costo"
              value={servicioEditado?.costo || ''}
              onChange={manejarCambioInputEdicion}
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
          setMostrarModalEdicion(false);
        }}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={actualizarServicio}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EdicionServicio;