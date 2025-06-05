import React from "react";
import { Col, Card, Badge, Stack } from 'react-bootstrap';
import { Zoom } from "react-awesome-reveal";

const Tarjeta = ({ indice, descripcion, costo, imagen }) => {
  return (
    <Col lg={3} className="mt-3">
      <Zoom cascade triggerOnce delay={10} duration={600}>
        <Card border="">
          <Card.Img
            variant="top"
            src={`data:image/png;base64,${imagen}`}
          />
          <Card.Body>
            <Card.Title>
              <strong>{descripcion || 'Sin descripción'}</strong>
            </Card.Title>
            <Stack direction="horizontal" gap={2}>
              <Badge pill bg="primary">
                <i className="bi-currency-dollar"></i> {costo.toFixed(2)}
              </Badge>
            </Stack>
          </Card.Body>
        </Card>
      </Zoom>
    </Col>
  );
};

export default Tarjeta;