import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const EdicionEquipo = ({
  mostrarModalEdicion,
  setMostrarModalEdicion,
  equipoEditado,
  manejarCambioInputEdicion,
  actualizarEquipo,
  errorCarga,
  clientes
}) => {

  const validacionFormulario = () => {
    return(
      equipoEditado?.tipo.trim() !== "" &&
      equipoEditado?.marca.trim() !== "" &&
      equipoEditado?.color.trim() !== "" &&
      equipoEditado?.modelo.trim() !== "" &&
      equipoEditado?.cliente.trim() !== "" 
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

  return (
    <Modal show={mostrarModalEdicion} onHide={() => setMostrarModalEdicion(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Equipo Computarizado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formTipoEquipo">
            <Form.Label>Tipo de Equipo</Form.Label>
            <Form.Control
              type="text"
              name="tipo"
              value={equipoEditado?.tipo || ''}
              onChange={manejarCambioInputEdicion}
              onKeyDown={validarLetras}
              placeholder="Ingresa el tipo (máx. 40 caracteres)"
              maxLength={40}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formMarcaEquipo">
            <Form.Label>Marca</Form.Label>
            <Form.Control
              type="text"
              name="marca"
              value={equipoEditado?.marca || ''}
              onChange={manejarCambioInputEdicion}
              onKeyDown={validarLetras}
              placeholder="Ingresa la marca (máx. 30 caracteres)"
              maxLength={30}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formColorEquipo">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              name="color"
              value={equipoEditado?.color || ''}
              onChange={manejarCambioInputEdicion}
              onKeyDown={validarLetras}
              placeholder="Ingresa el color (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formModeloEquipo">
            <Form.Label>Modelo</Form.Label>
            <Form.Control
              type="text"
              name="modelo"
              value={equipoEditado?.modelo || ''}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el modelo (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formClienteEquipo">
            <Form.Label>Cliente</Form.Label>
            <Form.Select
              name="id_cliente"
              value={equipoEditado?.id_cliente || ''}
              onChange={manejarCambioInputEdicion}
              onKeyDown={validarLetras}
              required
            >
              <option value="">Selecciona un cliente</option>
                {Array.isArray(clientes) && clientes.map((cliente) => (
                <option key={cliente.id_cliente} value={cliente.id_cliente}>
                {cliente.nombre} {cliente.apellido}
              </option>
              ))}
            </Form.Select>
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
        <Button variant="primary" disabled={!validacionFormulario()} onClick={actualizarEquipo}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EdicionEquipo;