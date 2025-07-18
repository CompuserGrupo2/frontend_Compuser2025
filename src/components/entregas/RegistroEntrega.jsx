import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const RegistroEntrega = ({
  mostrarModal,
  setMostrarModal,
  nuevaEntrega,
  manejarCambioInput,
  agregarEntrega,
  errorCarga,
  equipos,
  clientes, // Lista de clientes obtenidos
  empleados
}) => {

  const validacionFormulario = () => {
    return(
      nuevaEntrega.estado_entrega.trim() !== "" &&
      nuevaEntrega.id_equipocomp.trim() !== "" &&
      nuevaEntrega.id_cliente.trim() !== "" &&
      nuevaEntrega.id_empleado.trim() !== "" 
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
        <Modal.Title>Agregar Nueva Entrega</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>

        <Form.Group className="mb-3" controlId="formFechaEntrega">
            <Form.Label>Fecha de Entrega</Form.Label>
            <br></br>
            <Form.Control
              type="date"
              name="fecha"
              value={nuevaEntrega.fecha}
              onChange={manejarCambioInput}
              className="form-control"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEstadoEntrega">
            <Form.Label>Estado de Entrega</Form.Label>
            <Form.Control
              type="text"
              name="estado_entrega"
              value={nuevaEntrega.estado_entrega}
              onChange={manejarCambioInput}
              placeholder="Ingresa el estado de entrega (máx. 100 caracteres)"
              maxLength={100}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formClienteEntrega">
            <Form.Label>Cliente</Form.Label>
            <Form.Select
              name="id_cliente"
              value={nuevaEntrega.id_cliente}
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

          <Form.Group className="mb-3" controlId="formEquipoEntrega">
            <Form.Label>Equipo Computarizado</Form.Label>
            <Form.Select
              name="id_equipocomp"
              value={nuevaEntrega.id_equipocomp}
              onChange={manejarCambioInput}
              onKeyDown={validarLetras}
              required
            >
              <option value="">Selecciona un equipo computarizado</option>
              {equipos.map((equipo) => (
                <option key={equipo.id_equipocomp} value={equipo.id_equipocomp}>
                  {equipo.tipo} {equipo.marca} {equipo.modelo} {equipo.color}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmpleadEntrega">
            <Form.Label>Empleado</Form.Label>
            <Form.Select
              name="id_empleado"
              value={nuevaEntrega.id_empleado}
              onChange={manejarCambioInput}
              onKeyDown={validarLetras}
              required
            >
              <option value="">Selecciona un empleado</option>
              {empleados.map((empleado) => (
                <option key={empleado.id_empleado} value={empleado.id_empleado}>
                  {empleado.nombre} {empleado.apellido}
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
        <Button variant="primary" disabled={!validacionFormulario()} onClick={agregarEntrega}>
          Guardar Entrega
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistroEntrega;