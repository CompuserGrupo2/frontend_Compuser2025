import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const EdicionRecepcion = ({
  mostrarModalEdicion,
  setMostrarModalEdicion,
  recepcionEditada,
  manejarCambioInputEdicion,
  actualizarRecepcion,
  errorCarga,
  clientes,
  equipos,
  empleados
}) => {
  return (
    <Modal show={mostrarModalEdicion} onHide={() => setMostrarModalEdicion(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Recepción</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formFechaRecepcion">
            <Form.Label>Fecha de Recepción</Form.Label>
            <br></br>
            <Form.Control
              type="date"
              name="fecha"
              value={recepcionEditada?.fecha || ''}
              onChange={manejarCambioInputEdicion}
              className="form-control"
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formEstadoRecepcion">
            <Form.Label>Estado de Recepción</Form.Label>
            <Form.Control
              type="text"
              name="estado_recepcion"
              value={recepcionEditada?.estado_recepcion || ''}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el estado de recepción (máx. 30 caracteres)"
              maxLength={30}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formClienteRecepcion">
            <Form.Label>Cliente</Form.Label>
            <Form.Select
              name="id_cliente"
              value={recepcionEditada?.id_cliente || ''}
              onChange={manejarCambioInputEdicion}
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
              value={recepcionEditada?.id_equipocomp || ''}
              onChange={manejarCambioInputEdicion}
              required
            >
              <option value="">Selecciona un equipo computarizado</option>
              {equipos.map((equipo) => (
                <option key={equipo.id_equipocomp} value={equipo.id_equipocomp}>
                  {equipo.tipo} {equipo.marca} {equipo.modelo}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formEmpleadoRecepcion">
            <Form.Label>Empleado</Form.Label>
            <Form.Select
              name="id_empleado"
              value={recepcionEditada?.id_empleado || ''}
              onChange={manejarCambioInputEdicion}
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
        <Button variant="secondary" onClick={() => {
          setMostrarModalEdicion(false);
        }}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={actualizarRecepcion}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EdicionRecepcion;