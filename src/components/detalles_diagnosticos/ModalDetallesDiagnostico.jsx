import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Table, Container } from 'react-bootstrap';

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
                    <td>{detalle.servicio}</td>
                    <td>C$ {typeof detalle.costo === 'number' ? detalle.costo.toFixed(2) : '0.00'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
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