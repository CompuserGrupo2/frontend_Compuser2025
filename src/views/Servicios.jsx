import React, { useState, useEffect } from 'react';
import TablaServicios from '../components/servicios/TablaServicios'; // Importa el componente de tabla
import RegistroServicio from '../components/servicios/RegistroServicio';
import { Container, Button } from "react-bootstrap";


const Servicios = () => {

  const [listaServicios, setListaServicios] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);            // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);        // Maneja errores de la petición

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoServicio, setNuevoServicio] = useState({
    descripcion: '', costo: ''
  });
  
  const obtenerServicios = async () => { // Método renombrado a español
    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/obtenerservicios'); //Mi host no es localhost si no 127.0.0.1
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

  useEffect(() => {
    obtenerServicios();            // Ejecuta la función al montar el componente
  }, []);                           // Array vacío para que solo se ejecute una vez

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoServicio(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejo la inserción de una nueva categoría
  const agregarServicio = async () => {

    if (!nuevoServicio.descripcion || !nuevoServicio.costo) {
    setErrorCarga("Por favor, completa todos los campos antes de guardar.");
    return;
    }

    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/insertarservicio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoServicio),
      });

      if (!respuesta.ok) {
        throw new Error('Error al agregar el servicio');
      }

      await obtenerServicios(); // Refresca toda la lista desde el servidor
      setNuevoServicio({ descripcion: '', costo: ''});
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };


  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Servicios Disponibles</h4>
        <Button variant="primary" onClick={() => setMostrarModal(true)}>
          Nuevo Servicio
        </Button>
        {/* Pasa los estados como props al componente TablaServicios */}
        <TablaServicios 
        
          servicios={listaServicios} 
          cargando={cargando} 
          error={errorCarga} 
        />
        <RegistroServicio
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoServicio={nuevoServicio}
          manejarCambioInput={manejarCambioInput}
          agregarServicio={agregarServicio}
          errorCarga={errorCarga}
        />
      </Container>
    </>
  );
};

export default Servicios;