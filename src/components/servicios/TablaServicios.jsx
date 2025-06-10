// Importaciones necesarias para el componente visual
import React from 'react';
import { Table, Button, Card } from 'react-bootstrap';
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
  abrirModalEdicion,
  generarPDFDetalleServicio
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
    <div className="d-none d-md-block">
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
            <td>C$ {servicio.costo}</td>
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
                variant="outline-success"
                size="sm"
                className="me-2"
                onClick={() => generarPDFDetalleServicio(servicio)}
              >
                <i className="bi bi-filetype-pdf"></i>
              </Button>
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
    </div>

    <div className="d-block d-md-none">
      {servicios.map((servicio) => (
        <Card key={servicio.id_ser} className="mb-2 shadow-sm">
          <Card.Body>
            <Card.Title>{servicio.descripcion}</Card.Title>
            <Card.Text><strong>ID:</strong> {servicio.id_ser}</Card.Text>
            {servicio.imagen ? (
              <Card.Img
                variant="top"
                src={`data:image/png;base64,${servicio.imagen}`}
                alt={servicio.descripcion}
                style={{ height: '300px', objectFit: 'cover', width: '100%' }}
              />
            ) : (
              <Card.Text><em>Sin imagen</em></Card.Text>
            )}
            <Card.Text><strong>Costo:</strong> {servicio.costo}</Card.Text>
            <div>
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
                onClick={() => abrirModalEliminacion(servicio)}
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
export default TablaServicios;