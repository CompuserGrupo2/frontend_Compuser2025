import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const EdicionEmpleado = ({
  mostrarModalEdicion,
  setMostrarModalEdicion,
  empleadoEditado,
  manejarCambioInputEdicion,
  actualizarEmpleado,
  errorCarga,
}) => {
  return (
    <Modal show={mostrarModalEdicion} onHide={() => setMostrarModalEdicion(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formNombreEmpleado">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={empleadoEditado?.nombre || ''}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el nombre (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formApellidoEmpleado">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              value={empleadoEditado?.apellido || ''}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el apellido (máx. 30 caracteres)"
              maxLength={30}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDireccionEmpleado">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              value={empleadoEditado?.direccion || ''}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa la dirección (máx. 40 caracteres)"
              maxLength={40}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTelefonoEmpleado">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              value={empleadoEditado?.telefono || ''}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el teléfono (máx. 8 caracteres)"
              maxLength={8}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCedulaEmpleado">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              value={empleadoEditado?.cedula || ''}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa la cédula (máx. 20 caracteres)"
              maxLength={20}
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
        <Button variant="primary" onClick={actualizarEmpleado}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EdicionEmpleado;