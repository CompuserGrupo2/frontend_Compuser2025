import React, { useState, useEffect } from 'react';
import TablaDiagnostico from '../components/diagnostico/TablaDiagnostico'; // Importa el componente de tabla
import { Container } from "react-bootstrap";


const Diagnosticos = () => {

  const [listaDiagnostico, setListaDiagnostico] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);            // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);        // Maneja errores de la petición


  useEffect(() => {
    const obtenerDiagnosticos = async () => { // Método renombrado a español
      try {
        const respuesta = await fetch('http://127.0.0.1:3000/api/diagnosticos'); //Mi host no es localhost si no 127.0.0.1
        if (!respuesta.ok) {
          throw new Error('Error al cargar los diagnósticos');
        }
        const datos = await respuesta.json();
        setListaDiagnostico(datos);    // Actualiza el estado con los datos
        setCargando(false);           // Indica que la carga terminó
      } catch (error) {
        setErrorCarga(error.message); // Guarda el mensaje de error
        setCargando(false);           // Termina la carga aunque haya error
      }
    };
    obtenerDiagnosticos();            // Ejecuta la función al montar el componente
  }, []);                           // Array vacío para que solo se ejecute una vez


  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Diagnósticos</h4>

        {/* Pasa los estados como props al componente TablaServicios */}
        <TablaDiagnostico
          diagnosticos={listaDiagnostico} 
          cargando={cargando} 
          error={errorCarga} 
        />
      </Container>
    </>
  );
};

export default Diagnosticos;