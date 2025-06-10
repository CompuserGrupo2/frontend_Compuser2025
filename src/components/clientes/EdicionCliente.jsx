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

  const validacionFormulario = () => {
    return(
      clienteEditado?.nombre.trim() !== "" &&
      clienteEditado?.apellido.trim() !== "" &&
      clienteEditado?.direccion.trim() !== "" &&
      clienteEditado?.tipo_cli.trim() !== "" &&
      clienteEditado?.telefono.trim() !== "" &&
      clienteEditado?.cedula.trim() !== "" 
    );
  };

  const validarLetras = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    // Permitir solo letras {A-Z, a-z}
    if(
      (charCode < 65 || charCode > 90) && //Letras mayúsculas
      (charCode < 97 || charCode > 122) && //Letras minúsculas
      charCode !== 8 && //Retroceso
      charCode !== 46 && //Borrar
      charCode !== 9 //Tab
    ) {
      e.preventDefault(); //Evita que se escriba el carácter
    }
  };

  const validarNumeros = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    // Permitir solo números (0-9), retroceso, borrar y tabb
    if(
      (charCode < 48 || charCode > 57) && // Números (0-9)
      charCode !== 8 && //Retroceso
      charCode !== 46 && //Borrar
      charCode !== 9 //Tab
    ) {
      e.preventDefault(); //Evita que se escriba el carácter
    }
  };

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
              onKeyDown={validarLetras}
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
              onKeyDown={validarLetras}
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
              onKeyDown={validarLetras}
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
              onKeyDown={validarNumeros}
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
        <Button variant="primary" disabled={!validacionFormulario()} onClick={actualizarCliente}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EdicionCliente;