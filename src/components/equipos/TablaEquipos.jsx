// Importaciones necesarias para el componente visual
import React from 'react';
import { Table, Button } from 'react-bootstrap';
import Paginacion from '../ordenamiento/Paginacion';
import 'bootstrap/dist/css/bootstrap.min.css';

const TablaEquipos = ({
  equipos,
  cargando,
  error,
  totalElementos,
  elementosPorPagina,
  paginaActual,
  establecerPaginaActual,
  abrirModalEliminacion,
  abrirModalEdicion
}) => {
  if (cargando) {
    return <div>Cargando equipos computarizados...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>;     // Muestra error si ocurre
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
          <th>ID Equipo</th>
          <th>Tipo</th>
          <th>Marca</th>
          <th>Color</th>
          <th>Modelo</th>
          <th>Cliente</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {equipos.map((equipo) => (
          <tr key={equipo.id_equipocomp}>
            <td>{equipo.id_equipocomp}</td>
            <td>{equipo.tipo}</td>
            <td>{equipo.marca}</td>
            <td>{equipo.color}</td>
            <td>{equipo.modelo}</td>
            <td>{equipo.cliente}</td>
            <td>
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => abrirModalEdicion(equipo)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                className="me-2"
                onClick={() => abrirModalEliminacion(equipo)}
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
export default TablaEquipos;