// Importaciones necesarias para el componente visual
import React from 'react';
import { Table, Button } from 'react-bootstrap';
import Paginacion from '../ordenamiento/Paginacion';
import 'bootstrap/dist/css/bootstrap.min.css';

// Declaración del componente TablaServicios que recibe props
const TablaServicios = ({ servicios,
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
    return <div>Cargando servicios...</div>; // Muestra mensaje mientras carga
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
          <th>ID Servicio</th>
          <th>Descripción</th>
          <th>Costo</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {servicios.map((servicio) => (
          <tr key={servicio.id_ser}>
            <td>{servicio.id_ser}</td>
            <td>{servicio.descripcion}</td>
            <td>{servicio.costo}</td>
            <td>
              {servicio.imagen ? (
                <img
                  src={`data:image/png;base64,${servicio.imagen}`}
                  alt={servicio.descripcion}
                  style={{ maxWidth: '100px' }}
                />
              ) : (
                'Sin imagen'
              )}
            </td>
            <td>
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => abrirModalEdicion(servicio)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                className="me-2"
                onClick={() => abrirModalEliminacion(servicio)}
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
export default TablaServicios;