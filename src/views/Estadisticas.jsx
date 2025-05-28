import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import DiagnosticosPorMes from '../components/graficos/DiagnosticosPorMes';
import GananciasMensuales from '../components/graficos/GananciasMensuales';
import DiagnosticosPorEmpleados from '../components/graficos/DiagnosticosPorEmpleados';
import DiagnosticosPorEmpleadosPorAnio from '../components/graficos/DiagnosticosPorEmpleadoPorAnio';
import DiagnosticosPorCliente from '../components/graficos/DiagnosticosPorCliente';
import EquiporPorTipoyMarca from '../components/graficos/EquiposPorTipoyMarca';
import DiagnosticosPorEquipos from '../components/graficos/DiagnosticosPorEquipos';
import CantidadUsosPorServicio from '../components/graficos/CantidadUsosPorServicio';

import ChatIA from '../components/chat/ChatIA';

const Estadisticas = () => {

  const [mostrarChatModal, setMostrarChatModal] = useState(false); // Estado para el modal

  const [meses, setMeses] = useState([]);
  const [total_diagnosticos, setTotalesPorMes] = useState([]);

  const [ingresos_mensuales, setIngresosMensuales] = useState([]);

  const [empleados, setEmpleados] = useState([]);
  const [totalesPorEmpleados, setTotalesPorEmpleados] = useState([]);

  const [empleadosyanio, setEmpleadosyanio] = useState([]);
  const [totalesPorEmpleadosyanio, setTotalesPorEmpleadosyanio] = useState([]);

  const [clientes, setClientes] = useState([]);
  const [totalesPorClientes, setTotalesPorClientes] = useState([]);

  const [equipos, setEquipos] = useState([]);
  const [CantidadEquipos, setCantidadEquipos] = useState([]);
  const [totalesPorEquipos, setTotalesPorEquipos] = useState([]);

  const [descripcion, setDescripcion] = useState([]);
  const [veces_utilizado, setVeces_utilizado] = useState([]);


  useEffect(() => {
    cargaDiagnosticosPorMes();
    cargaGananciasMensuales();
    cargaDiagnosticosporEmpleados();
    cargaDiagnosticosporEmpleadosPorAnio();
    cargaDiagnosticosporClientes();
    cargaEquiposPorTipoyMarca();
    cargaDiagnosticosPorEquipos();
    cargaCantidadUsosPorServicio();
  }, []); 

  const cargaDiagnosticosPorMes = async () => {
  try{
    const response = await fetch('http://127.0.0.1:3000/api/diagnosticospormes');
    const data = await response.json();

    const mesesNombres = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    setMeses(data.map(item => `${mesesNombres[item.mes - 1]} ${item.año}`));
    setTotalesPorMes(data.map(item => item.total_diagnosticos));
  } catch (error) {
    console.error('Error al cargar diagnósticos:', error);
    alert('Error al cargar diagnósticos: ' + error.message);
  }
  };

  const cargaGananciasMensuales = async () => {
  try{
    const response = await fetch('http://127.0.0.1:3000/api/gananciasmensuales');
    const data = await response.json();

    const mesesNombres = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    setMeses(data.map(item => `${mesesNombres[item.mes - 1]} ${item.año}`));
    setIngresosMensuales(data.map(item => item.ingresos_mensuales));
  } catch (error) {
    console.error('Error al cargar diagnósticos:', error);
    alert('Error al cargar diagnósticos: ' + error.message);
  }
  };

  const cargaDiagnosticosporEmpleados = async () => {
  try{
    const response = await fetch('http://127.0.0.1:3000/api/diagnosticosporempleados');
    const data = await response.json();

    setEmpleados(data.map(item => `${item.nombre} ${item.apellido}`));
    setTotalesPorEmpleados(data.map(item => item.total_diagnosticos));
  } catch (error) {
    console.error('Error al cargar diagnósticos:', error);
    alert('Error al cargar diagnósticos: ' + error.message);
  }
  };

  const cargaDiagnosticosporEmpleadosPorAnio = async () => {
  try{
    const response = await fetch('http://127.0.0.1:3000/api/diagnosticosporempleadosporanio');
    const data = await response.json();

    setEmpleadosyanio(data.map(item => `${item.nombre} ${item.apellido} ${item.año}`));
    setTotalesPorEmpleadosyanio(data.map(item => item.total_diagnosticos));
  } catch (error) {
    console.error('Error al cargar diagnósticos:', error);
    alert('Error al cargar diagnósticos: ' + error.message);
  }
  };

  const cargaDiagnosticosporClientes = async () => {
  try{
    const response = await fetch('http://127.0.0.1:3000/api/diagnosticosporcliente');
    const data = await response.json();

    setClientes(data.map(item => `${item.nombre} ${item.apellido}`));
    setTotalesPorClientes(data.map(item => item.total_diagnosticos));
  } catch (error) {
    console.error('Error al cargar diagnósticos:', error);
    alert('Error al cargar diagnósticos: ' + error.message);
  }
  };

  const cargaEquiposPorTipoyMarca = async () => {
  try{
    const response = await fetch('http://127.0.0.1:3000/api/equiposportipoymarca');
    const data = await response.json();

    setEquipos(data.map(item => `${item.tipo} ${item.marca}`));
    setCantidadEquipos(data.map(item => item.cantidad));
  } catch (error) {
    console.error('Error al cargar diagnósticos:', error);
    alert('Error al cargar diagnósticos: ' + error.message);
  }
  };

  const cargaDiagnosticosPorEquipos = async () => {
  try{
    const response = await fetch('http://127.0.0.1:3000/api/diagnosticosporequipos');
    const data = await response.json();

    setEquipos(data.map(item => `${item.tipo} ${item.marca} ${item.modelo}`));
    setTotalesPorEquipos(data.map(item => item.total_diagnosticos));
  } catch (error) {
    console.error('Error al cargar diagnósticos:', error);
    alert('Error al cargar diagnósticos: ' + error.message);
  }
  };

  const cargaCantidadUsosPorServicio = async () => {
  try{
    const response = await fetch('http://127.0.0.1:3000/api/cantidadusosporservicio');
    const data = await response.json();

    setDescripcion(data.map(item => `${item.descripcion}`));
    setVeces_utilizado(data.map(item => item.veces_utilizado));
  } catch (error) {
    console.error('Error al cargar diagnósticos:', error);
    alert('Error al cargar diagnósticos: ' + error.message);
  }
  };
  
  return(
    <Container className='mt-5'>
      <br />
      <h4>Estadísticas</h4>
      <Button 
        variant="primary" 
        className="mb-4"
        onClick={() => setMostrarChatModal(true)}
      >
        Consultar con IA
      </Button>

      <ChatIA mostrarChatModal={mostrarChatModal} setMostrarChatModal={setMostrarChatModal} />
      <Row className='mt-4'>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <DiagnosticosPorMes meses={meses} total_diagnosticos={total_diagnosticos} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <DiagnosticosPorCliente clientes={clientes} total_diagnosticos={totalesPorClientes} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <DiagnosticosPorEmpleados empleados={empleados} total_diagnosticos={totalesPorEmpleados} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <DiagnosticosPorEmpleadosPorAnio empleados={empleadosyanio} total_diagnosticos={totalesPorEmpleadosyanio} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <DiagnosticosPorEquipos equipos={equipos} total_diagnosticos={totalesPorEquipos} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <GananciasMensuales meses={meses} ingresos_mensuales={ingresos_mensuales} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <EquiporPorTipoyMarca equipos={equipos} cantidad={CantidadEquipos} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <CantidadUsosPorServicio descripcion={descripcion} veces_utilizado={veces_utilizado} />
        </Col>
        
      </Row>
    </Container>
  );
};

export default Estadisticas;