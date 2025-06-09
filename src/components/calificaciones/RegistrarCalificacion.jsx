import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const RegistrarCalificacion = ({ show, handleClose, idServicio, onCalificacionExitosa }) => {
  const [clientes, setClientes] = useState([]);
  const [idCliente, setIdCliente] = useState('');
  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/api/obtenerclientes');
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error('Error al obtener clientes:', error);
      }
    };

    if (show) {
      obtenerClientes();
      setMensaje('');
      setIdCliente('');
      setCalificacion(0);
      setComentario('');
    }
  }, [show]);

  const handleStarClick = (valor) => {
    setCalificacion(valor);
  };

  const enviarCalificacion = async () => {
    if (!idCliente) {
      setMensaje('Por favor selecciona tu nombre');
      return;
    }
    if (calificacion === 0) {
      setMensaje('Por favor selecciona una calificación');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:3000/api/registrarcalificacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calidad_servicio: calificacion,
          comentario,
          id_cliente: idCliente,
          id_ser: idServicio
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMensaje('¡Calificación enviada con éxito!');
        if (onCalificacionExitosa) onCalificacionExitosa();
        handleClose(); // Cierra el modal
      } else {
        setMensaje(`Error: ${data.mensaje}`);
      }
    } catch (error) {
      console.error('Error al enviar calificación:', error);
      setMensaje('Error de conexión al servidor.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Calificar servicio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-2">
          <Form.Label>Selecciona tu nombre</Form.Label>
          <Form.Select value={idCliente} onChange={(e) => setIdCliente(e.target.value)}>
            <option value="">-- Seleccionar cliente --</option>
            {clientes.map((cli) => (
              <option key={cli.id_cliente} value={cli.id_cliente}>
                {cli.nombre} {cli.apellido}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Calificación</Form.Label>
          <div>
            {[1, 2, 3, 4, 5].map((valor) => (
              <FaStar
                key={valor}
                size={24}
                color={valor <= calificacion ? '#ffc107' : '#e4e5e9'}
                onClick={() => handleStarClick(valor)}
                style={{ cursor: 'pointer', marginRight: 5 }}
              />
            ))}
          </div>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Comentario (opcional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />
        </Form.Group>

        {mensaje && <div className="alert alert-info mt-2">{mensaje}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        <Button variant="primary" onClick={enviarCalificacion}>Enviar Calificación</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistrarCalificacion;