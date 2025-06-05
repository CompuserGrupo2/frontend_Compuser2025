import { Card, Button } from "react-bootstrap";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const DiagnosticosTotalesEIngresosPorTrimestreyAnio = ({ trimestre, total_diagnosticos, ingresos_totales }) => {
  const chartRef = useRef(null);

  const data = {
    labels: trimestre,
    datasets: [
      {
        label: "Ingresos Totales ($)",
        data: ingresos_totales,
        borderColor: "rgb(255, 50, 50)",
        backgroundColor: "rgba(255, 27, 27, 0.64)",
        yAxisID: "y2",
        type: "line",
        tension: 0.3,
        fill: false,
      },
      {
        label: "Diagnósticos",
        data: total_diagnosticos,
        backgroundColor: "rgba(61, 230, 230, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        yAxisID: "y1",
        type: "bar",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y1: {
        type: "linear",
        position: "left",
        beginAtZero: true,
        title: {
          display: true,
          text: "Diagnósticos",
        },
      },
      y2: {
        type: "linear",
        position: "right",
        beginAtZero: true,
        title: {
          display: true,
          text: "Ingresos ($)",
        },
        grid: {
          drawOnChartArea: false, // para que no se dupliquen las líneas
        },
      },
    },
  };

  const generarPDF = () => {
      const doc = new jsPDF();
      
      // Encabezado 
      doc.setFillColor(28,41,51);
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, "F");
      doc.setTextColor(255,255,255);
      doc.setFontSize(22);
      doc.text("Diagnosticos e ingresos por fecha", doc.internal.pageSize.getWidth() / 2, 20, {align: "center"});
      
      //Capturar gráfico como imagen
      const chartInstance = chartRef.current;
      const chartCanvas = chartInstance?.canvas;
      const chartImage = chartCanvas?.toDataURL("image/png", 1.0);
      
      if(chartImage) {
        doc.addImage(chartImage, "PNG", 14, 40, 180, 100);
      }
     
      //Tabla de datos
      const columnas = ["trimestre", "Diagnóstico", "Ingresos"];
      const filas = trimestre.map((trime, index) => [trime, total_diagnosticos[index], ingresos_totales[index]]);
    
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
      const nombreArchivo = `DiagnósticoseIngresosPorTrimestre_${dia}_${mes}_${anio}.pdf`;
      
      //Guardar PDF
      doc.save(nombreArchivo);
    }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Diagnósticos e Ingresos por Trimestre</Card.Title>
        <div style={{ height: "350px" }}>
          <Chart ref={chartRef} type="bar" data={data} options={options} />
        </div>
        <Button className="btn btn-primary mt-3" onClick={generarPDF}>
          Generar Reporte <i className="bi bi-download"></i>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default DiagnosticosTotalesEIngresosPorTrimestreyAnio;