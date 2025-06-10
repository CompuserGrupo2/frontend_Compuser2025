// Importaciones necesarias para el componente visual
import React from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Paginacion from '../ordenamiento/Paginacion';

const TablaDiagnostico = ({ diagnosticos,
  cargando,
  error,
  obtenerDetalles,
  totalElementos,
  elementosPorPagina,
  paginaActual,
  establecerPaginaActual,
  abrirModalEliminacion,
  abrirModalActualizacion
}) => {
  if (cargando) {
    return <div>Cargando diagnóstico...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>;     // Muestra error si ocurre
  }


  const diagnosticosOrdenados = [...diagnosticos].sort((a, b) => a.id_diag - b.id_diag);

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
            <th>ID</th>
            <th>Cliente</th>
            <th>Equipo</th>
            <th>Descripción</th>
            <th>Empleado</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {diagnosticosOrdenados.map((diagnostico) => (
            <tr key={`${diagnostico.id_diag}`}>
              <td>{diagnostico.id_diag}</td>
              <td>{diagnostico.cliente}</td>
              <td>{diagnostico.equipo}</td>
              <td>{diagnostico.descripcion}</td>
              <td>{diagnostico.empleado}</td>
              <td>
                {diagnostico.fecha
                  ? new Date(diagnostico.fecha).toLocaleDateString()
                  : 'Sin fecha'}
              </td>
              <td>C${diagnostico.total != null ? diagnostico.total.toFixed(2) : '0.00'}</td>
              <td>
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => obtenerDetalles(diagnostico.id_diag)}
                >
                  <i className="bi bi-list-ul"></i>
                </Button>

                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => abrirModalEliminacion(diagnostico)}
                >
                  <i className="bi bi-trash"></i>
                </Button>

                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirModalActualizacion(diagnostico)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>

    <div className="d-block d-md-none">
      {diagnosticos.map((diagnostico) => (
        <Card key={diagnostico.id_diag} className="mb-2 shadow-sm">
          <Card.Body>
            <Card.Title><strong>ID:</strong> {diagnostico.id_diag}</Card.Title>
            <Card.Text><strong>Cliente:</strong> {diagnostico.cliente}</Card.Text>
            <Card.Text><strong>Equipo:</strong> {diagnostico.equipo}</Card.Text>
            <Card.Text><strong>Descripción:</strong> {diagnostico.descripcion}</Card.Text>
            <Card.Text><strong>Empleado:</strong> {diagnostico.empleado}</Card.Text>
            <Card.Text>
              <strong>Fecha:</strong>
              {diagnostico.fecha
              ? new Date(diagnostico.fecha).toLocaleDateString()
              : 'Sin fecha'}
            </Card.Text>
            <Card.Text> <strong>Fecha:</strong> C${diagnostico.total != null ? diagnostico.total.toFixed(2) : '0.00'}</Card.Text>
            <div>
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => abrirModalEdicion(diagnostico)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => abrirModalEliminacion(diagnostico)}
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
export default TablaDiagnostico;