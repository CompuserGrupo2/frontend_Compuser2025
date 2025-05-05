import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const EdicionCliente = ({
  mostrarModalEdicion,
  setMostrarModalEdicion,
  clienteEditado,
  manejarCambioInputEdicion,
  actualizarCliente,
  errorCarga,
}) => {
  return (
    <Modal show={mostrarModalEdicion} onHide={() => setMostrarModalEdicion(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formNombreCliente">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={clienteEditado?.nombre || ''}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el nombre (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formApellidoCliente">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              value={clienteEditado?.apellido || ''}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el apellido (máx. 30 caracteres)"
              maxLength={30}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDireccionCliente">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              value={clienteEditado?.direccion || ''}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa la dirección (máx. 40 caracteres)"
              maxLength={40}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTipoCliente">
            <Form.Label>Tipo de Cliente</Form.Label>
            <Form.Control
              type="text"
              name="tipo_cli"
              value={clienteEditado?.tipo_cli || ''}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el tipo de cliente (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTelefonoCliente">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              value={clienteEditado?.telefono || ''}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el teléfono (máx. 8 caracteres)"
              maxLength={8}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCedulaCliente">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              value={clienteEditado?.cedula || ''}
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
        <Button variant="primary" onClick={actualizarCliente}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EdicionCliente;