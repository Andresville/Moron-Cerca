import React from 'react';
import { Form, InputGroup, ListGroup, Badge, Row, Col } from 'react-bootstrap';
import { Search, MapPin, Navigation } from 'lucide-react';

const Sidebar = ({ busqueda, setBusqueda, catActiva, setCatActiva, categorias, filtrados, setCentro, renderIcono }) => {
  return (
    <div className="d-flex flex-column h-100 bg-white">
      <div className="p-3 p-md-4 bg-light border-bottom sticky-top">
        <Row className="g-2">
          <Col xs={12} md={12}>
            <Form.Label className="small fw-bold text-muted text-uppercase mb-1 d-none d-md-block">
              Buscador
            </Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text className="bg-white border-end-0">
                <Search size={18} className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                placeholder="¿Qué lugar buscás?"
                className="border-start-0 ps-0"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </InputGroup>
          </Col>

          <Col xs={12} md={12}>
            <Form.Label className="small fw-bold text-muted text-uppercase mb-1 d-none d-md-block">
              Categoría
            </Form.Label>
            <Form.Select 
              className="shadow-sm border-2 border-primary-subtle"
              value={catActiva}
              onChange={(e) => setCatActiva(e.target.value)}
            >
              <option value="Todas">Todas las categorías</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.nombre}>
                  {cat.nombre}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </div>

      <div className="flex-grow-1 overflow-auto bg-white list-container">
        <div className="px-3 py-2 bg-white border-bottom sticky-top z-index-1 d-flex justify-content-between align-items-center">
            <small className="text-muted fw-bold" style={{fontSize: '11px'}}>
                {filtrados.length} LUGARES ENCONTRADOS
            </small>
        </div>
        
        <ListGroup variant="flush">
          {filtrados.map((p) => (
            <ListGroup.Item 
              key={p.id} 
              action 
              onClick={() => setCentro([p.latitud, p.longitud])}
              className="px-3 px-md-4 py-3 hover-border-primary border-bottom transition-all"
            >
              <div className="d-flex justify-content-between align-items-start mb-1">
                <div className="fw-bold text-dark">{p.nombre}</div>
                {/* MOSTRAR DISTANCIA SI EXISTE */}
                {p.distancia && (
                  <Badge bg="light" className="text-primary border border-primary-subtle d-flex align-items-center gap-1">
                    <Navigation size={10} />
                    {p.distancia < 1 
                      ? `${(p.distancia * 1000).toFixed(0)}m` 
                      : `${p.distancia.toFixed(1)}km`}
                  </Badge>
                )}
              </div>
              
              <div className="d-flex align-items-center gap-2 mb-2">
                <Badge 
                  bg="primary" 
                  className="bg-opacity-10 text-primary d-flex align-items-center gap-1 fw-medium px-2 py-1"
                  style={{ border: '1px solid rgba(13, 110, 253, 0.2)' }}
                >
                  {renderIcono(p.categoria_icono)}
                  <span style={{ fontSize: '11px' }}>{p.categoria_nombre}</span>
                </Badge>
              </div>

              <div className="small text-muted d-flex align-items-center">
                <MapPin size={12} className="me-1 text-primary" />
                <span className="text-truncate">{p.direccion}</span>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {filtrados.length === 0 && (
          <div className="p-5 text-center text-muted">
            <p>No se encontraron resultados para esta búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;