import React, { useState, useEffect } from 'react';
import TablaEquipos from '../components/equipos/TablaEquipos'; // Importa el componente de tabla
import RegistroEquipo from '../components/equipos/RegistroEquipo';
import EliminacionEquipo from '../components/equipos/EliminacionEquipo';
import EdicionEquipo from '../components/equipos/EdicionEquipo';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';
import { Container, Button, Row, Col } from "react-bootstrap";


const Equipos = () => {

  const [listaEquipos, setListaEquipos] = useState([]); // Almacena los datos de la API
  const [listaClientes, setListaClientes] = useState([]);
  const [cargando, setCargando] = useState(true);            // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);        // Maneja errores de la petición

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoEquipo, setNuevoEquipo] = useState({
    tipo: '',
    marca: '',
    color: '',
    modelo: '',
    id_cliente: ''
  });

  //Busqueda
  const [equiposFiltrados, setEquiposFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  //Paginación
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5; // Número de elementos por página

  //Eliminación
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [equipoAEliminar, setEquipoAEliminar] = useState(null);
    
  //Edición
  const [equipoEditado, setEquipoEditado] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);

  const obtenerEquipos = async () => { // Método renombrado a español
    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/obtenerequipos'); //Mi host no es localhost si no 127.0.0.1
      if (!respuesta.ok) {
        throw new Error('Error al cargar los equipos computarizados');
      }
      const datos = await respuesta.json();
      setListaEquipos(datos);    // Actualiza el estado con los datos
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

  useEffect(() => {
    if (textoBusqueda === "") {
      setEquiposFiltrados(listaEquipos);
    }
  }, [listaEquipos, textoBusqueda]);

  useEffect(() => {
    
    obtenerEquipos();            // Ejecuta la función al montar el componente
    obtenerClientes();
  }, []);                           // Array vacío para que solo se ejecute una vez

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoEquipo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const agregarEquipo = async () => {
    if (!nuevoEquipo.tipo || !nuevoEquipo.marca || 
        !nuevoEquipo.color || !nuevoEquipo.modelo ||
        !nuevoEquipo.id_cliente) {
      setErrorCarga("Por favor, completa todos los campos requeridos.");
      return;
    }

    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/registrarequipo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoEquipo),
      });

      if (!respuesta.ok) throw new Error('Error al agregar el equipo');

      await obtenerEquipos();

      setEquiposFiltrados(listaEquipos);
      setNuevoEquipo({
        tipo: '',
        marca: '',
        color: '',
        modelo: '',
        id_cliente: ''
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
    
    const filtrados = listaEquipos.filter(
      (equipo) =>
        equipo.tipo.toLowerCase().includes(texto) ||
        equipo.marca.toLowerCase().includes(texto) ||
        equipo.color.toLowerCase().includes(texto) ||
        equipo.modelo.toLowerCase().includes(texto) ||
        equipo.cliente && equipo.cliente.toLowerCase().includes(texto)
    );
    setEquiposFiltrados(filtrados);
  };

  // Calcular elementos paginados
  const equiposPaginados = equiposFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  const eliminarEquipo = async () => {
    if (!equipoAEliminar) return;

    try {
      const respuesta = await fetch(`http://127.0.0.1:3000/api/eliminarequipo/${equipoAEliminar.id_equipocomp}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error('Error al eliminar el equipo');
      }

      await obtenerEquipos(); // Refresca la lista
      setMostrarModalEliminacion(false);
      establecerPaginaActual(1); // Regresa a la primera página
      setEquipoAEliminar(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEliminacion = (equipo) => {
    setEquipoAEliminar(equipo);
    setMostrarModalEliminacion(true);
  };

  const manejarCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setEquipoEditado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const actualizarEquipo = async () => {
    if (!equipoEditado?.tipo || !equipoEditado?.marca ||
        !equipoEditado?.color ||
        !equipoEditado?.modelo || !equipoEditado?.id_cliente)
        {
      setErrorCarga("Por favor, completa todos los campos antes de guardar.");
        
      return;
    }

    try {
      const respuesta = await fetch(`http://127.0.0.1:3000/api/actualizarequipo/${equipoEditado.id_equipocomp}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tipo: equipoEditado.tipo,
          marca: equipoEditado.marca,
          color: equipoEditado.color,
          modelo: equipoEditado.modelo,
          id_cliente: equipoEditado.id_cliente,
        }),
      });

      if (!respuesta.ok) {
        throw new Error('Error al actualizar el equipo');
      }

      await obtenerEquipos();
      setMostrarModalEdicion(false);
      setEquipoEditado(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEdicion = (equipo) => {
    setEquipoEditado(equipo);
    setMostrarModalEdicion(true);
  };

  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Equipos computarizados</h4>

        <Row>
          <Col lg={2} md={4} sm={4} xs={5}>
            <Button variant="primary" onClick={() => setMostrarModal(true)} style={{ width: "100%" }}>
              Nuevo Equipo
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
        <TablaEquipos
          equipos={equiposPaginados} 
          cargando={cargando} 
          error={errorCarga} 
          totalElementos={listaEquipos.length} // Total de elementos
          elementosPorPagina={elementosPorPagina} // Elementos por página
          paginaActual={paginaActual} // Página actual
          establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
          abrirModalEliminacion={abrirModalEliminacion} // Método para abrir modal de eliminación
          abrirModalEdicion={abrirModalEdicion} // Método para abrir modal de edición
        />

      <RegistroEquipo
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoEquipo={nuevoEquipo}
        manejarCambioInput={manejarCambioInput}
        agregarEquipo={agregarEquipo}
        errorCarga={errorCarga}
        clientes={listaClientes}
      />

      <EliminacionEquipo
        mostrarModalEliminacion={mostrarModalEliminacion}
        setMostrarModalEliminacion={setMostrarModalEliminacion}
        eliminarEquipo={eliminarEquipo}
      />

      <EdicionEquipo
        mostrarModalEdicion={mostrarModalEdicion}
        setMostrarModalEdicion={setMostrarModalEdicion}
        equipoEditado={equipoEditado}
        manejarCambioInputEdicion={manejarCambioInputEdicion}
        actualizarEquipo={actualizarEquipo}
        errorCarga={errorCarga}
        clientes={listaClientes}
      />
      </Container>
    </>
  );
};

export default Equipos;