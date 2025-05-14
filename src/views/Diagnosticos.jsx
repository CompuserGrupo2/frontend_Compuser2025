import React, { useState, useEffect } from 'react';
import TablaDiagnostico from '../components/diagnostico/TablaDiagnostico'; // Importa el componente de tabla
import ModalDetallesDiagnostico from '../components/detalles_diagnosticos/ModalDetallesDiagnostico';
import EliminacionDiagnostico from '../components/diagnostico/EliminacionDiagnostico';
import RegistroDiagnostico from '../components/diagnostico/RegistroDiagnostico';
import ActualizacionDiagnostico from '../components/diagnostico/ActualizacionDiagnostico';
import { Container,  Button, Row, Col, Alert } from "react-bootstrap";
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';


const Diagnosticos = () => {

  const [listaDiagnosticos, setListaDiagnosticos] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);            // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);        // Maneja errores de la petición

  const [mostrarModalDetalle, setMostrarModalDetalle] = useState(false); // Estado para el modal
  const [detallesDiagnostico, setDetallesDiagnostico] = useState([]); // Estado para los detalles
  const [cargandoDetalles, setCargandoDetalles] = useState(false); // Estado de carga de detalles
  const [errorDetalles, setErrorDetalles] = useState(null); // Estado de error de detalles

  //Busqueda
  const [DiagnosticosFiltrados, setDiagnosticosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
    
  //Paginación
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5; // Número de elementos por página

  //Eliminación
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [diagnosticoAEliminar, setDiagnosticoAEliminar] = useState(null);

  // Estado para mostrar mensaje de confirmación
  const [mensajeExito, setMensajeExito] = useState(null); 

  //Registro
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [nuevoDiagnostico, setNuevoDiagnostico] = useState({
    id_cliente: '',
    id_empleado: '',
    id_equipocomp: '',
    descripcion: '',
    fecha: new Date(),
    total: 0
  });
  const [detallesNuevos, setDetallesNuevos] = useState([]);

  const [mostrarModalActualizacion, setMostrarModalActualizacion] = useState(false);
  const [diagnosticoAEditar, setDiagnosticoAEditar] = useState(null);
  const [detallesEditados, setDetallesEditados] = useState([]);


  useEffect(() => {
    obtenerDiagnosticos();            // Ejecuta la función al montar el componente
    obtenerClientes();
    obtenerEmpleados();
    obtenerEquipos();
    obtenerServicios();
  }, []);                           // Array vacío para que solo se ejecute una vez


  const obtenerDiagnosticos = async () => { // Método renombrado a español
    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/obtenerdiagnosticos'); //Mi host no es localhost si no 127.0.0.1
      if (!respuesta.ok) {
        throw new Error('Error al cargar los diagnósticos');
      }
      const datos = await respuesta.json();
      setListaDiagnosticos(datos);    // Actualiza el estado con los datos
      setDiagnosticosFiltrados(datos);
      setCargando(false);           // Indica que la carga terminó
    } catch (error) {
      setErrorCarga(error.message); // Guarda el mensaje de error
      setCargando(false);           // Termina la carga aunque haya error
    }
  };

  const obtenerClientes = async () => {
    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/obtenerclientes');
      if (!respuesta.ok) throw new Error('Error al cargar los clientes');
      const datos = await respuesta.json();
      setClientes(datos);
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
      setEquipos(datos);
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
      setEmpleados(datos);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  // Obtener servicios para el dropdown
  const obtenerServicios = async () => {
    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/obtenerservicios');
      if (!respuesta.ok) throw new Error('Error al cargar los servicios');
      const datos = await respuesta.json();
      setServicios(datos);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  // Función para obtener detalles de un diagnóstico
  const obtenerDetalles = async (id_diag) => {
    setCargandoDetalles(true);
    setErrorDetalles(null);
    try {
      const respuesta = await fetch(`http://127.0.0.1:3000/api/obtenerdetallesdiagnostico/${id_diag}`);
      if (!respuesta.ok) {
        throw new Error('Error al cargar los detalles del diagnóstico');
      }
      const datos = await respuesta.json();
      setDetallesDiagnostico(datos);
      setCargandoDetalles(false);
      setMostrarModalDetalle(true); // Abre el modal
    } catch (error) {
      setErrorDetalles(error.message);
      setCargandoDetalles(false);
    }
  };

  const eliminarDiagnostico = async () => {
    if (!diagnosticoAEliminar) return;
  
    try {
      const respuesta = await fetch(`http://127.0.0.1:3000/api/eliminardiagnostico/${diagnosticoAEliminar.id_diag}`, {
        method: 'DELETE',
      });
  
      if (!respuesta.ok) {
        throw new Error('Error al eliminar el diagnóstico');
      }
      
      setMostrarModalEliminacion(false);
      await obtenerDiagnosticos();
      setDiagnosticoAEliminar(null);
      setErrorCarga(null);
      setMensajeExito('Diagnostico eliminado correctamente😉'); // Mensaje de confirmación al eliminar exitosamente
      setTimeout(() => setMensajeExito(null), 3000); // Oculta el mensaje automáticamente luego de 3 segundos
    } catch (error) {
      setErrorCarga(error.message);
    }
  };
  
  const abrirModalEliminacion = (diagnostico) => {
    setDiagnosticoAEliminar(diagnostico);
    setMostrarModalEliminacion(true);
  };

  const agregarDetalle = (detalle) => {
    setDetallesNuevos(prev => [...prev, detalle]);
    setNuevoDiagnostico(prev => ({
      ...prev,
      total: prev.total + (detalle.precio)
    }))
  };
  
  const agregarDiagnostico = async () => {
    if (!nuevoDiagnostico.id_cliente || !nuevoDiagnostico.id_equipocomp ||
       !nuevoDiagnostico.id_empleado || !nuevoDiagnostico.descripcion || 
       !nuevoDiagnostico.fecha ||detallesNuevos.length === 0) {
      alert("Por favor, completa todos los campos y agrega al menos un detalle.")
      return;
    }
  
    try {
      const DiagnosticoData = {
        descripcion: nuevoDiagnostico.descripcion,
        id_equipocomp: nuevoDiagnostico.id_equipocomp,
        id_cliente: nuevoDiagnostico.id_cliente,
        id_empleado: nuevoDiagnostico.id_empleado,
        fecha: nuevoDiagnostico.fecha,
        total: detallesNuevos.reduce((sum, d) => sum + (d.precio), 0),
        detalles: detallesNuevos
      };
  
      const respuesta = await fetch('http://127.0.0.1:3000/api/registrardiagnostico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(DiagnosticoData)
      });
  
      if (!respuesta.ok) {
        const errorData = await respuesta.json();
        throw new Error(errorData.message || 'Error al registrar el diagnóstico');
}
  
      await obtenerDiagnosticos();
      setNuevoDiagnostico({descripcion: '', id_equipocomp:'', id_cliente: '', id_empleado: '', fecha: new Date(), total: 0});
      setDetallesNuevos([]);
      setMostrarModalRegistro(false);
      setErrorCarga(null);
      setMensajeExito('Diagnostico registrado correctamente😉'); //Mensaje de confirmación
      setTimeout(() => setMensajeExito(null), 3000);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalActualizacion = async (diagnostico) => {
    setCargandoDetalles(true);
    try {
      const respuestadiagnostico = await fetch(`http://127.0.0.1:3000/api/obtenerdiagnosticoporid/${diagnostico.id_diag}`);
      if (!respuestadiagnostico.ok) throw new Error('Error al cargar el diagnóstico');
      const datosdiagnostico = await respuestadiagnostico.json();
  
      
      const datoscompletos = {
        id_diag: datosdiagnostico.id_diag,
        descripcion: datosdiagnostico.descripcion,
        id_equipocomp: datosdiagnostico.id_equipocomp,
        id_cliente: datosdiagnostico.id_cliente,
        id_empleado: datosdiagnostico.id_empleado,
        cliente: {
          nombre: diagnostico.nombre,
          apellido: diagnostico.apellido
        },
        empleado: {
          nombre: diagnostico.nombre,
          apellido: diagnostico.apellido
        },
        equipo: {
          tipo: diagnostico.tipo,
          marca: diagnostico.marca,
          modelo: diagnostico.modelo,
          color: diagnostico.color
        }
      };
      
      setDiagnosticoAEditar(datoscompletos);
  
      const respuesta = await fetch(`http://127.0.0.1:3000/api/obtenerdetallesdiagnostico/${diagnostico.id_diag}`);
      if (!respuesta.ok) throw new Error('Error al cargar los detalles del diagnóstico');
      const datos = await respuesta.json();
      setDetallesEditados(datos);
  
      setCargandoDetalles(false);
      setMostrarModalActualizacion(true);
    } catch (error) {
      setErrorDetalles(error.message);
      setCargandoDetalles(false);
    }
  };

  const actualizarDiagnostico = async (diagnosticoActualizado, detalles) => {

    if (!diagnosticoActualizado.descripcion || !diagnosticoActualizado.id_equipocomp || !diagnosticoActualizado.id_cliente || !diagnosticoActualizado.id_empleado || detalles.length === 0) {
      setErrorCarga("Por favor, completa todos los campos y agrega al menos un detalle.");
      return;
    }
    try {      
      const diagnosticoData = {
        id_diag: diagnosticoActualizado.id_diag,
        descripcion: diagnosticoActualizado.descripcion,
        id_equipocomp: diagnosticoActualizado.id_equipocomp,
        id_cliente: diagnosticoActualizado.id_cliente,
        id_empleado: diagnosticoActualizado.id_empleado,
        detalles
      };
      console.log(`Enviando ID diagnóstico: ${diagnosticoActualizado.id_diag}`, JSON.stringify(diagnosticoData));
      const respuesta = await fetch(`http://127.0.0.1:3000/api/actualizardiagnostico/${diagnosticoActualizado.id_diag}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(diagnosticoData)
      });
      if (!respuesta.ok) throw new Error('Error al actualizar el diagnóstico');
      await obtenerDiagnosticos();
      setMostrarModalActualizacion(false);
      setDiagnosticoAEditar(null);
      setDetallesEditados([]);
      setMensajeExito('Diagnostico actualizado correctamente😉'); // Mensaje de confirmación al eliminar exitosamente
      setTimeout(() => setMensajeExito(null), 3000); // Oculta el mensaje automáticamente luego de 3 segundos
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    establecerPaginaActual(1);
    
    const filtrados = listaDiagnosticos.filter(
      (diagnostico) =>
        diagnostico.descripcion.toLowerCase().includes(texto) ||
        diagnostico.equipo && diagnostico.equipo.toLowerCase().includes(texto) ||
        diagnostico.cliente && diagnostico.cliente.toLowerCase().includes(texto) ||
        diagnostico.empleado && diagnostico.empleado.toLowerCase().includes(texto)
    );
    setDiagnosticosFiltrados(filtrados);
  };

  // Calcular elementos paginados
  const diagnosticosPaginados = DiagnosticosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Diagnósticos</h4>
        {mensajeExito && ( //para que este visible en pantalla la confirmación
          <Alert variant="success" onClose={() => setMensajeExito(null)} dismissible>
            {mensajeExito}
          </Alert>
        )}
        <Row>
          <Col lg={2} md={4} sm={4} xs={5}>
          <Button variant="primary" onClick={() => setMostrarModalRegistro(true)} style={{ width: "100%" }}>
            Nuevo Diagnóstico
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
        <TablaDiagnostico
          diagnosticos={diagnosticosPaginados} 
          cargando={cargando} 
          error={errorCarga} 
          obtenerDetalles={obtenerDetalles} // Pasar la función
          totalElementos={listaDiagnosticos.length} // Total de elementos
          elementosPorPagina={elementosPorPagina} // Elementos por página
          paginaActual={paginaActual} // Página actual
          establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
          abrirModalEliminacion={abrirModalEliminacion}
          abrirModalActualizacion={abrirModalActualizacion}
        />

        <ModalDetallesDiagnostico
          mostrarModalDetalle={mostrarModalDetalle}
          setMostrarModalDetalle={setMostrarModalDetalle}
          detalles={detallesDiagnostico}
          cargandoDetalles={cargandoDetalles}
          errorDetalles={errorDetalles}
        />

        <RegistroDiagnostico
          mostrarModal={mostrarModalRegistro}
          setMostrarModal={setMostrarModalRegistro}
          nuevoDiagnostico={nuevoDiagnostico}
          setNuevoDiagnostico={setNuevoDiagnostico}
          detallesDiagnostico={detallesNuevos}
          setDetallesDiagnostico={setDetallesNuevos}
          agregarDetalle={agregarDetalle}
          agregarDiagnostico={agregarDiagnostico}
          errorCarga={errorCarga}
          clientes={clientes}
          empleados={empleados}
          equipos={equipos}
          servicios={servicios}
        />

        <EliminacionDiagnostico
          mostrarModalEliminacion={mostrarModalEliminacion}
          setMostrarModalEliminacion={setMostrarModalEliminacion}
          eliminarDiagnostico={eliminarDiagnostico}
        />

        <ActualizacionDiagnostico
          mostrarModal={mostrarModalActualizacion}
          setMostrarModal={setMostrarModalActualizacion}
          diagnostico={diagnosticoAEditar}
          detallesDiagnostico={detallesEditados}
          setDetallesDiagnostico={setDetallesEditados}
          actualizarDiagnostico={actualizarDiagnostico}
          errorCarga={errorCarga}
          clientes={clientes}
          empleados={empleados}
          equipos={equipos}
          servicios={servicios}
        />
      </Container>
    </>
  );
};

export default Diagnosticos;