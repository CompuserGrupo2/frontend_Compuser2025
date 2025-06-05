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
import GananciasTotalesPorServicios from '../components/graficos/GananciasTotalesPorServicios';
import EquiposIngresadosPorTipoyMarca from '../components/graficos/EquiposIngresadosPorTipoyMarca';
import DiagnosticosPorDia from '../components/graficos/DiagnosticosPorDia';
import PromedioDiagnosticosPorEmpleados from '../components/graficos/PromedioDiagnosticosPorEmpleados';
import DiagnosticosTotalesEIngresosPorTrimestreyAnio from '../components/graficos/DiagnosticosTotalesEIngresosPorTrimestreyAnio';
import ClientesConMasDeTresDiagnosticos from '../components/graficos/ClientesConMasDeTresDiagnosticos';
import ServiciosPorCliente from '../components/graficos/ServiciosPorClientes';
import ClientesConMasDiagnosticosUltimoAnio from '../components/graficos/ClientesConMasDiagnosticosUltimoAnio';
import ServiciosMayorCostoPromedio from '../components/graficos/ServiciosMayorCostoPromedio';
import DiagnosticosPorTrimestreyAnio from '../components/graficos/DiagnosticosPorTrimestreyAnio';
import DiagnosticosPorMesesRecientes from '../components/graficos/DiagnosticosPorMesesRecientes';
import IngresosPorEmpleados from '../components/graficos/IngresosPorEmpleado';

import ChatIA from '../components/chat/ChatIA';

const Estadisticas = () => {

  const [mostrarChatModal, setMostrarChatModal] = useState(false); // Estado para el modal

  const [dias, setDias] = useState([]);
  const [total_diagnosticosdias, setTotalesPorDias] = useState([]);

  const [meses, setMeses] = useState([]);
  const [total_diagnosticos, setTotalesPorMes] = useState([]);

  const [ingresos_mensuales, setIngresosMensuales] = useState([]);

  const [empleados, setEmpleados] = useState([]);
  const [totalesPorEmpleados, setTotalesPorEmpleados] = useState([]);
  const [promedio_mensual, setPromedio_mensual] = useState([]);

  const [empleadosyanio, setEmpleadosyanio] = useState([]);
  const [totalesPorEmpleadosyanio, setTotalesPorEmpleadosyanio] = useState([]);

  const [clientes, setClientes] = useState([]);
  const [totalesPorClientes, setTotalesPorClientes] = useState([]);

  const [clientesFrecuentes, setClientesFrecuentes] = useState([]);
  const [totalesPorClientesFrecuentes, setTotalesPorClientesFrecuentes] = useState([]);

  const [equipos, setEquipos] = useState([]);
  const [CantidadEquipos, setCantidadEquipos] = useState([]);
  const [totalesPorEquipos, setTotalesPorEquipos] = useState([]);
  const [total_ingresados, setTotal_ingresados] = useState([]);

  const [descripcion, setDescripcion] = useState([]);
  const [veces_utilizado, setVeces_utilizado] = useState([]);

  const [ingreso_total, setIngreso_total] = useState([]);

  const [trimestre, setTrimestre] = useState([]);
  const [total_diagnosticostrimestre, setTotal_diagnosticostrimestre] = useState([]);
  const [ingresos_totales, setIngresos_totales] = useState([]);

  const [clientesSer, setClientesSer] = useState([]);
  const [ServiciosCli, setServiciosCli] = useState([]);

  const [cliente, setCliente] = useState([]);
  const [total_diagnosticos_ultimo_anio, settotal_diagnosticos_ultimo_anio] = useState([]);

  const [servicios, setServicios] = useState([]);
  const [costo_promedio, setcosto_promedio] = useState([]);

  const [trimestreanio, settrimestreanio] = useState([]);
  const [total_diagnosticos_trimestre, settotal_diagnosticos_trimestre] = useState([]);

  const [nombre_mes, setNombre_mes] = useState([]);
  const [total_diagnosticosmes, setTotal_diagnosticosmes] = useState([]);

  const [ingresosEmpleados, setingresosEmpleados] = useState([]);
  const [total_ingresos_generados, setTotal_ingresos_generados] = useState([]);

  useEffect(() => {
    cargaDiagnosticosPorMes();
    cargaGananciasMensuales();
    cargaDiagnosticosporEmpleados();
    cargaDiagnosticosporEmpleadosPorAnio();
    cargaDiagnosticosporClientes();
    cargaEquiposPorTipoyMarca();
    cargaDiagnosticosPorEquipos();
    cargaCantidadUsosPorServicio();
    cargaGananciasTotalesPorServicios();
    cargaEquiposIngresadosPorTipoyMarca();
    cargaDiagnosticosPorDias();
    cargaPromedioDiagnosticosporEmpleados();
    cargaDiagnosticosTotalesEIngresosPorTrimestreyAnio();
    cargaClientesConMasDeTresDiagnosticos();
    cargaServiciosPorClientes();
    cargaClientesConMasDiagnosticosUltimoAnio();
    cargaServiciosMayorCostoPromedio();
    cargaDiagnosticosPorTrimestreyAnio();
    cargaDiagnosticosPorMesesRecientes();
    cargaIngresosPorEmpleado();
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
    console.error('Error al cargar Ganancias:', error);
    alert('Error al cargar Ganancias: ' + error.message);
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
    console.error('Error al cargar Equipos:', error);
    alert('Error al cargar Equipos: ' + error.message);
  }
  };

  const cargaDiagnosticosPorEquipos = async () => {
  try{
    const response = await fetch('http://127.0.0.1:3000/api/diagnosticosporequipos');
    const data = await response.json();

    setEquipos(data.map(item => `${item.tipo} ${item.marca} ${item.modelo}`));
    setTotalesPorEquipos(data.map(item => item.total_diagnosticos));
  } catch (error) {
    console.error('Error al cargar Equipos:', error);
    alert('Error al cargar Equipos: ' + error.message);
  }
  };

  const cargaCantidadUsosPorServicio = async () => {
  try{
    const response = await fetch('http://127.0.0.1:3000/api/cantidadusosporservicio');
    const data = await response.json();

    setDescripcion(data.map(item => `${item.descripcion}`));
    setVeces_utilizado(data.map(item => item.veces_utilizado));
  } catch (error) {
    console.error('Error al cargar servicios:', error);
    alert('Error al cargar servicios: ' + error.message);
  }
  };

  const cargaGananciasTotalesPorServicios = async () => {
  try{
    const response = await fetch('http://127.0.0.1:3000/api/gananciastotalesporservicios');
    const data = await response.json();

    setDescripcion(data.map(item => `${item.descripcion}`));
    setIngreso_total(data.map(item => item.ingreso_total));
  } catch (error) {
    console.error('Error al cargar Ganancias:', error);
    alert('Error al cargar Ganancias: ' + error.message);
  }
  };

  const cargaEquiposIngresadosPorTipoyMarca = async () => {
  try{
    const response = await fetch('http://127.0.0.1:3000/api/equiposingresadosportipoymarca');
    const data = await response.json();

    setEquipos(data.map(item => `${item.tipo} ${item.marca}`));
    setTotal_ingresados(data.map(item => item.total_ingresados));
  } catch (error) {
    console.error('Error al cargar Equipos:', error);
    alert('Error al cargar Equipos: ' + error.message);
  }
  };

  const cargaDiagnosticosPorDias = async () => {
  try {
    const response = await fetch('http://127.0.0.1:3000/api/diagnosticospordia');
    const data = await response.json();

    const diasMap = {
      'Monday': 'Lunes',
      'Tuesday': 'Martes',
      'Wednesday': 'Miércoles',
      'Thursday': 'Jueves',
      'Friday': 'Viernes',
      'Saturday': 'Sábado',
      'Sunday': 'Domingo',
    };

      setDias(data.map(item => diasMap[item.dia_semana] || 'Desconocido'));
      setTotalesPorDias(data.map(item => item.total_diagnosticos));
    } catch (error) {
      console.error('Error al cargar diagnósticos:', error);
      alert('Error al cargar diagnósticos: ' + error.message);
    }
  };

  const cargaDiagnosticosTotalesEIngresosPorTrimestreyAnio = async () => {
    try{
      const response = await fetch('http://127.0.0.1:3000/api/diagnosticostotaleseingresosportrimestreyanio');
      const data = await response.json();

      setTrimestre(data.map(item => `${item.año} ${item.trimestre}`));
      setTotal_diagnosticostrimestre(data.map(item => item.total_diagnosticos));
      setIngresos_totales(data.map(item => item.ingresos_totales));
    } catch (error) {
      console.error('Error al cargar diagnósticos o ingresos:', error);
      alert('Error al cargar diagnósticos o ingresos: ' + error.message);
    }
  };

  const cargaPromedioDiagnosticosporEmpleados = async () => {
    try{
      const response = await fetch('http://127.0.0.1:3000/api/promediodiagnosticosporempleados');
      const data = await response.json();

      setEmpleados(data.map(item => `${item.nombre} ${item.apellido}`));
      setPromedio_mensual(data.map(item => item.promedio_mensual));
    } catch (error) {
      console.error('Error al cargar diagnósticos:', error);
      alert('Error al cargar diagnósticos: ' + error.message);
    }
  };

  const cargaClientesConMasDeTresDiagnosticos = async () => {
    try{
      const response = await fetch('http://127.0.0.1:3000/api/clientesconmasdetresdiagnosticos');
      const data = await response.json();

      setClientesFrecuentes(data.map(item => `${item.nombre} ${item.apellido}`));
      setTotalesPorClientesFrecuentes(data.map(item => item.total_diagnosticos));
    } catch (error) {
      console.error('Error al cargar clientes:', error);
      alert('Error al cargar clientes: ' + error.message);
    }
  };

  const cargaServiciosPorClientes = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/api/serviciosporclientes');
      const data = await response.json();

      // Agrupar por cliente
      const resumen = {};

      data.forEach(item => {
        const cliente = `${item.nombre} ${item.apellido}`;
        if (!resumen[cliente]) {
          resumen[cliente] = 0;
        }
        resumen[cliente] += item.veces_utilizado;
      });

      const clientes = Object.keys(resumen);
      const servicios = Object.values(resumen);

      setClientesSer(clientes);   // Eje X del gráfico
      setServiciosCli(servicios); // Valores numéricos del gráfico
    } catch (error) {
      console.error('Error al cargar servicios por clientes:', error);
      alert('Error al cargar servicios por clientes: ' + error.message);
    }
  };

  const cargaClientesConMasDiagnosticosUltimoAnio = async () => {
    try{
      const response = await fetch('http://127.0.0.1:3000/api/clientesconmasdiagnosticosultimoanio');
      const data = await response.json();

      setCliente(data.map(item => `${item.nombre} ${item.apellido}`));
      settotal_diagnosticos_ultimo_anio(data.map(item => item.total_diagnosticos_ultimo_anio));
    } catch (error) {
      console.error('Error al cargar clientes:', error);
      alert('Error al cargar clientes: ' + error.message);
    }
  };

  const cargaServiciosMayorCostoPromedio = async () => {
    try{
      const response = await fetch('http://127.0.0.1:3000/api/serviciosmayorcostopromedio');
      const data = await response.json();

      setServicios(data.map(item => item.servicios));
      setcosto_promedio(data.map(item => item.costo_promedio));
    } catch (error) {
      console.error('Error al cargar clientes:', error);
      alert('Error al cargar clientes: ' + error.message);
    }
  };

  const cargaDiagnosticosPorTrimestreyAnio = async () => {
    try{
      const response = await fetch('http://127.0.0.1:3000/api/diagnosticosportrimestreyanio');
      const data = await response.json();

      settrimestreanio(data.map(item => `${item.año} Trim N°${item.trimestre}`));
      settotal_diagnosticos_trimestre(data.map(item => item.total_diagnosticos_trimestre));
    } catch (error) {
      console.error('Error al cargar clientes:', error);
      alert('Error al cargar clientes: ' + error.message);
    }
  };

  const cargaDiagnosticosPorMesesRecientes = async () => {
    try{
      const response = await fetch('http://127.0.0.1:3000/api/diagnosticospormesesrecientes');
      const data = await response.json();

    const mesesMap = {
      'January': 'Enero',
      'February': 'Febrero',
      'March': 'Marzo',
      'April': 'Abril',
      'May': 'Mayo',
      'June': 'Junio',
      'July': 'Julio',
      'August': 'Agosto',
      'September': 'Septiembre',
      'October': 'Octubre',
      'November': 'Noviembre',
      'December': 'Diciembre',
    };

      setNombre_mes(data.map(item => mesesMap[item.nombre_mes] || 'Desconocido'));
      setTotal_diagnosticosmes(data.map(item => item.total_diagnosticos));
    } catch (error) {
      console.error('Error al cargar Meses:', error);
      alert('Error al cargar Meses: ' + error.message);
    }
  };

  const cargaIngresosPorEmpleado = async () => {
    try{
      const response = await fetch('http://127.0.0.1:3000/api/ingresosgeneradosporempleado');
      const data = await response.json();

      setingresosEmpleados(data.map(item => `${item.nombre} ${item.apellido}`));
      setTotal_ingresos_generados(data.map(item => item.total_ingresos_generados));
    } catch (error) {
      console.error('Error al cargar Empleados:', error);
      alert('Error al cargar Empleados: ' + error.message);
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
        <DiagnosticosTotalesEIngresosPorTrimestreyAnio trimestre={trimestre} total_diagnosticos={total_diagnosticostrimestre} ingresos_totales={ingresos_totales} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <DiagnosticosPorMes meses={meses} total_diagnosticos={total_diagnosticos} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <DiagnosticosPorMesesRecientes nombre_mes={nombre_mes} total_diagnosticos={total_diagnosticosmes} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <DiagnosticosPorDia dias={dias} total_diagnosticos={total_diagnosticosdias} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <DiagnosticosPorCliente clientes={clientes} total_diagnosticos={totalesPorClientes} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <ClientesConMasDeTresDiagnosticos clientes={clientesFrecuentes} total_diagnosticos={totalesPorClientesFrecuentes} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <DiagnosticosPorEmpleados empleados={empleados} total_diagnosticos={totalesPorEmpleados} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <PromedioDiagnosticosPorEmpleados empleados={empleados} promedio_mensual={promedio_mensual} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <DiagnosticosPorEmpleadosPorAnio empleados={empleadosyanio} total_diagnosticos={totalesPorEmpleadosyanio} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <IngresosPorEmpleados empleados={ingresosEmpleados} total_ingresos_generados={total_ingresos_generados} />
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
        <EquiposIngresadosPorTipoyMarca equipos={equipos} total_ingresados={total_ingresados} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <CantidadUsosPorServicio descripcion={descripcion} veces_utilizado={veces_utilizado} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <GananciasTotalesPorServicios descripcion={descripcion} ingreso_total={ingreso_total} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <ServiciosPorCliente clientes={clientesSer} servicio={ServiciosCli} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <ServiciosMayorCostoPromedio servicios={servicios} costo_promedio={costo_promedio} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <ClientesConMasDiagnosticosUltimoAnio cliente={cliente} total_diagnosticos_ultimo_anio={total_diagnosticos_ultimo_anio} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <DiagnosticosPorTrimestreyAnio trimestreanio={trimestreanio} total_diagnosticos_trimestre={total_diagnosticos_trimestre} />
        </Col>
        
      </Row>
    </Container>
  );
};

export default Estadisticas;