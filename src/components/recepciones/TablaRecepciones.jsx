// Importaciones necesarias para el componente visual
import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TablaRecepciones = ({ recepciones, cargando, error }) => {
  if (cargando) {
    return <div>Cargando recepciones...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>;     // Muestra error si ocurre
  }

  // Renderizado de la tabla con los datos recibidos
  return (
    <Table striped bordered hover responsive>
      <thead className='table-dark'>
        <tr>
          <th>ID Recepción</th>
          <th>Fecha</th>
          <th>Estado</th>
          <th>Cliente</th>
          <th>Equipo</th>
          <th>Empleado</th>
        </tr>
      </thead>
      <tbody>
        {recepciones.map((recepcion) => (
          <tr key={recepcion.id_recepcion}>
            <td>{recepcion.id_recepcion}</td>
            <td>{recepcion.fecha}</td>
            <td>{recepcion.estado_recepcion}</td>
            <td>{recepcion.cliente}</td>
            <td>{recepcion.equipo}</td>
            <td>{recepcion.empleado}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

// Exportación del componente
export default TablaRecepciones;