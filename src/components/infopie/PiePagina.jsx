import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const PiePagina = () => {
  return (
    <footer className="bg-light py-3">
      <Container>
        <Row>
          <Col 
            xs={{ order: 2, span: 12 }} 
            sm={{ order: 2, span: 12 }} 
            md={{ order: 2, span: 12 }} 
            lg={{ order: 1, span: 6 }} 
            className="text-center text-lg-start"
          >
            <p>Compuser, {new Date().getFullYear()}. ©</p>
          </Col>
          <Col 
            xs={{ order: 1, span: 12 }} 
            sm={{ order: 1, span: 12 }} 
            md={{ order: 1, span: 12 }} 
            lg={{ order: 2, span: 6 }} 
            className="text-center text-lg-end"
          >
            <Button
              variant="link"
              href="https://www.tiktok.com/@ldavidor7?_t=ZM-8wxgxqvswCL&_r=1"
              target="_blank"
            >
              <i className="bi bi-tiktok"></i> Tiktok
            </Button>
            <Button
              variant="link"
              href="https://www.instagram.com/_thyiris?igsh=MWJvbXk4ZWV4aHhvMQ=="
              target="_blank"
            >
              <i className="bi bi-instagram"></i> Instagram
            </Button>
            <Button
              variant="link"
              href="https://www.facebook.com/share/15YmzYqYM3/"
              target="_blank"
            >
              <i className="bi bi-facebook"></i> Facebook
            </Button>

            <Button
            variant="link"
            href="https://wa.me/+50582878481"
            target="_blank"
            >
              <i className="bi bi-whatsapp"></i> Soporte técnico
            </Button>

          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default PiePagina;