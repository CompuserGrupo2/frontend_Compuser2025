import { Card, Button } from "react-bootstrap";
import { Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const DiagnosticosPorDia = ({ dias, total_diagnosticos }) => {
  const data = {
    labels: dias, //Nombres de los meses
    datasets: [
      {
        label: 'Diagnósticos',
        data: total_diagnosticos, //total de diagnósticos por mes
        backgroundColor: [
          'rgba(70, 252, 228, 0.5)',
          'rgba(255, 86, 227, 0.5)',
          'rgba(252, 255, 86, 0.5)',
          'rgba(112, 87, 253, 0.5)',
          'rgba(255, 201, 102, 0.5)',
          'rgba(100, 255, 86, 0.5)',
          'rgba(255, 38, 38, 0.5)',
        ],
        borderColor: [
          'rgb(79, 182, 250)',
          'rgba(255, 86, 227, 0.5)',
          'rgb(252, 255, 86)',
          'rgb(151, 105, 241)',
          'rgba(233, 178, 59, 0.77)',
          'rgba(35, 235, 68, 0.5)',
          'rgba(235, 20, 20, 0.5)',
        ],
        borderWidth: 2,
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
          text: 'Dias',
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
    doc.text("Reporte de Diagnosticos por Dias", doc.internal.pageSize.getWidth() / 2, 20, {align: "center"});
      
    //Capturar gráfico como imagen
    const chartInstance = chartRef.current;
    const chartCanvas = chartInstance?.canvas;
    const chartImage = chartCanvas?.toDataURL("image/png", 1.0);
      
    if(chartImage) {
      doc.addImage(chartImage, "PNG", 14, 40, 180, 100);
    }
     
    //Tabla de datos
    const columnas = ["dia", "Diagnóstico"];
    const filas = dias.map((dia, index) => [dia, total_diagnosticos[index]]);
    
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
    const nombreArchivo = `DiagnósticosporDia_${dia}_${mes}_${anio}.pdf`;
      
    //Guardar PDF
    doc.save(nombreArchivo);
  }


return (
  <Card style={{ height: "100%" }}>
    <Card.Body>
      <Card.Title>Diagnósticos por Dia</Card.Title>
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
export default DiagnosticosPorDia;