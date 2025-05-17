import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const RegistroRecepcion = ({
  mostrarModal,
  setMostrarModal,
  nuevaRecepcion,
  manejarCambioInput,
  agregarRecepcion,
  errorCarga,
  clientes, // Lista de clientes obtenidos
  equipos,
  empleados
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nueva Recepción</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>

        <Form.Group className="mb-3" controlId="formFechaRecepcion">
            <Form.Label>Fecha de Recepción</Form.Label>
            <br></br>
            <Form.Control
              type="date"
              name="fecha"
              value={nuevaRecepcion.fecha}
              onChange={manejarCambioInput}
              className="form-control"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEstadoRecepcion">
            <Form.Label>Estado de Recepción</Form.Label>
            <Form.Control
              type="text"
              name="estado_recepcion"
              value={nuevaRecepcion.estado_recepcion}
              onChange={manejarCambioInput}
              placeholder="Ingresa el estado de recepción (máx. 100 caracteres)"
              maxLength={100}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formClienteRecepcion">
            <Form.Label>Cliente</Form.Label>
            <Form.Select
              name="id_cliente"
              value={nuevaRecepcion.id_cliente}
              onChange={manejarCambioInput}
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

          <Form.Group className="mb-3" controlId="formEquipoRecepcion">
            <Form.Label>Equipo Computarizado</Form.Label>
            <Form.Select
              name="id_equipocomp"
              value={nuevaRecepcion.id_equipocomp}
              onChange={manejarCambioInput}
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

          <Form.Group className="mb-3" controlId="formEmpleadoRecepcion">
            <Form.Label>Empleado</Form.Label>
            <Form.Select
              name="id_empleado"
              value={nuevaRecepcion.id_empleado}
              onChange={manejarCambioInput}
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
        <Button variant="primary" onClick={agregarRecepcion}>
          Guardar Recepción
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistroRecepcion;