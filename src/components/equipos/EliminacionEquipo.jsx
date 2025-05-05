import React from "react";
import { Modal, Button } from "react-bootstrap";

const EliminacionEquipo = ({
  mostrarModalEliminacion,
  setMostrarModalEliminacion,
  eliminarEquipo,
}) => {
  return (
    <Modal show={mostrarModalEliminacion} onHide={() => setMostrarModalEliminacion(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro de que deseas eliminar este equipo?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModalEliminacion(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={eliminarEquipo}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EliminacionEquipo;