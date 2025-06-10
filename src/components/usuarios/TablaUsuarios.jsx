// Importaciones necesarias para el componente visual
import React from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import Paginacion from '../ordenamiento/Paginacion';
import 'bootstrap/dist/css/bootstrap.min.css';

// Declaración del componente TablaClientes que recibe props
const TablaUsuarios = ({
  usuarios,
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
    return <div>Cargando Usuarios...</div>; // Muestra mensaje mientras carga
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
          <th>ID Usuario</th>
          <th>Usuario</th>
          <th>Contraseña</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuari) => (
          <tr key={usuari.id_usuario}>
            <td>{usuari.id_usuario}</td>
            <td>{usuari.usuario}</td>
            <td>{'*'.repeat(usuari.contraseña.length)}</td>
            <td>
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => abrirModalEdicion(usuari)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                className="me-2"
                onClick={() => abrirModalEliminacion(usuari)}
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
      {usuarios.map((usuari) => (
        <Card key={usuari.id_usuario} className="mb-2 shadow-sm">
          <Card.Body>
            <Card.Title>{usuari.usuario}</Card.Title>
            <Card.Text><strong>ID:</strong> {usuari.id_usuario}</Card.Text>
            <Card.Text><strong>Contraseña:</strong> {'*'.repeat(usuari.contraseña.length)}</Card.Text>
            <div>
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => abrirModalEdicion(usuari)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => abrirModalEliminacion(usuari)}
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
export default TablaUsuarios;