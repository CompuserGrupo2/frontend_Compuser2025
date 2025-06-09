import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const RegistroEquipo = ({
  mostrarModal,
  setMostrarModal,
  nuevoEquipo,
  manejarCambioInput,
  agregarEquipo,
  errorCarga,
  clientes // Lista de clientes obtenidos
}) => {

  const validacionFormulario = () => {
    return(
      nuevoEquipo.tipo.trim() !== "" &&
      nuevoEquipo.marca.trim() !== "" &&
      nuevoEquipo.color.trim() !== "" &&
      nuevoEquipo.modelo.trim() !== "" &&
      nuevoEquipo.id_cliente.trim() !== "" 
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
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Equipo Computarizado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formTipoEquipo">
            <Form.Label>Tipo de Equipo</Form.Label>
            <Form.Control
              type="text"
              name="tipo"
              value={nuevoEquipo.tipo}
              onChange={manejarCambioInput}
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
              value={nuevoEquipo.marca}
              onChange={manejarCambioInput}
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
              value={nuevoEquipo.color}
              onChange={manejarCambioInput}
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
              value={nuevoEquipo.modelo}
              onChange={manejarCambioInput}
              placeholder="Ingresa el modelo (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formClienteEquipo">
            <Form.Label>Cliente</Form.Label>
            <Form.Select
              name="id_cliente"
              value={nuevoEquipo.id_cliente}
              onChange={manejarCambioInput}
              onKeyDown={validarLetras}
              required
            >
              <option value="">Selecciona un cliente</option>
              {clientes.map((cliente) => (
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
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" disabled={!validacionFormulario()} onClick={agregarEquipo}>
          Guardar Equipo
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistroEquipo;
