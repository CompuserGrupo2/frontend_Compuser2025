import React, { useState, useEffect } from 'react';
import TablaServicios from '../components/servicios/TablaServicios'; // Importa el componente de tabla
import RegistroServicio from '../components/servicios/RegistroServicio';
import EliminacionServicio from '../components/servicios/EliminacionServicio';
import EdicionServicio from '../components/servicios/EdicionServicio';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';
import { Container, Button, Row, Col, Alert } from "react-bootstrap";


const Servicios = () => {

  const [listaServicios, setListaServicios] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);            // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);        // Maneja errores de la petición

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoServicio, setNuevoServicio] = useState({
    descripcion: '', costo: ''
  });

  //Busqueda
  const [serviciosFiltrados, setServiciosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  //Paginación
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 4; // Número de elementos por página
  
  //Eliminación
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [servicioAEliminar, setServicioAEliminar] = useState(null);
  
  //Edición
  const [servicioEditado, setServicioEditado] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);

  // Estado para mostrar mensaje de confirmación
  const [mensajeExito, setMensajeExito] = useState(null);
  
  const obtenerServicios = async () => { // Método renombrado a español
    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/obtenerservicios'); //Mi host no es localhost si no 127.0.0.1
      if (!respuesta.ok) {
        throw new Error('Error al cargar los servicios');
      }
      const datos = await respuesta.json();
      setListaServicios(datos);    // Actualiza el estado con los datos
      setServiciosFiltrados(datos);
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
      setMensajeExito('Servicio registrado correctamente😉'); //Mensaje de confirmación
      setTimeout(() => setMensajeExito(null), 3000);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    establecerPaginaActual(1);
    
    const filtrados = listaServicios.filter(
      (servicio) =>
        servicio.descripcion.toLowerCase().includes(texto) ||
        servicio.costo.toString().toLowerCase().includes(texto)
    );
    setServiciosFiltrados(filtrados);
  };

  // Calcular elementos paginados
  const serviciosPaginados = serviciosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  const eliminarServicio = async () => {
    if (!servicioAEliminar) return;

    try {
      const respuesta = await fetch(`http://127.0.0.1:3000/api/eliminarservicio/${servicioAEliminar.id_ser}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error('Error al eliminar el servicio');
      }

      await obtenerServicios(); // Refresca la lista
      setMostrarModalEliminacion(false);
      establecerPaginaActual(1); // Regresa a la primera página
      setServicioAEliminar(null);
      setErrorCarga(null);
      setMensajeExito('Servicio eliminado correctamente😉'); // Mensaje de confirmación al eliminar exitosamente
      setTimeout(() => setMensajeExito(null), 3000); // Oculta el mensaje automáticamente luego de 3 segundos
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEliminacion = (servicio) => {
    setServicioAEliminar(servicio);
    setMostrarModalEliminacion(true);
  };

  const manejarCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setServicioEditado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const actualizarServicio = async () => {
    if (!servicioEditado?.descripcion || !servicioEditado?.costo)
        {
      setErrorCarga("Por favor, completa todos los campos antes de guardar.");
      return;
    }

    try {
      const respuesta = await fetch(`http://127.0.0.1:3000/api/actualizarservicio/${servicioEditado.id_ser}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          descripcion: servicioEditado.descripcion,
          costo: servicioEditado.costo,
        }),
      });

      if (!respuesta.ok) {
        throw new Error('Error al actualizar el servicio');
      }

      await obtenerServicios();
      setMostrarModalEdicion(false);
      setServicioEditado(null);
      setErrorCarga(null);
      setMensajeExito('Servicio actualizado correctamente😉'); // Mensaje de confirmación al eliminar exitosamente
      setTimeout(() => setMensajeExito(null), 3000); // Oculta el mensaje automáticamente luego de 3 segundos
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEdicion = (servicio) => {
    setServicioEditado(servicio);
    setMostrarModalEdicion(true);
  };

  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Servicios Disponibles</h4>
        {mensajeExito && ( //para que este visible en pantalla la confirmación
          <Alert variant="success" onClose={() => setMensajeExito(null)} dismissible>
            {mensajeExito}
          </Alert>
        )}
        <Row>
          <Col lg={2} md={4} sm={4} xs={5}>
            <Button variant="primary" onClick={() => setMostrarModal(true)} style={{ width: "100%" }}>
              Nuevo Servicio
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
        <TablaServicios 
          servicios={serviciosPaginados}
          cargando={cargando}
          error={errorCarga}
          totalElementos={listaServicios.length} // Total de elementos
          elementosPorPagina={elementosPorPagina} // Elementos por página
          paginaActual={paginaActual} // Página actual
          establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
          abrirModalEliminacion={abrirModalEliminacion} // Método para abrir modal de eliminación
          abrirModalEdicion={abrirModalEdicion} // Método para abrir modal de edición
        />
        <RegistroServicio
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoServicio={nuevoServicio}
          manejarCambioInput={manejarCambioInput}
          agregarServicio={agregarServicio}
          errorCarga={errorCarga}
        />

        <EliminacionServicio
          mostrarModalEliminacion={mostrarModalEliminacion}
          setMostrarModalEliminacion={setMostrarModalEliminacion}
          eliminarServicio={eliminarServicio}
        />

        <EdicionServicio
          mostrarModalEdicion={mostrarModalEdicion}
          setMostrarModalEdicion={setMostrarModalEdicion}
          servicioEditado={servicioEditado}
          manejarCambioInputEdicion={manejarCambioInputEdicion}
          actualizarServicio={actualizarServicio}
          errorCarga={errorCarga}
        />
      </Container>
    </>
  );
};

export default Servicios;