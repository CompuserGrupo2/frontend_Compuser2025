// Importaciones necesarias para el componente visual
import React from 'react';
import { Table, Button } from 'react-bootstrap';
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

  // Función para formatear el total con el signo C$
  const formatearTotal = (total) => {
    return `C$ ${total.toLocaleString('es-NI', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const diagnosticosOrdenados = [...diagnosticos].sort((a, b) => a.id_diag - b.id_diag);

  // Renderizado de la tabla con los datos recibidos
  return (
    <div
    className="d-flex flex-column justify-content-between"
    style={{ minHeight: "60vh" }} // ajusta el valor si querés más o menos altura mínima
    >
    <Table striped bordered hover responsive>
      <thead className='table-dark'>
        <tr>
          <th>ID Diagnóstico</th>
          <th>Cliente</th>
          <th>Equipo</th>
          <th>Descripción</th>
          <th>Empleado</th>
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
            <td>{formatearTotal(diagnostico.total)}</td>
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