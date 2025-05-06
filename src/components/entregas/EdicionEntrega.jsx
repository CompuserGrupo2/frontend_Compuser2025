import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const EdicionEntrega = ({
  mostrarModalEdicion,
  setMostrarModalEdicion,
  entregaEditada,
  manejarCambioInputEdicion,
  actualizarEntrega,
  errorCarga,
  equipos,
  clientes,
  empleados
}) => {
  return (
    <Modal show={mostrarModalEdicion} onHide={() => setMostrarModalEdicion(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Entrega</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formFechaEntrega">
            <Form.Label>Fecha de Entrega</Form.Label>
            <br></br>
            <Form.Control
              type="date"
              name="fecha"
              value={entregaEditada?.fecha || ''}
              onChange={manejarCambioInputEdicion}
              className="form-control"
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formEstadoEntrega">
            <Form.Label>Estado de Recepción</Form.Label>
            <Form.Control
              type="text"
              name="estado_entrega"
              value={entregaEditada?.estado_entrega || ''}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el estado de entrega (máx. 30 caracteres)"
              maxLength={30}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formClienteEntrega">
            <Form.Label>Cliente</Form.Label>
            <Form.Select
              name="id_cliente"
              value={entregaEditada?.id_cliente || ''}
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
          
          <Form.Group className="mb-3" controlId="formEquipoEntrega">
            <Form.Label>Equipo Computarizado</Form.Label>
            <Form.Select
              name="id_equipocomp"
              value={entregaEditada?.id_equipocomp || ''}
              onChange={manejarCambioInputEdicion}
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
          
          <Form.Group className="mb-3" controlId="formEmpleadoEntrega">
            <Form.Label>Empleado</Form.Label>
            <Form.Select
              name="id_empleado"
              value={entregaEditada?.id_empleado || ''}
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
        <Button variant="primary" onClick={actualizarEntrega}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EdicionEntrega;