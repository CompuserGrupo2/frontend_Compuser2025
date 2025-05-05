// Importaciones necesarias para el componente visual
import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TablaDiagnostico = ({ diagnosticos, cargando, error }) => {
  if (cargando) {
    return <div>Cargando diagnóstico...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>;     // Muestra error si ocurre
  }

  // Renderizado de la tabla con los datos recibidos
  return (
    <Table striped bordered hover responsive>
      <thead className='table-dark'>
        <tr>
          <th>ID Diagnóstico</th>
          <th>ID Detalle</th>
          <th>Cliente</th>
          <th>Equipo</th>
          <th>Descripción</th>
          <th>Servicio</th>
          <th>Empleado</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        {diagnosticos.map((diagnostico) => (
          <tr key={`${diagnostico.id_diag}-${diagnostico.id_detallediag}`}> {/* Clave única combinada */}
            <td>{diagnostico.id_diag}</td>
            <td>{diagnostico.id_detallediag}</td>
            <td>{diagnostico.cliente}</td>
            <td>{diagnostico.equipo}</td>
            <td>{diagnostico.descripcion}</td>
            <td>{diagnostico.servicio}</td>
            <td>{diagnostico.empleado}</td>
            <td>{diagnostico.precio}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

// Exportación del componente
export default TablaDiagnostico;