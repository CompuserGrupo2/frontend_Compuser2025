import React, { useState, useEffect } from 'react';
import TablaServicios from '../components/servicios/TablaServicios'; // Importa el componente de tabla
import { Container } from "react-bootstrap";


const Servicios = () => {

  const [listaServicios, setListaServicios] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);            // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);        // Maneja errores de la petición


  useEffect(() => {
    const obtenerServicios = async () => { // Método renombrado a español
      try {
        const respuesta = await fetch('http://127.0.0.1:3000/api/servicios'); //Mi host no es localhost si no 127.0.0.1
        if (!respuesta.ok) {
          throw new Error('Error al cargar los servicios');
        }
        const datos = await respuesta.json();
        setListaServicios(datos);    // Actualiza el estado con los datos
        setCargando(false);           // Indica que la carga terminó
      } catch (error) {
        setErrorCarga(error.message); // Guarda el mensaje de error
        setCargando(false);           // Termina la carga aunque haya error
      }
    };
    obtenerServicios();            // Ejecuta la función al montar el componente
  }, []);                           // Array vacío para que solo se ejecute una vez


  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Servicios Disponibles</h4>

        {/* Pasa los estados como props al componente TablaServicios */}
        <TablaServicios 
          servicios={listaServicios} 
          cargando={cargando} 
          error={errorCarga} 
        />
      </Container>
    </>
  );
};

export default Servicios;