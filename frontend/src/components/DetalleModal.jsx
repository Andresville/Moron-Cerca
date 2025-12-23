import React from 'react';
import { Modal, Button, Badge, Row, Col } from 'react-bootstrap';
import { MapPin, Phone, Clock, Globe, MessageCircle } from 'lucide-react';

const DetalleModal = ({ show, onHide, seleccionado }) => {
  if (!seleccionado) return null;

  // Formatear número para WhatsApp (asumiendo formato argentino)
  const whatsappUrl = seleccionado.telefono 
    ? `https://wa.me/${seleccionado.telefono.replace(/\D/g, '')}` 
    : null;

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
      <Modal.Footer className="bg-light d-flex justify-content-between">
        <div>
          {seleccionado.website && (
            <Button variant="outline-primary" href={seleccionado.website} target="_blank" className="me-2">
              <Globe size={18} className="me-1" /> Sitio Web
            </Button>
          )}
        </div>
        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={onHide}>Cerrar</Button>
          {whatsappUrl && (
            <Button variant="success" href={whatsappUrl} target="_blank">
              <MessageCircle size={18} className="me-1" /> WhatsApp
            </Button>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DetalleModal;