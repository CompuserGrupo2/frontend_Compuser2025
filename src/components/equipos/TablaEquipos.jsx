// Importaciones necesarias para el componente visual
import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TablaEquipos = ({ equipos, cargando, error }) => {
  if (cargando) {
    return <div>Cargando equipos computarizados...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>;     // Muestra error si ocurre
  }

  // Renderizado de la tabla con los datos recibidos
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID Equipo</th>
          <th>Tipo</th>
          <th>Marca</th>
          <th>Color</th>
          <th>Modelo</th>
          <th>Cliente</th>
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
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

// Exportación del componente
export default TablaEquipos;