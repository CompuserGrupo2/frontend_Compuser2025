import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ResponderCalificacion = ({ show, handleClose, calificacion, onRespuestaExitosa }) => {
  const [respuesta, setRespuesta] = useState('');
  const [mensaje, setMensaje] = useState('');

  const enviarRespuesta = async () => {
    if (!respuesta.trim()) {
      setMensaje('La respuesta no puede estar vacía.');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:3000/api/calificaciones/${calificacion.id_cali}/responder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respuesta }),
      });

      const data = await response.json();
      if (response.ok) {
        setMensaje('✅ Respuesta enviada con éxito');
        setRespuesta('');
        if (onRespuestaExitosa) onRespuestaExitosa();
        handleClose();
      } else {
        setMensaje(`❌ Error: ${data.mensaje}`);
      }
    } catch (error) {
      console.error('Error al enviar respuesta:', error);
      setMensaje('❌ Error de conexión con el servidor.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Responder a Calificación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Comentario del cliente:</strong></p>
        <p>{calificacion.comentario || 'Sin comentario'}</p>

        <Form.Group>
          <Form.Label>Tu respuesta</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            placeholder="Escribe tu respuesta..."
          />
        </Form.Group>

        {mensaje && <div className="alert alert-info mt-2">{mensaje}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        <Button variant="primary" onClick={enviarRespuesta}>Enviar Respuesta</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResponderCalificacion;