import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Tarjeta from '../components/catalogo/Tarjeta';

const CatalogoServicios = () => {
  const [listaServicios, setListaServicios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);

  // Obtener servicios
  const obtenerServicios = async () => {
    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/obtenerservicios');
      if (!respuesta.ok) throw new Error('Error al cargar los servicios');
      const datos = await respuesta.json();
      setListaServicios(datos);
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerServicios();
  }, []);

  if (cargando) return <div>Cargando...</div>;
  if (errorCarga) return <div>Error: {errorCarga}</div>;

  return (
    <Container className="mt-5">
      <h4>Catálogo de Servicios</h4>
      <Row>
        {listaServicios.map((servicio, indice) => (
          <Tarjeta
            key={servicio.id_ser}
            indice={indice}
            descripcion={servicio.descripcion}
            costo={servicio.costo}
            imagen={servicio.imagen}
          />
        ))}
      </Row>
    </Container>
  );
};

export default CatalogoServicios;