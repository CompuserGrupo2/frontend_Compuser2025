import React, { useState, useEffect } from 'react';
import { Container,  Button, Row, Col, Alert  } from "react-bootstrap";
import TablaEntregas from '../components/entregas/TablaEntregas';
import RegistroEntrega from '../components/entregas/RegistroEntrega';
import EdicionEntrega from '../components/entregas/EdicionEntrega';
import EliminacionEntrega from '../components/entregas/EliminacionEntrega';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';


const Entregas = () => {

  const [listaEntregas, setListaEntregas] = useState([]); // Almacena los datos de la API
  const [listaClientes, setListaClientes] = useState([]);
  const [listaEquipos, setListaEquipos] = useState([]);
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);            // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);        // Maneja errores de la petición

  const [mostrarModal, setMostrarModal] = useState(false);
      const [nuevaEntrega, setNuevaEntrega] = useState({
        fecha: new Date(),
        estado_entrega: '',
        id_equipocomp: '',
        id_cliente: '',
        id_empleado: ''
      });
  
    //Busqueda
    const [entregasFiltradas, setEntregasFiltradas] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");
  
    //Paginación
    const [paginaActual, establecerPaginaActual] = useState(1);
    const elementosPorPagina = 5; // Número de elementos por página
    
    //Eliminación
    const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
    const [entregaAEliminar, setEntregaAEliminar] = useState(null);
       
    //Edición
    const [entregaEditada, setEntregaEditada] = useState(null);
    const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);

    // Estado para mostrar mensaje de confirmación
    const [mensajeExito, setMensajeExito] = useState(null);


  useEffect(() => {
    obtenerEntregas();            // Ejecuta la función al montar el componente
    obtenerClientes();
    obtenerEmpleados();
    obtenerEquipos();
  }, []);                           // Array vacío para que solo se ejecute una vez

  useEffect(() => {
        if (textoBusqueda === "") {
          setEntregasFiltradas(listaEntregas);
        }
      }, [listaEntregas, textoBusqueda]);

  const obtenerEntregas = async () => { // Método renombrado a español
    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/obtenerentregas'); //Mi host no es localhost si no 127.0.0.1
      if (!respuesta.ok) {
        throw new Error('Error al cargar las entregas');
      }
      const datos = await respuesta.json();
      setListaEntregas(datos);    // Actualiza el estado con los datos
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
    setNuevaEntrega(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const agregarEntrega = async () => {
    if (!nuevaEntrega.fecha || !nuevaEntrega.estado_entrega || 
        !nuevaEntrega.id_equipocomp || !nuevaEntrega.id_cliente ||
        !nuevaEntrega.id_empleado) {
      setErrorCarga("Por favor, completa todos los campos requeridos.");
      return;
    }

    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/registrarentrega', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaEntrega),
      });

      if (!respuesta.ok) throw new Error('Error al agregar la entrega del equipo');

      await obtenerEntregas();

      setEntregasFiltradas(listaEntregas);
      setNuevaEntrega({
        fecha: new Date(),
        estado_entrega: '',
        id_equipocomp: '',
        id_cliente: '',
        id_empleado: ''
      });
      setMostrarModal(false);
      setErrorCarga(null);
      setMensajeExito('Entrega registrada correctamente😉'); //Mensaje de confirmación
      setTimeout(() => setMensajeExito(null), 3000);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    establecerPaginaActual(1);
    
    const filtrados = listaEntregas.filter(
      (entrega) =>
        entrega.fecha.toLowerCase().includes(texto) ||
        entrega.estado_entrega.toLowerCase().includes(texto) ||
        entrega.equipo && entrega.equipo.toLowerCase().includes(texto) ||
        entrega.cliente && entrega.cliente.toLowerCase().includes(texto) ||
        entrega.empleado && entrega.empleado.toLowerCase().includes(texto)
    );
    setEntregasFiltradas(filtrados);
  };

  // Calcular elementos paginados
  const entregasPaginadas = entregasFiltradas.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  const eliminarEntrega = async () => {
    if (!entregaAEliminar) return;

    try {
      const respuesta = await fetch(`http://127.0.0.1:3000/api/eliminarentrega/${entregaAEliminar.id_entregaequipo}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error('Error al eliminar la entrega');
      }

      await obtenerEntregas(); // Refresca la lista
      setMostrarModalEliminacion(false);
      establecerPaginaActual(1); // Regresa a la primera página
      setEntregaAEliminar(null);
      setErrorCarga(null);
      setMensajeExito('Entrega eliminada correctamente😉'); // Mensaje de confirmación al eliminar exitosamente
      setTimeout(() => setMensajeExito(null), 3000); // Oculta el mensaje automáticamente luego de 3 segundos
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEliminacion = (entrega) => {
    setEntregaAEliminar(entrega);
    setMostrarModalEliminacion(true);
  };

  const manejarCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setEntregaEditada(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const actualizarEntrega = async () => {
    if (!entregaEditada?.fecha || !entregaEditada?.estado_entrega ||
        !entregaEditada?.id_cliente ||
        !entregaEditada?.id_equipocomp || !entregaEditada?.id_empleado)
        {
      setErrorCarga("Por favor, completa todos los campos antes de guardar.");
        
      return;
    }

    try {
      const respuesta = await fetch(`http://127.0.0.1:3000/api/actualizarentrega/${entregaEditada.id_entregaequipo}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fecha: entregaEditada.fecha,
          estado_entrega: entregaEditada.estado_entrega,
          id_equipocomp: entregaEditada.id_equipocomp,
          id_cliente: entregaEditada.id_cliente,
          id_empleado: entregaEditada.id_empleado,
        }),
      });

      if (!respuesta.ok) {
        throw new Error('Error al actualizar la entrega');
      }

      await obtenerEntregas();
      setMostrarModalEdicion(false);
      setEntregaEditada(null);
      setErrorCarga(null);
      setMensajeExito('Entrega actualizada correctamente😉'); // Mensaje de confirmación al eliminar exitosamente
      setTimeout(() => setMensajeExito(null), 3000); // Oculta el mensaje automáticamente luego de 3 segundos
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEdicion = (entrega) => {
    setEntregaEditada(entrega);
    setMostrarModalEdicion(true);
  };

  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Entregas</h4>
        {mensajeExito && ( //para que este visible en pantalla la confirmación
          <Alert variant="success" onClose={() => setMensajeExito(null)} dismissible>
            {mensajeExito}
          </Alert>
        )}
        <Row>
          <Col lg={2} md={4} sm={4} xs={5}>
            <Button variant="primary" onClick={() => setMostrarModal(true)} style={{ width: "100%" }}>
              Nueva Entrega
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
        <TablaEntregas
          entregas={entregasPaginadas} 
          cargando={cargando} 
          error={errorCarga} 
          totalElementos={listaEntregas.length} // Total de elementos
          elementosPorPagina={elementosPorPagina} // Elementos por página
          paginaActual={paginaActual} // Página actual
          establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
          abrirModalEliminacion={abrirModalEliminacion} // Método para abrir modal de eliminación
          abrirModalEdicion={abrirModalEdicion} // Método para abrir modal de edición
        />

        <RegistroEntrega
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevaEntrega={nuevaEntrega}
          setNuevaEntrega={setNuevaEntrega}
          manejarCambioInput={manejarCambioInput}
          agregarEntrega={agregarEntrega}
          errorCarga={errorCarga}
          clientes={listaClientes}
          equipos={listaEquipos}
          empleados={listaEmpleados}
        />

        <EliminacionEntrega
          mostrarModalEliminacion={mostrarModalEliminacion}
          setMostrarModalEliminacion={setMostrarModalEliminacion}
          eliminarEntrega={eliminarEntrega}
        />

        <EdicionEntrega
          mostrarModalEdicion={mostrarModalEdicion}
          setMostrarModalEdicion={setMostrarModalEdicion}
          entregaEditada={entregaEditada}
          manejarCambioInputEdicion={manejarCambioInputEdicion}
          actualizarEntrega={actualizarEntrega}
          errorCarga={errorCarga}
          clientes={listaClientes}
          equipos={listaEquipos}
          empleados={listaEmpleados}
        />
      </Container>
    </>
  );
};

export default Entregas;