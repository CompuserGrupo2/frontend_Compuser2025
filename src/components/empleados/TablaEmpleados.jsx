// Importaciones necesarias para el componente visual
import React from 'react';
import { Table, Button } from 'react-bootstrap';
import Paginacion from '../ordenamiento/Paginacion';
import 'bootstrap/dist/css/bootstrap.min.css';

// Declaración del componente TablaEmpleados que recibe props
const TablaEmpleados = ({
  empleados,
  cargando, 
  error,
  totalElementos,
  elementosPorPagina,
  paginaActual,
  establecerPaginaActual,
  abrirModalEliminacion,
  abrirModalEdicion
}) => {
  // Renderizado condicional según el estado recibido por props
  if (cargando) {
    return <div>Cargando empleados...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>;         // Muestra error si ocurre
  }

  // Renderizado de la tabla con los datos recibidos
  return (
    <div
    className="d-flex flex-column justify-content-between"
    style={{ minHeight: "60vh" }} // ajusta el valor si querés más o menos altura mínima
  >
    <Table striped bordered hover responsive>
      <thead className='table-dark'>
        <tr>
          <th>ID Empleado</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Cédula</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {empleados.map((empleado) => (
          <tr key={empleado.id_empleado}>
            <td>{empleado.id_empleado}</td>
            <td>{empleado.nombre}</td>
            <td>{empleado.apellido}</td>
            <td>{empleado.direccion}</td>
            <td>{empleado.telefono}</td>
            <td>{empleado.cedula}</td>
            <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirModalEdicion(empleado)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirModalEliminacion(empleado)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
          </tr>
        ))}
      </tbody>
    </Table>

    {/* Paginación fijada abajo del contenedor de la tabla */}
    <div className="mt-auto">
      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={totalElementos}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />
    </div>
  </div>
  );
};

// Exportación del componente
export default TablaEmpleados;