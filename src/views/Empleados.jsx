import React, { useState, useEffect } from 'react';
import TablaEmpleados from '../components/empleados/TablaEmpleados'; // Importa el componente de tabla
import RegistroEmpleado from '../components/empleados/RegistroEmpleado';
import { Container, Button } from "react-bootstrap";


const Empleados = () => {

  const [listaEmpleados, setListaEmpleados] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);            // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);        // Maneja errores de la petición

  const [mostrarModal, setMostrarModal] = useState(false);
   const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: '', apellido: '',
    direccion: '',
    telefono: '', cedula: ''
  });

    const obtenerEmpleados = async () => { // Método renombrado a español
      try {
        const respuesta = await fetch('http://127.0.0.1:3000/api/obtenerempleados'); //Mi host no es localhost si no 127.0.0.1
        if (!respuesta.ok) {
          throw new Error('Error al cargar los empleados');
        }
        const datos = await respuesta.json();
        setListaEmpleados(datos);    // Actualiza el estado con los datos
        setCargando(false);           // Indica que la carga terminó
      } catch (error) {
        setErrorCarga(error.message); // Guarda el mensaje de error
        setCargando(false);           // Termina la carga aunque haya error
      }
    };

  useEffect(() => {
    obtenerEmpleados();            // Ejecuta la función al montar el componente
  }, []);                           // Array vacío para que solo se ejecute una vez

      // Maneja los cambios en los inputs del modal
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoEmpleado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejo la inserción de una nueva categoría
  const agregarEmpleado = async () => {

    if (!nuevoEmpleado.nombre || !nuevoEmpleado.apellido || 
      !nuevoEmpleado.direccion ||
      !nuevoEmpleado.telefono || !nuevoEmpleado.cedula) {
    setErrorCarga("Por favor, completa todos los campos antes de guardar.");
    return;
    }

    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/insertarempleado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoEmpleado),
      });

      if (!respuesta.ok) {
        throw new Error('Error al agregar el empleado');
      }

      await obtenerEmpleados(); // Refresca toda la lista desde el servidor
      setNuevoEmpleado({ nombre: '', apellido: '', 
                        direccion: '',
                        telefono: '', cedula: '' });
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
        <h4>Empleados</h4>
        <Button variant="primary" onClick={() => setMostrarModal(true)}>
          Nuevo Empleado
        </Button>
        {/* Pasa los estados como props al componente TablaServicios */}
        <TablaEmpleados
          empleados={listaEmpleados} 
          cargando={cargando} 
          error={errorCarga} 
        />
        <RegistroEmpleado
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoEmpleado={nuevoEmpleado}
          manejarCambioInput={manejarCambioInput}
          agregarEmpleado={agregarEmpleado}
          errorCarga={errorCarga}
        />
      </Container>
    </>
  );
};

export default Empleados;