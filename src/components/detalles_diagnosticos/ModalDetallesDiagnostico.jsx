import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Table, Container, Card } from 'react-bootstrap';

const ModalDetallesDiagnostico = ({
  mostrarModalDetalle,
  setMostrarModalDetalle,
  detalles,
  cargandoDetalles,
  errorDetalles
}) => {
  return (
    <Modal
      show={mostrarModalDetalle}
      onHide={() => setMostrarModalDetalle(false)}
      fullscreen={true}
      aria-labelledby="detalles-diagnostico-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="detalles-diagnostico-modal">Detalles del Diagnóstico</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cargandoDetalles && <div>Cargando detalles...</div>}
        {!cargandoDetalles && !errorDetalles && detalles.length > 0 && (
          <Container>
            <div className="d-none d-md-block">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID Detalle</th>
                    <th>Servicio</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {detalles.map((detalle) => (
                    <tr key={detalle.id_detallediag}>
                      <td>{detalle.id_detallediag}</td>
                      <td>{detalle.descripcion}</td>
                      <td>C${typeof detalle.costo === 'number' ? detalle.costo.toFixed(2) : '0.00'}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <div className="d-block d-md-none">
              {detalles.map((detalle) => (
                <Card key={detalle.id_detallediag} className="mb-2 shadow-sm">
                  <Card.Body>
                    <Card.Title><strong>ID:</strong> {detalle.id_entregaequipo}</Card.Title>
                    <Card.Text><strong>Servicio:</strong> {detalle.descripcion}</Card.Text>
                    <Card.Text><strong>Subtotal:</strong>
                      C${typeof detalle.costo === 'number' ? detalle.costo.toFixed(2) : '0.00'}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>

          </Container>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModalDetalle(false)}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetallesDiagnostico;