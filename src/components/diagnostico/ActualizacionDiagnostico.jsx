// ActualizacionDiagnostico.jsx
import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Table, Row, Col, FormControl } from "react-bootstrap";
import AsyncSelect from 'react-select/async';
import "react-datepicker/dist/react-datepicker.css";

const ActualizacionDiagnostico = ({
  mostrarModal,
  setMostrarModal,
  diagnostico,
  detallesDiagnostico,
  setDetallesDiagnostico,
  actualizarDiagnostico,
  errorCarga,
  equipos,
  clientes,
  empleados,
  servicios
}) => {
  const [diagnosticoActualizado, setDiagnosticoActualizado] = useState({
    id_diag: diagnostico?.id_diag || '',
    descripcion: diagnostico?.descripcion || '',
    id_equipocomp: diagnostico?.id_equipocomp || '',
    id_cliente: diagnostico?.id_cliente || '',
    id_empleado: diagnostico?.id_empleado || '',
    fecha: diagnostico?.fecha ? new Date(diagnostico.fecha) : new Date(),
    total: diagnostico?.total || 0
  });
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [nuevoDetalle, setNuevoDetalle] = useState({ costo: '', id_ser: ''});
  const [editandoDetalle, setEditandoDetalle] = useState(null);

  // Calcular total
  const totalDiagnostico = detallesDiagnostico.reduce((sum, detalle) => sum + (detalle.costo), 0);

  useEffect(() => {
    if (diagnostico && clientes.length > 0 && empleados.length > 0 && equipos.length > 0) {
      const cliente = clientes.find(c => c.id_cliente === parseInt(diagnostico.id_cliente));
      const empleado = empleados.find(e => e.id_empleado === parseInt(diagnostico.id_empleado));
      const equipo = equipos.find(eq => eq.id_equipocomp === parseInt(diagnostico.id_equipocomp));
      if (cliente) {
        setClienteSeleccionado({ value: cliente.id_cliente, label: `${cliente.nombre} ${cliente.apellido}` });
        setDiagnosticoActualizado(prev => ({ ...prev, id_cliente: cliente.id_cliente }));
      }
      if (empleado) {
        setEmpleadoSeleccionado({ value: empleado.id_empleado, label: `${empleado.nombre} ${empleado.apellido}` });
        setDiagnosticoActualizado(prev => ({ ...prev, id_empleado: empleado.id_empleado }));
      }
      if (equipo) {
        setEquipoSeleccionado({ value: equipo.id_equipocomp, label: `${equipo.tipo} ${equipo.marca} ${equipo.modelo} ${equipo.color}` });
        setDiagnosticoActualizado(prev => ({ ...prev, id_equipocomp: equipo.id_equipocomp }));
      }
      setDiagnosticoActualizado(prev => ({
        ...prev,
        id_diag: diagnostico.id_diag || '',
        descripcion: diagnostico.descripcion || '',
        fecha: diagnostico?.fecha ? new Date(diagnostico.fecha) : new Date(),
        total: parseFloat(diagnostico.total) || 0
      }));
    }
  }, [diagnostico, clientes, empleados, equipos, servicios]);


  // Cargar opciones para AsyncSelect
  const cargarClientes = (inputValue, callback) => {
    const filtrados = clientes.filter(cliente =>
      `${cliente.nombre} ${cliente.apellido}`.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filtrados.map(cliente => ({
      value: cliente.id_cliente,
      label: `${cliente.nombre} ${cliente.apellido}`
    })));
  };

  const cargarEmpleados = (inputValue, callback) => {
    const filtrados = empleados.filter(empleado =>
      `${empleado.nombre} ${empleado.apellido}`.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filtrados.map(empleado => ({
      value: empleado.id_empleado,
      label: `${empleado.nombre} ${empleado.apellido}`
    })));
  };

  const cargarEquipos = (inputValue, callback) => {
    const filtrados = equipos.filter(equipo =>
      `${equipo.tipo} ${equipo.marca} ${equipo.modelo} ${equipo.color} ${equipo.cliente}`.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filtrados.map(equipo => ({
      value: equipo.id_equipocomp,
      label: `${equipo.tipo} ${equipo.marca} ${equipo.modelo} ${equipo.color} ${equipo.cliente}`
    })));
  };

  const cargarServicios = (inputValue, callback) => {
    const filtrados = servicios.filter(servicio =>
      servicio.descripcion.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filtrados.map(servicio => ({
      value: servicio.id_ser,
      label: servicio.descripcion,
      precio: servicio.costo
    })));
  };

  // Manejar cambios en los selectores
  const manejarCambioCliente = (seleccionado) => {
    setClienteSeleccionado(seleccionado);
    setDiagnosticoActualizado(prev => ({ ...prev, id_cliente: seleccionado ? seleccionado.value : '' }));
  };

  const manejarCambioEmpleado = (seleccionado) => {
    setEmpleadoSeleccionado(seleccionado);
    setDiagnosticoActualizado(prev => ({ ...prev, id_empleado: seleccionado ? seleccionado.value : '' }));
  };

  const manejarCambioEquipo = (seleccionado) => {
    setEquipoSeleccionado(seleccionado);
    setDiagnosticoActualizado(prev => ({ ...prev, id_equipocomp: seleccionado ? seleccionado.value : '' }));
  };

  const manejarCambioServicio = (seleccionado) => {
    setServicioSeleccionado(seleccionado);
    setNuevoDetalle(prev => ({
      ...prev,
      id_ser: seleccionado ? seleccionado.value : '',
      costo: seleccionado ? seleccionado.precio : ''
    }));
  };

  // Manejar cambios en el detalle
  const manejarCambioDiagnostico = (e) => {
    const { name, value } = e.target;
    setDiagnosticoActualizado(prev => ({ ...prev, [name]: value }));
  };


  // Manejar cambios en el detalle
  const manejarCambioDetalle = (e) => {
    const { name, value } = e.target;
    setNuevoDetalle(prev => ({ ...prev, [name]: value }));
  };

  // Agregar detalle a la lista
  const manejarAgregarDetalle = () => {
    if (!nuevoDetalle.id_ser || !nuevoDetalle.costo) {
      alert("Por favor, selecciona un servicio valido.");
      return;
    }
    
    // Validación: evitar duplicados
    if (detallesDiagnostico.some(d => d.id_ser === nuevoDetalle.id_ser)) {
      alert("Este servicio ya fue agregado.");
      return;
    }

    setDetallesDiagnostico(prev => [...prev, {
      id_ser: nuevoDetalle.id_ser,
      descripcion: servicioSeleccionado.label,
      costo: parseFloat(nuevoDetalle.costo)
    }]);
    setNuevoDetalle({ id_ser: '', costo: '' });
    setServicioSeleccionado(null);
  };

  // Eliminar detalle
  const eliminarDetalle = (index) => {
    setDetallesDiagnostico(prev => prev.filter((_, i) => i !== index));
  };

  // Iniciar edición de detalle
  const iniciarEdicionDetalle = (index, detalle) => {
    setEditandoDetalle({ index, detalle });
    setNuevoDetalle({
      id_ser: detalle.id_ser,
      costo: detalle.costo.toString()
    });
    setServicioSeleccionado({
      value: detalle.id_ser,
      label: detalle.descripcion,
      costo: detalle.costo
    });
  };

  // Guardar detalle editado
  const guardarEdicionDetalle = () => {
    if (!editandoDetalle) return;
    if (!nuevoDetalle.id_ser ||  !nuevoDetalle.costo) {
      alert("Por favor, selecciona un servicio válido.");
      return;
    }

    // Validación: evitar duplicados
    if (detallesDiagnostico.some(d => d.id_ser === nuevoDetalle.id_ser)) {
      alert("Este servicio ya fue agregado.");
      return;
    }

    const nuevosDetalles = [...detallesDiagnostico];
    nuevosDetalles[editandoDetalle.index] = {
      id_ser: nuevoDetalle.id_ser,
      descripcion: servicioSeleccionado.label,
      costo: parseFloat(nuevoDetalle.costo)
    };
    setDetallesDiagnostico(nuevosDetalles);
    setEditandoDetalle(null);
    setNuevoDetalle({ id_ser: '', costo: '' });
    setServicioSeleccionado(null);
  };

  return (
    <Modal
      show={mostrarModal}
      onHide={() => {
        setMostrarModal(false);
        setNuevoDetalle({ id_ser: '', costo: '' });
        setServicioSeleccionado(null);
        setEditandoDetalle(null);
      }}
      fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Diagnóstico</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col xs={12} sm={12} md={4} lg={4}>
              <Form.Group className="mb-3" controlId="formCliente">
                <Form.Label>Cliente</Form.Label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={cargarClientes}
                  onChange={manejarCambioCliente}
                  value={clienteSeleccionado}
                  placeholder="Buscar cliente..."
                  isClearable
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              <Form.Group className="mb-3" controlId="formEquipo">
                <Form.Label>Equipo Computarizado</Form.Label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={cargarEquipos}
                  onChange={manejarCambioEquipo}
                  value={equipoSeleccionado}
                  placeholder="Buscar equipo..."
                  isClearable
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              <Form.Group className="mb-3" controlId="formEmpleado">
                <Form.Label>Empleado</Form.Label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={cargarEmpleados}
                  onChange={manejarCambioEmpleado}
                  value={empleadoSeleccionado}
                  placeholder="Buscar empleado..."
                  isClearable
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={3} lg={3}>
              <Form.Group className="mb-3" controlId="formDescripcion">
                <Form.Label>Descripción</Form.Label>
                <FormControl
                  type="text"
                  name="descripcion"
                  value={diagnosticoActualizado.descripcion}
                  onChange={manejarCambioDiagnostico}
                  placeholder="Ingresa la descripción (máx. 100 caracteres)"
                  maxLength={100}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={3} lg={3}>
              <Form.Group className="mb-3" controlId="formFecha">
                <Form.Label>Fecha de Diagnóstico</Form.Label>
                <br />
                <Form.Control
                  type="date"
                  name="fecha"
                  value={diagnosticoActualizado.fecha}
                  onChange={manejarCambioDiagnostico}
                  className="form-control"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <hr />

          <h5>{editandoDetalle ? "Editar Detalle de Diagnóstico" : "Agregar Detalle de Diagnóstico"}</h5>
          <Row>
            <Col xs={12} sm={12} md={4} lg={4}>
              <Form.Group className="mb-3" controlId="formServicio">
                <Form.Label>Servicio</Form.Label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={cargarServicios}
                  onChange={manejarCambioServicio}
                  value={servicioSeleccionado}
                  placeholder="Buscar servicio..."
                  isClearable
                />
              </Form.Group>
            </Col>
            <Col xs={7} sm={8} md={3} lg={3}>
              <Form.Group className="mb-3" controlId="formCosto">
                <Form.Label>Costo del Servicio</Form.Label>
                <FormControl
                  type="number" 
                  name="costo"
                  value={nuevoDetalle.costo}
                  disabled
                  placeholder="Automático"
                />
              </Form.Group>
            </Col>
            <Col xs={5} sm={4} md={2} lg={2} className="d-flex align-items-center mt-3">
              {editandoDetalle ? (
                <Button style={{ width: '100%' }} variant="primary" onClick={guardarEdicionDetalle}>
                  Guardar Cambios
                </Button>
              ) : (
                <Button style={{ width: '100%' }} variant="success" onClick={manejarAgregarDetalle}>
                  Agregar Servicio
                </Button>
              )}
            </Col>
          </Row>

          {detallesDiagnostico.length > 0 && (
            <>
              <h5 className="mt-4">Detalles Agregados</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Servicio</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {detallesDiagnostico.map((detalle, index) => (
                    <tr key={index}>
                      <td>{detalle.descripcion}</td>
                      <td>{detalle.costo.toFixed(2)}</td>
                      <td>
                        <Button variant="warning" size="sm" onClick={() => iniciarEdicionDetalle(index, detalle)} className="me-2">
                          Editar
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => eliminarDetalle(index)}>
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="1" className="text-end"><strong>Total:</strong></td>
                    <td><strong>{totalDiagnostico.toFixed(2)}</strong></td>
                  </tr>
                </tfoot>
              </Table>
            </>
          )}

          {errorCarga && (
            <div className="text-danger mt-2">{errorCarga}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setMostrarModal(false);
          setNuevoDetalle({ id_ser: '', costo: ''});
          setServicioSeleccionado(null);
          setEditandoDetalle(null);
        }}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={() => actualizarDiagnostico(diagnosticoActualizado, detallesDiagnostico)}>
          Actualizar Diagnóstico
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ActualizacionDiagnostico;