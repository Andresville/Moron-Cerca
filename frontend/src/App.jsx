import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import { Container, Row, Col, Navbar, Button } from "react-bootstrap";
import { MapPin, Facebook, Instagram, Globe } from "lucide-react";

// Componentes propios
import Sidebar from "./components/Sidebar";
import DetalleModal from "./components/DetalleModal";
import { RecenterMap, renderIcono } from "./utils/mapUtils"; // Opcional: mover utilidades a otro archivo

import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import "./App.css";

function App() {
  const [puntos, setPuntos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [catActiva, setCatActiva] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [centro, setCentro] = useState([-34.651, -58.6225]);
  const [showModal, setShowModal] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);

  const verDetalle = (punto) => {
    setSeleccionado(punto);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resEst, resCat] = await Promise.all([
          axios.get("/api/establecimientos/"),
          axios.get("/api/categorias/")
        ]);
        setPuntos(resEst.data);
        setFiltrados(resEst.data);
        setCategorias(resCat.data);
      } catch (err) { console.error(err); }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const resultado = puntos.filter((p) => {
      const coincideCat = catActiva === "Todas" || p.categoria_nombre === catActiva;
      const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                             p.direccion.toLowerCase().includes(busqueda.toLowerCase());
      return coincideCat && coincideNombre;
    });
    setFiltrados(resultado);
  }, [catActiva, busqueda, puntos]);

  return (
    <div className="d-flex flex-column vh-100 bg-white">
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm py-2 px-4 z-index-top">
        <Container fluid>
          <Navbar.Brand href="#" className="fw-bold d-flex align-items-center gap-2">
            <div className="bg-primary p-1 rounded"><MapPin size={24} className="text-white" /></div>
            <span className="tracking-tighter">MORÓN <span className="fw-light">CERCA</span></span>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container fluid className="p-0 flex-grow-1 overflow-hidden">
        <Row className="g-0 h-100">
          <Sidebar 
            busqueda={busqueda} setBusqueda={setBusqueda}
            catActiva={catActiva} setCatActiva={setCatActiva}
            categorias={categorias} filtrados={filtrados}
            setCentro={setCentro} renderIcono={renderIcono}
          />

          <Col md={8} lg={9} className="h-100 position-relative">
            <MapContainer center={centro} zoom={14} style={{ height: "100%", width: "100%" }} zoomControl={false}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <RecenterMap coords={centro} />
              {filtrados.map((p) => (
                <Marker key={p.id} position={[p.latitud, p.longitud]}>
                  <Popup>
                    <div className="text-center">
                      <h6 className="fw-bold">{p.nombre}</h6>
                      <Button size="sm" onClick={() => verDetalle(p)}>Ver Detalles</Button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Col>
        </Row>
      </Container>

      <footer className="bg-light border-top py-2 px-4 shadow-sm z-index-top">
        <Row className="align-items-center">
          <Col md={6} className="text-muted small">&copy; 2025 Municipalidad de Morón</Col>
          <Col md={6} className="text-md-end d-flex justify-content-md-end gap-3 mt-2 mt-md-0">
            <a href="#" className="text-muted"><Facebook size={18} /></a>
            <a href="#" className="text-muted"><Instagram size={18} /></a>
            <a href="#" className="text-muted"><Globe size={18} /></a>
          </Col>
        </Row>
      </footer>

      <DetalleModal show={showModal} onHide={() => setShowModal(false)} seleccionado={seleccionado} />
    </div>
  );
}

export default App;