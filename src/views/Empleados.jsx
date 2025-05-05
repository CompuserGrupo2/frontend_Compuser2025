import React, { useState, useEffect } from 'react';
import TablaEmpleados from '../components/empleados/TablaEmpleados'; // Importa el componente de tabla
import RegistroEmpleado from '../components/empleados/RegistroEmpleado';
import EliminacionEmpleado from '../components/empleados/EliminacionEmpleado';
import EdicionEmpleado from '../components/empleados/EdicionEmpleado';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';
import { Container, Button, Row, Col } from "react-bootstrap";


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

  //Busqueda
  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  //Paginación
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 3; // Número de elementos por página
  
  //Eliminación
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [empleadoAEliminar, setEmpleadoAEliminar] = useState(null);
  
  //Edición
  const [empleadoEditado, setEmpleadoEditado] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);

    const obtenerEmpleados = async () => { // Método renombrado a español
      try {
        const respuesta = await fetch('http://127.0.0.1:3000/api/obtenerempleados'); //Mi host no es localhost si no 127.0.0.1
        if (!respuesta.ok) {
          throw new Error('Error al cargar los empleados');
        }
        const datos = await respuesta.json();
        setListaEmpleados(datos);    // Actualiza el estado con los datos
        setEmpleadosFiltrados(datos);
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

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    establecerPaginaActual(1);
    
    const filtrados = listaEmpleados.filter(
      (empleado) =>
        empleado.nombre.toLowerCase().includes(texto) ||
        empleado.apellido.toLowerCase().includes(texto) ||
        empleado.direccion.toLowerCase().includes(texto) ||
        empleado.telefono.toLowerCase().includes(texto) ||
        empleado.cedula.toLowerCase().includes(texto)
    );
    setEmpleadosFiltrados(filtrados);
  };

  // Calcular elementos paginados
  const empleadosPaginados = empleadosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  const eliminarEmpleado = async () => {
    if (!empleadoAEliminar) return;

    try {
      const respuesta = await fetch(`http://127.0.0.1:3000/api/eliminarempleado/${empleadoAEliminar.id_empleado}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error('Error al eliminar el empleado');
      }

      await obtenerEmpleados(); // Refresca la lista
      setMostrarModalEliminacion(false);
      establecerPaginaActual(1); // Regresa a la primera página
      setEmpleadoAEliminar(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEliminacion = (empleado) => {
    setEmpleadoAEliminar(empleado);
    setMostrarModalEliminacion(true);
  };

  const manejarCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setEmpleadoEditado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const actualizarEmpleado = async () => {
    if (!empleadoEditado?.nombre || !empleadoEditado?.apellido ||
        !empleadoEditado?.direccion ||
        !empleadoEditado?.telefono || !empleadoEditado?.cedula)
        {
      setErrorCarga("Por favor, completa todos los campos antes de guardar.");
        
      return;
    }

    try {
      const respuesta = await fetch(`http://127.0.0.1:3000/api/actualizarempleado/${empleadoEditado.id_empleado}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: empleadoEditado.nombre,
          apellido: empleadoEditado.apellido,
          direccion: empleadoEditado.direccion,
          telefono: empleadoEditado.telefono,
          cedula: empleadoEditado.cedula,
        }),
      });

      if (!respuesta.ok) {
        throw new Error('Error al actualizar el empleado');
      }

      await obtenerEmpleados();
      setMostrarModalEdicion(false);
      setEmpleadoEditado(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEdicion = (empleado) => {
    setEmpleadoEditado(empleado);
    setMostrarModalEdicion(true);
  };

  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Empleados</h4>

        <Row>
          <Col lg={2} md={4} sm={4} xs={5}>
            <Button variant="primary" onClick={() => setMostrarModal(true)} style={{ width: "100%" }}>
              Nuevo Empleado
            </Button>
          </Col>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
        </Row>
        
        <br />
        {/* Pasa los estados como props al componente TablaServicios */}
        <TablaEmpleados
          empleados={empleadosPaginados} 
          cargando={cargando} 
          error={errorCarga} 
          totalElementos={listaEmpleados.length} // Total de elementos
          elementosPorPagina={elementosPorPagina} // Elementos por página
          paginaActual={paginaActual} // Página actual
          establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
          abrirModalEliminacion={abrirModalEliminacion} // Método para abrir modal de eliminación
          abrirModalEdicion={abrirModalEdicion} // Método para abrir modal de edición
        />
        <RegistroEmpleado
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoEmpleado={nuevoEmpleado}
          manejarCambioInput={manejarCambioInput}
          agregarEmpleado={agregarEmpleado}
          errorCarga={errorCarga}
        />

        <EliminacionEmpleado
          mostrarModalEliminacion={mostrarModalEliminacion}
          setMostrarModalEliminacion={setMostrarModalEliminacion}
          eliminarEmpleado={eliminarEmpleado}
        />

        <EdicionEmpleado
          mostrarModalEdicion={mostrarModalEdicion}
          setMostrarModalEdicion={setMostrarModalEdicion}
          empleadoEditado={empleadoEditado}
          manejarCambioInputEdicion={manejarCambioInputEdicion}
          actualizarEmpleado={actualizarEmpleado}
          errorCarga={errorCarga}
        />
      </Container>
    </>
  );
};

export default Empleados;