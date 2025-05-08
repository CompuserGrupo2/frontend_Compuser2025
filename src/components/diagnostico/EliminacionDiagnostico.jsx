// components/ventas/ModalEliminacionVenta.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const EliminacionDiagnostico = ({
  mostrarModalEliminacion,
  setMostrarModalEliminacion,
  eliminarDiagnostico,
}) => {
  return (
    <Modal show={mostrarModalEliminacion} onHide={() => setMostrarModalEliminacion(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro de que deseas eliminar este Diagnóstico?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModalEliminacion(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={eliminarDiagnostico}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EliminacionDiagnostico;