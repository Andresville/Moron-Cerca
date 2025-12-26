import React from 'react';
import { Modal, Button, Badge, Row, Col } from 'react-bootstrap';
import { MapPin, Phone, Clock, Globe, MessageCircle, Navigation } from 'lucide-react';

const DetalleModal = ({ show, onHide, seleccionado, miUbicacion, setDestinoRuta }) => {
  if (!seleccionado) return null;

  const whatsappUrl = seleccionado.telefono 
    ? `https://wa.me/${seleccionado.telefono.replace(/\D/g, '')}` 
    : null;

  // Función para activar la ruta y cerrar el modal
  const manejarRuta = () => {
    if (!miUbicacion) {
      alert("Por favor, activa primero tu ubicación con el botón de la brújula en el mapa.");
      return;
    }
    // Seteamos el destino con las coordenadas del lugar
    setDestinoRuta([seleccionado.latitud, seleccionado.longitud]);
    onHide(); // Cerramos el modal para ver el mapa
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="fw-bold text-primary">{seleccionado.nombre}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="p-4">
        <Badge bg="info" className="mb-3 text-uppercase px-2 py-1">
          {seleccionado.categoria_nombre}
        </Badge>
        <p className="lead text-dark">{seleccionado.descripcion || "Sin descripción disponible."}</p>
        <hr />
        <Row className="g-3">
          <Col sm={6}>
            <div className="small text-muted fw-bold text-uppercase">Dirección</div>
            <div className="d-flex align-items-center gap-2">
              <MapPin size={16} className="text-primary"/> {seleccionado.direccion}
            </div>
          </Col>
          <Col sm={6}>
            <div className="small text-muted fw-bold text-uppercase">Horarios</div>
            <div className="d-flex align-items-center gap-2">
              <Clock size={16} className="text-muted"/> {seleccionado.horario || "Consultar"}
            </div>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer className="bg-light d-flex justify-content-between flex-wrap gap-2">
        <div className="d-flex gap-2">
          {seleccionado.website && (
            <Button variant="outline-primary" href={seleccionado.website} target="_blank">
              <Globe size={18} className="me-1" /> Web
            </Button>
          )}
          {whatsappUrl && (
            <Button variant="outline-success" href={whatsappUrl} target="_blank">
              <MessageCircle size={18} className="me-1" /> WhatsApp
            </Button>
          )}
        </div>

        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={onHide}>Cerrar</Button>
          {/* BOTÓN NUEVO: ¿Cómo llegar? */}
          <Button variant="primary" onClick={manejarRuta}>
            <Navigation size={18} className="me-1" /> ¿Cómo llegar?
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DetalleModal;

