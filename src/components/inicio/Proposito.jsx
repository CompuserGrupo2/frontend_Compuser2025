import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Proposito = () => {
  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-4">

        {/* Objetivos */}
        <Col sm={12} lg={4} className="text-center">
          <i className="bi bi-bullseye" style={{ fontSize: "2rem", color: "#dc3545" }}></i>
          <h5>Objetivos</h5>
          <p>Promover en Compuser el uso de herramientas de inteligencia de negocios para optimizar las finanzas y mejorar la experiencia del cliente, destacando la importancia del análisis de datos y la personalización de servicios en las gestión de la empresa.</p>
        </Col>

        {/* Misión */}
        <Col sm={12} lg={4} className="text-center">
          <i className="bi bi-flag-fill" style={{ fontSize: "2rem", color: "#0d6efd" }}></i>
          <h5>Misión</h5>
          <p>Ofrecer y promover en Compuser soluciones integrales de reparación que optimicen la toma de decisiones, brindando análisis precisos y tendencias que inspiren confianza y satisfacción en la gestión financiera y operativa.</p>
        </Col>

        {/* Visión */}
        <Col sm={12} lg={4} className="text-center">
          <i className="bi bi-eye-fill" style={{ fontSize: "2rem", color: "#198754" }}></i>
          <h5>Visión</h5>
          <p>Ser en Compuser el principal referente en reparación de computadoras e impresoras, anticipando variaciones estacionales y guiando a la empresa hacia un crecimiento sostenible con soluciones analíticas confiables y personalizadas.</p>
        </Col>

      </Row>
    </Container>
  );
};

export default Proposito;