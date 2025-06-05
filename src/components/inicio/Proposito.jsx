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
          <p>Prueba Objetivo</p>
        </Col>

        {/* Misión */}
        <Col sm={12} lg={4} className="text-center">
          <i className="bi bi-flag-fill" style={{ fontSize: "2rem", color: "#0d6efd" }}></i>
          <h5>Misión</h5>
          <p>Prueba Misión</p>
        </Col>

        {/* Visión */}
        <Col sm={12} lg={4} className="text-center">
          <i className="bi bi-eye-fill" style={{ fontSize: "2rem", color: "#198754" }}></i>
          <h5>Visión</h5>
          <p>Prueba Visión</p>
        </Col>

      </Row>
    </Container>
  );
};

export default Proposito;