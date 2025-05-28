import { Card, Button } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const CantidadUsosPorServicio = ({ descripcion, veces_utilizado }) => {
  const data = {
    labels: descripcion, //Nombres de los meses
    datasets: [
      {
        label: 'serivicio',
        data: veces_utilizado, //total de diagnósticos por mes
        backgroundColor: 'rgba(0, 192, 26, 0.75)',
        borderColor: 'rgba(29, 245, 126, 0.5)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Servicios',
        },
      },
    },
  };

  const chartRef = useRef(null);
  
  const generarPDF = () => {
    const doc = new jsPDF();
  
    // Encabezado 
    doc.setFillColor(28,41,51);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, "F");
    doc.setTextColor(255,255,255);
    doc.setFontSize(22);
    doc.text("Reporte de Servicios Utilizados", doc.internal.pageSize.getWidth() / 2, 20, {align: "center"});
  
    //Capturar gráfico como imagen
    const chartInstance = chartRef.current;
    const chartCanvas = chartInstance?.canvas;
    const chartImage = chartCanvas?.toDataURL("image/png", 1.0);
  
    if(chartImage) {
      doc.addImage(chartImage, "PNG", 14, 40, 180, 100);
    }
 
    //Tabla de datos
    const columnas = ["Servicio", "Cantidad de usos"];
    const filas = descripcion.map((descrip, index) => [descrip, veces_utilizado[index]]);

    autoTable(doc, {
      head: [columnas],
      body: filas,
      startY: 150,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 2 },
      margin: { top: 20, left: 14, right: 14 },
    });
  
    //Generar un nombre dinámico para el archivo PDF
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() +1).padStart(2, '0');
    const anio = fecha.getFullYear();
    const nombreArchivo = `ServiciosUtilizados_${dia}_${mes}_${anio}.pdf`;
  
    //Guardar PDF
    doc.save(nombreArchivo);
  }


return (
  <Card style={{ height: "100%" }}>
    <Card.Body>
      <Card.Title>Servicios Utilizados</Card.Title>
      <div style={{ height: "300px", justifyContent: "center", alignItems: "center", display: "flex" }}>
        <Bar ref={chartRef} data={data} options={options} />
      </div>
      <Button className="btn btn-primary mt-3" onClick={generarPDF}>
        Generar Reporte <i className="bi bi-download"></i>
      </Button>
    </Card.Body>
  </Card>
);
};
export default CantidadUsosPorServicio;