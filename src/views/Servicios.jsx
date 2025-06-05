import React, { useState, useEffect } from 'react';
import TablaServicios from '../components/servicios/TablaServicios'; // Importa el componente de tabla
import RegistroServicio from '../components/servicios/RegistroServicio';
import EliminacionServicio from '../components/servicios/EliminacionServicio';
import EdicionServicio from '../components/servicios/EdicionServicio';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';
import { Container, Button, Row, Col, Alert } from "react-bootstrap";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';



const Servicios = () => {

  const [listaServicios, setListaServicios] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);            // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);        // Maneja errores de la petición

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoServicio, setNuevoServicio] = useState({
    descripcion: '', costo: '', imagen: ''
  });

  //Busqueda
  const [serviciosFiltrados, setServiciosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  //Paginación
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 3; // Número de elementos por página
  
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

    if (!nuevoServicio.descripcion || !nuevoServicio.costo || !nuevoServicio.imagen) {
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
    if (!servicioEditado?.descripcion || !servicioEditado?.costo || !servicioEditado.imagen)
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
          imagen: servicioEditado.imagen
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


  const generarPDFServicios = () => {
    const doc = new jsPDF();

    //Encabezado del PDF
    doc.setFillColor(28, 41, 51);
    doc.rect(0, 0, 220, 30, 'F'); //ancho completo, alto 30

    //Titulo centrado con texto blanco
    doc.setTextColor(255, 255, 255); //Color del titulo
    doc.setFontSize(28);
    doc.text("Lista de Productos", doc.internal.pageSize.getWidth() / 2, 18, { align: "center" });

    const columnas = ["ID", "Descripción", "Costo"];
    const filas = serviciosFiltrados.map((servicio) => [
      servicio.id_ser,
      servicio.descripcion,
      `C$ ${servicio.costo}`,
    ]);

    //Marcador para mostrar el total de páginas
    const totalPaginas = "{total_pages_count_string}";

    //Configuración de la tabla
    autoTable(doc, {
      head: [columnas],
      body: filas,
      startY: 40,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 2 },
      margin: { top: 20, left: 14, right: 14 },
      tableWidth: "auto", //Ajuste de ancho automatico
      columnStyles: {
        0: {cellWidth: 'auto' }, //Ajuste de ancho automatico
        1: {cellWidth: 'auto' },
        2: {cellWidth: 'auto' },
      },
      pageBreak: "auto",
      rowPageBreak: "auto",
      //Hook que se ejecuta al dibujar cada página
      didDrawPage: function (data) {
        //Altura y ancho de la ágina actual
        const alturaPagina = doc.internal.pageSize.getHeight();
        const anchoPagina = doc.internal.pageSize.getWidth();

        //Número de página actual
        const numeroPagina = doc.internal.getNumberOfPages();

        //Definir texto de número de página en el centro del documento
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0,);
        const piePagina = `Página ${numeroPagina} de ${totalPaginas}`;
        doc.text(piePagina, anchoPagina / 2 + 15, alturaPagina - 10, { align: "center" });
      },
    });

    //Actualizar el marcador con el total real de páginas
    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPaginas);
    }

    //Guardar el PDF con un nombre basado en la fecha actual
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    const nombreArchivo = `servicios_${dia}_${mes}_${anio}.pdf`;

    doc.save(nombreArchivo);
  }

  const generarPDFDetalleServicio = (servicio) => {
    const pdf = new jsPDF();
    const anchoPagina = pdf.internal.pageSize.getWidth();

    //Encabezado
    pdf.setFillColor(28, 41, 51);
    pdf.rect (0,0, 220, 30, 'F');
    pdf.setTextColor(255,255,255);
    pdf.setFontSize(22);
    pdf.text(servicio.descripcion, anchoPagina / 2, 18, { align: "center" });

    let posicionY = 50;

    if (servicio.imagen) {
      const propiedadesImagen = pdf.getImageProperties(servicio.imagen);
      const anchoImagen = 100;
      const altoImagen = (propiedadesImagen.height * anchoImagen) / propiedadesImagen.width;
      const posicionX = (anchoPagina - anchoImagen) / 2;

      pdf.addImage(servicio.imagen, 'JPEG', posicionX, 40, anchoImagen, altoImagen);
      posicionY = 40 + altoImagen + 10;
    }

    pdf.setTextColor(0,0,0);
    pdf.setFontSize(14);

    pdf.text(`Costo: C$ ${servicio.costo}`, anchoPagina / 2, posicionY , { align: "center" });

    pdf.save(`${servicio.descripcion}.pdf`);
  }

  const exportarExcelServicio = () => {
  // Estructura de datos para la hoja Excel
  const datos = serviciosFiltrados.map((servicio) => ({
    ID: servicio.id_ser,
    Descripcion: servicio.descripcion,
    Costo: parseFloat(servicio.costo)
  }));

  // Crear hoja desde JSON
  const hoja = XLSX.utils.json_to_sheet(datos);

  // Calcular el ancho de cada columna
  const encabezados = Object.keys(datos[0]);
  const colWidths = encabezados.map((col) => {
    const maxLength = Math.max(
      col.length, // longitud del encabezado
      ...datos.map(row => String(row[col]).length) // longitud máxima de los datos
    );
    return { wch: maxLength + 2 }; // +2 de margen
  });

  // Asignar los anchos a la hoja
  hoja['!cols'] = colWidths;

  // Crear libro y agregar hoja
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, 'Servicios');

  // Crear el archivo binario
  const excelBuffer = XLSX.write(libro, { bookType: 'xlsx', type: 'array' });

  // Nombre del archivo con fecha
  const fecha = new Date();
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const anio = fecha.getFullYear();
  const nombreArchivo = `Servicios_${dia}_${mes}_${anio}.xlsx`;

  // Guardar archivo
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, nombreArchivo);
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
            <Button variant="primary"
            onClick={() => setMostrarModal(true)}
            style={{ width: "100%" }}>
              Nuevo Servicio
            </Button>
          </Col>
          <Col lg={2} md={3} sm={3} xs={4}>
            <Button
              className="mb-3"
              onClick={generarPDFServicios}
              variant='danger'
              style={{ width: "100%" }}
            >
              Generar reporte PDF
            </Button>
          </Col>

          <Col lg={2} md={3} sm={3} xs={4}>
            <Button
              className="mb-3"
              onClick={exportarExcelServicio}
              variant='success'
              style={{ width: "100%" }}
            >
              Generar Excel
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
          generarPDFDetalleServicio={generarPDFDetalleServicio}
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