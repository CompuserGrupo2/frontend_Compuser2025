import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const RegistroUsuario = ({
  mostrarModal,
  setMostrarModal,
  nuevoUsuario,
  manejarCambioInput,
  agregarUsuario,
  errorCarga, 
}) => {

  const [mostrarContraseña, setMostrarContraseña] = useState(true);
  
    useEffect(() => {
      if (mostrarModal) {
        setMostrarContraseña(false); // Oculta la contraseña cada vez que se abre el modal
      }
    }, [mostrarModal]);

  const validacionFormulario = () => {
    return(
      nuevoUsuario.usuario.trim() !== "" &&
      nuevoUsuario.contraseña.trim() !== ""
    );
  };

  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form autoComplete="off">
          <Form.Group className="mb-3" controlId="formUsuario">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              name="usuario"
              value={nuevoUsuario.usuario}
              onChange={manejarCambioInput}
              placeholder="Ingresa el nombre de usuario (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formContraseña">
            <Form.Label>Contraseña</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type={mostrarContraseña ? "text" : "password"}
                name="contraseña"
                autoComplete="new-password"
                value={nuevoUsuario.contraseña}
                onChange={manejarCambioInput}
                placeholder="Ingresa la contraseña (máx. 20 caracteres)"
                maxLength={20}
                required
              />
              <Button
                variant="primary"
                size="sm"
                className="ms-2 text-white"
                onClick={() => setMostrarContraseña(!mostrarContraseña)}
              >
                {mostrarContraseña ? "Ocultar" : "Mostrar"}
              </Button>
            </div>
          </Form.Group>
          {errorCarga && (
            <div className="text-danger mt-2">{errorCarga}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setMostrarModal(false);
        }}>
          Cancelar
        </Button>
        <Button variant="primary" disabled={!validacionFormulario()} onClick={agregarUsuario}>
          Guardar Usuario
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistroUsuario;