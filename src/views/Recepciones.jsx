import React, { useState, useEffect } from 'react';
import { Container,  Button, Row, Col } from "react-bootstrap";
import TablaRecepciones from '../components/recepciones/TablaRecepciones';
import RegistroRecepcion from '../components/recepciones/RegistroRecepcion';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';
import EdicionRecepcion from '../components/recepciones/EdicionRecepcion';
import EliminacionRecepcion from '../components/recepciones/EliminacionRecepcion';

const Recepciones = () => {

  const [listaRecepciones, setListaRecepciones] = useState([]); // Almacena los datos de la API
  const [listaClientes, setListaClientes] = useState([]);
  const [listaEquipos, setListaEquipos] = useState([]);
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);            // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);        // Maneja errores de la petición

  const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevaRecepcion, setNuevaRecepcion] = useState({
      fecha: new Date(),
      estado_recepcion: '',
      id_cliente: '',
      id_equipocomp: '',
      id_empleado: ''
    });

  //Busqueda
  const [recepcionesFiltradas, setRecepcionesFiltradas] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  //Paginación
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5; // Número de elementos por página
  
  //Eliminación
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [recepcionAEliminar, setRecepcionAEliminar] = useState(null);
     
  //Edición
  const [recepcionEditada, setRecepcionEditada] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);

  //UseEffect
  useEffect(() => {
    obtenerRecepciones();            // Ejecuta la función al montar el componente
    obtenerClientes();
    obtenerEquipos();
    obtenerEmpleados();
  }, []);                           // Array vacío para que solo se ejecute una vez

  useEffect(() => {
      if (textoBusqueda === "") {
        setRecepcionesFiltradas(listaRecepciones);
      }
    }, [listaRecepciones, textoBusqueda]);



  const obtenerRecepciones = async () => { // Método renombrado a español
    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/obtenerrecepciones'); //Mi host no es localhost si no 127.0.0.1
      if (!respuesta.ok) {
        throw new Error('Error al cargar las recepciones');
      }
      const datos = await respuesta.json();
      setListaRecepciones(datos);    // Actualiza el estado con los datos
      setCargando(false);           // Indica que la carga terminó
    } catch (error) {
      setErrorCarga(error.message); // Guarda el mensaje de error
      setCargando(false);           // Termina la carga aunque haya error
    }
  };

  // Obtener clientes para el dropdown
  const obtenerClientes = async () => {
    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/obtenerclientes');
      if (!respuesta.ok) throw new Error('Error al cargar los clientes');
      const datos = await respuesta.json();
      setListaClientes(datos);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  // Obtener equipos para el dropdown
  const obtenerEquipos = async () => {
    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/obtenerequipos');
      if (!respuesta.ok) throw new Error('Error al cargar los equipos');
      const datos = await respuesta.json();
      setListaEquipos(datos);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  // Obtener empleados para el dropdown
  const obtenerEmpleados = async () => {
    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/obtenerempleados');
      if (!respuesta.ok) throw new Error('Error al cargar los empleados');
      const datos = await respuesta.json();
      setListaEmpleados(datos);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaRecepcion(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const agregarRecepcion = async () => {
    if (!nuevaRecepcion.fecha || !nuevaRecepcion.estado_recepcion || 
        !nuevaRecepcion.id_cliente || !nuevaRecepcion.id_equipocomp ||
        !nuevaRecepcion.id_empleado) {
      setErrorCarga("Por favor, completa todos los campos requeridos.");
      return;
    }

    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/registrarrecepcion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaRecepcion),
      });

      if (!respuesta.ok) throw new Error('Error al agregar la recepción del equipo');

      await obtenerRecepciones();

      setRecepcionesFiltradas(listaRecepciones);
      setNuevaRecepcion({
        fecha: new Date(),
        estado_recepcion: '',
        id_cliente: '',
        id_equipocomp: '',
        id_empleado: ''
      });
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
    
    const filtrados = listaRecepciones.filter(
      (recepcion) =>
        recepcion.fecha.toLowerCase().includes(texto) ||
        recepcion.estado_recepcion.toLowerCase().includes(texto) ||
        recepcion.cliente && recepcion.cliente.toLowerCase().includes(texto) ||
        recepcion.equipo && recepcion.equipo.toLowerCase().includes(texto) ||
        recepcion.empleado && recepcion.empleado.toLowerCase().includes(texto)
    );
    setRecepcionesFiltradas(filtrados);
  };

  // Calcular elementos paginados
  const recepcionesPaginadas = recepcionesFiltradas.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  const eliminarRecepcion = async () => {
    if (!recepcionAEliminar) return;

    try {
      const respuesta = await fetch(`http://127.0.0.1:3000/api/eliminarrecepcion/${recepcionAEliminar.id_recepcion}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error('Error al eliminar la recepción');
      }

      await obtenerRecepciones(); // Refresca la lista
      setMostrarModalEliminacion(false);
      establecerPaginaActual(1); // Regresa a la primera página
      setRecepcionAEliminar(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEliminacion = (recepcion) => {
    setRecepcionAEliminar(recepcion);
    setMostrarModalEliminacion(true);
  };

  const manejarCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setRecepcionEditada(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const actualizarRecepcion = async () => {
    if (!recepcionEditada?.fecha || !recepcionEditada?.estado_recepcion ||
        !recepcionEditada?.id_cliente ||
        !recepcionEditada?.id_equipocomp || !recepcionEditada?.id_empleado)
        {
      setErrorCarga("Por favor, completa todos los campos antes de guardar.");
        
      return;
    }

    try {
      const respuesta = await fetch(`http://127.0.0.1:3000/api/actualizarrecepcion/${recepcionEditada.id_recepcion}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fecha: recepcionEditada.fecha,
          estado_recepcion: recepcionEditada.estado_recepcion,
          id_cliente: recepcionEditada.id_cliente,
          id_equipocomp: recepcionEditada.id_equipocomp,
          id_empleado: recepcionEditada.id_empleado,
        }),
      });

      if (!respuesta.ok) {
        throw new Error('Error al actualizar la recepción');
      }

      await obtenerRecepciones();
      setMostrarModalEdicion(false);
      setRecepcionEditada(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEdicion = (recepcion) => {
    setRecepcionEditada(recepcion);
    setMostrarModalEdicion(true);
  };


  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Recepciones</h4>
        <Row>
          <Col lg={2} md={4} sm={4} xs={5}>
            <Button variant="primary" onClick={() => setMostrarModal(true)} style={{ width: "100%" }}>
              Nueva Recepción
            </Button>
          </Col>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
        </Row>
      <br/>
        {/* Pasa los estados como props al componente TablaServicios */}
        <TablaRecepciones
          recepciones={recepcionesPaginadas} 
          cargando={cargando} 
          error={errorCarga}
          totalElementos={listaRecepciones.length} // Total de elementos
          elementosPorPagina={elementosPorPagina} // Elementos por página
          paginaActual={paginaActual} // Página actual
          establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
          abrirModalEliminacion={abrirModalEliminacion} // Método para abrir modal de eliminación
          abrirModalEdicion={abrirModalEdicion} // Método para abrir modal de edición
        />

        <RegistroRecepcion
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevaRecepcion={nuevaRecepcion}
          setNuevaRecepcion={setNuevaRecepcion}
          manejarCambioInput={manejarCambioInput}
          agregarRecepcion={agregarRecepcion}
          errorCarga={errorCarga}
          clientes={listaClientes}
          equipos={listaEquipos}
          empleados={listaEmpleados}
        />

        <EliminacionRecepcion
          mostrarModalEliminacion={mostrarModalEliminacion}
          setMostrarModalEliminacion={setMostrarModalEliminacion}
          eliminarRecepcion={eliminarRecepcion}
        />

        <EdicionRecepcion
          mostrarModalEdicion={mostrarModalEdicion}
          setMostrarModalEdicion={setMostrarModalEdicion}
          recepcionEditada={recepcionEditada}
          manejarCambioInputEdicion={manejarCambioInputEdicion}
          actualizarRecepcion={actualizarRecepcion}
          errorCarga={errorCarga}
          clientes={listaClientes}
          equipos={listaEquipos}
          empleados={listaEmpleados}
        />
      </Container>
    </>
  );
};

export default Recepciones;