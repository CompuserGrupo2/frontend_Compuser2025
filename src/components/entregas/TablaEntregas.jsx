// Importaciones necesarias para el componente visual
import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TablaEntregas = ({ entregas, cargando, error }) => {
  if (cargando) {
    return <div>Cargando entregas...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>;     // Muestra error si ocurre
  }

  // Renderizado de la tabla con los datos recibidos
  return (
    <Table striped bordered hover responsive>
      <thead className='table-dark'>
        <tr>
          <th>ID Entrega</th>
          <th>Fecha</th>
          <th>Estado</th>
          <th>Cliente</th>
          <th>Equipo</th>
          <th>Empleado</th>
        </tr>
      </thead>
      <tbody>
        {entregas.map((entrega) => (
          <tr key={entrega.id_entregaequipo}>
            <td>{entrega.id_entregaequipo}</td>
            <td>{entrega.fecha}</td>
            <td>{entrega.estado_entrega}</td>
            <td>{entrega.cliente}</td>
            <td>{entrega.equipo}</td>
            <td>{entrega.empleado}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

// Exportación del componente
export default TablaEntregas;