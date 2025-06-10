// Importaciones necesarias para el componente visual
import React from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import Paginacion from '../ordenamiento/Paginacion';
import 'bootstrap/dist/css/bootstrap.min.css';

const TablaRecepciones = ({
  recepciones,
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
    return <div>Cargando recepciones...</div>; // Muestra mensaje mientras carga
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
    <div className="d-none d-md-block">
      <Table striped bordered hover responsive>
        <thead className='table-dark'>
          <tr>
            <th>ID Recepción</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Cliente</th>
            <th>Equipo</th>
            <th>Empleado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {recepciones.map((recepcion) => (
            <tr key={recepcion.id_recepcion}>
              <td>{recepcion.id_recepcion}</td>
              <td>
                {recepcion.fecha
                  ? new Date(recepcion.fecha).toLocaleDateString()
                  : 'Sin fecha'}
              </td>
              <td>{recepcion.estado_recepcion}</td>
              <td>{recepcion.cliente}</td>
              <td>{recepcion.equipo}</td>
              <td>{recepcion.empleado}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirModalEdicion(recepcion)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirModalEliminacion(recepcion)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>

    <div className="d-block d-md-none">
      {recepciones.map((recepcion) => (
        <Card key={recepcion.id_recepcion} className="mb-2 shadow-sm">
          <Card.Body>
            <Card.Title><strong>ID:</strong> {recepcion.id_recepcion}</Card.Title>
            <Card.Text>
              <strong>Fecha:</strong>
              {recepcion.fecha
              ? new Date(recepcion.fecha).toLocaleDateString()
              : 'Sin fecha'}
            </Card.Text>
            <Card.Text><strong>Estado:</strong> {recepcion.estado_recepcion}</Card.Text>
            <Card.Text><strong>Cliente:</strong> {recepcion.cliente}</Card.Text>
            <Card.Text><strong>Equipo:</strong> {recepcion.equipo}</Card.Text>
            <Card.Text><strong>Empleado:</strong> {recepcion.empleado}</Card.Text>
            <div>
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => abrirModalEdicion(recepcion)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => abrirModalEliminacion(recepcion)}
              >
                <i className="bi bi-trash"></i>
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>

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
export default TablaRecepciones;