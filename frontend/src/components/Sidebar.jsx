import React from 'react';
import { Col, Form, InputGroup, ListGroup, Badge } from 'react-bootstrap';
import { Search, Filter, MapPin } from 'lucide-react';

const Sidebar = ({ busqueda, setBusqueda, catActiva, setCatActiva, categorias, filtrados, setCentro, renderIcono }) => (
  <Col md={4} lg={3} className="border-end d-flex flex-column h-100 bg-white shadow-sm">
    <div className="p-4 bg-light border-bottom">
      <Form.Group className="mb-3">
        <Form.Label className="small fw-bold text-muted text-uppercase mb-2">Buscador</Form.Label>
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
      </Form.Group>

      <Form.Group>
        <Form.Label className="small fw-bold text-muted text-uppercase mb-2">Categoría</Form.Label>
        <Form.Select 
          className="shadow-sm border-2 border-primary-subtle"
          value={catActiva}
          onChange={(e) => setCatActiva(e.target.value)}
        >
          <option value="Todas">Todas las categorías</option>
          {categorias.map(cat => <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>)}
        </Form.Select>
      </Form.Group>
    </div>

    <div className="flex-grow-1 overflow-auto">
      <ListGroup variant="flush">
        {filtrados.map((p) => (
          <ListGroup.Item 
            key={p.id} 
            action 
            onClick={() => setCentro([p.latitud, p.longitud])}
            className="px-4 py-3 hover-border-primary border-bottom transition-all"
          >
            <div className="fw-bold text-dark mb-1">{p.nombre}</div>
            <Badge bg="primary" className="bg-opacity-10 text-primary d-flex align-items-center gap-1 mb-2 w-fit-content px-2 py-1">
              {renderIcono(p.categoria_icono)}
              <span className="fw-medium">{p.categoria_nombre}</span>
            </Badge>
            <div className="small text-muted d-flex align-items-center">
              <MapPin size={12} className="me-1" /> {p.direccion}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  </Col>
);

export default Sidebar;