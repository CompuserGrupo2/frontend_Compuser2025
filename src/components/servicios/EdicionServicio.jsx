import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const EdicionServicio = ({
  mostrarModalEdicion,
  setMostrarModalEdicion,
  servicioEditado,
  manejarCambioInputEdicion,
  actualizarServicio,
  errorCarga,
}) => {

  const validacionFormulario = () => {
    return(
      servicioEditado?.descripcion.trim() !== "" 
    );
  };

  const validarNumeros = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    // Permitir solo números (0-9), retroceso, borrar y tabb
    if(
      (charCode < 48 || charCode > 57) && // Números (0-9)
      charCode !== 8 && //Retroceso
      charCode !== 46 && //Borrar
      charCode !== 9 //Tab
    ) {
      e.preventDefault(); //Evita que se escriba el carácter
    }
  };

  return (
    <Modal show={mostrarModalEdicion} onHide={() => setMostrarModalEdicion(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Servicio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formDescripcionServicio">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="textarea"
              rows={3}
              name="descripcion"
              value={servicioEditado?.descripcion || ''}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa la descripción del servicio (máx. 80 caracteres)"
              maxLength={80}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCostoServicio">
            <Form.Label>Costo</Form.Label>
            <Form.Control
              type="number"
              name="costo"
              value={servicioEditado?.costo || ''}
              onChange={manejarCambioInputEdicion}
              onKeyDown={validarNumeros}
              placeholder="Ingresa el costo del servicio"
              min={0}
              step={0.01}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formImagenServicio">
            <Form.Label>Imagen</Form.Label>
            {servicioEditado?.imagen && (
              <div>
                <img
                  src={`data:image/png;base64,${servicioEditado.imagen}`}
                  alt="Imagen actual"
                  style={{ maxWidth: '100px', marginBottom: '10px' }}
                />
              </div>
            )}
            <Form.Control
              type="file"
              name="imagen"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    manejarCambioInputEdicion({
                      target: { name: 'imagen', value: reader.result.split(',')[1] }
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </Form.Group>
          {errorCarga && (
            <div className="text-danger mt-2">{errorCarga}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setMostrarModalEdicion(false);
        }}>
          Cancelar
        </Button>
        <Button variant="primary" disabled={!validacionFormulario()} onClick={actualizarServicio}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EdicionServicio;