import React, { useState, useEffect } from 'react';
import TablaClientes from '../components/clientes/TablaClientes'; // Importa el componente de tabla
import { Container } from "react-bootstrap";


const Clientes = () => {

  const [listaClientes, setListaClientes] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);            // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);        // Maneja errores de la petición


  useEffect(() => {
    const obtenerClientes = async () => { // Método renombrado a español
      try {
        const respuesta = await fetch('http://127.0.0.1:3000/api/clientes'); //Mi host no es localhost si no 127.0.0.1
        if (!respuesta.ok) {
          throw new Error('Error al cargar los clientes');
        }
        const datos = await respuesta.json();
        setListaClientes(datos);    // Actualiza el estado con los datos
        setCargando(false);           // Indica que la carga terminó
      } catch (error) {
        setErrorCarga(error.message); // Guarda el mensaje de error
        setCargando(false);           // Termina la carga aunque haya error
      }
    };
    obtenerClientes();            // Ejecuta la función al montar el componente
  }, []);                           // Array vacío para que solo se ejecute una vez


  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Clientes</h4>

        {/* Pasa los estados como props al componente TablaServicios */}
        <TablaClientes
          clientes={listaClientes} 
          cargando={cargando} 
          error={errorCarga} 
        />
      </Container>
    </>
  );
};

export default Clientes;