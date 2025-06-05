import { Card, Button } from "react-bootstrap";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const DiagnosticosPorTrimestreyAnio = ({ trimestreanio, total_diagnosticos_trimestre }) => {
  const data = {
    labels: trimestreanio,
    datasets: [
      {
        label: 'serivicio',
        data: total_diagnosticos_trimestre,
        backgroundColor: 'rgba(18, 32, 161, 0.75)',
        borderColor: 'rgba(71, 21, 151, 1)',
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
          text: 'Diagnósticos',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Trimestre',
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
    doc.text("Reporte de Diagnósticos por trimestre", doc.internal.pageSize.getWidth() / 2, 20, {align: "center"});
  
    //Capturar gráfico como imagen
    const chartInstance = chartRef.current;
    const chartCanvas = chartInstance?.canvas;
    const chartImage = chartCanvas?.toDataURL("image/png", 1.0);
  
    if(chartImage) {
      doc.addImage(chartImage, "PNG", 14, 40, 180, 100);
    }
 
    //Tabla de datos
    const columnas = ["Trimestre", "Diagnósticos"];
    const filas = trimestreanio.map((trime, index) => [trime, total_diagnosticos_trimestre[index]]);

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
    const nombreArchivo = `DiagnósticosPorTrimestre_${dia}_${mes}_${anio}.pdf`;
  
    //Guardar PDF
    doc.save(nombreArchivo);
  }


return (
  <Card style={{ height: "100%" }}>
    <Card.Body>
      <Card.Title>Diagnósticos por Trimestre</Card.Title>
      <div style={{ height: "300px", justifyContent: "center", alignItems: "center", display: "flex" }}>
        <Line  ref={chartRef} data={data} options={options} />
      </div>
      <Button className="btn btn-primary mt-3" onClick={generarPDF}>
        Generar Reporte <i className="bi bi-download"></i>
      </Button>
    </Card.Body>
  </Card>
);
};
export default DiagnosticosPorTrimestreyAnio;