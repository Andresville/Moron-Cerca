import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import { Container, Row, Col, Navbar, Button } from "react-bootstrap";
import { MapPin, Facebook, Instagram, Globe } from "lucide-react";
import L from "leaflet";

// Componentes propios
import Sidebar from "./components/Sidebar";
import DetalleModal from "./components/DetalleModal";
import { RecenterMap, renderIcono, BotonUbicacion, TrazadorRuta, calcularDistancia } from "./utils/mapUtils";

import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import "./App.css";

// Fix para iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function App() {
  const [puntos, setPuntos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [catActiva, setCatActiva] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [centro, setCentro] = useState([-34.651, -58.6225]);
  const [showModal, setShowModal] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  
  const [destinoRuta, setDestinoRuta] = useState(null);
  const [miUbicacion, setMiUbicacion] = useState(null);

  const verDetalle = (punto) => {
    setSeleccionado(punto);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resEst, resCat] = await Promise.all([
          axios.get("/api/establecimientos/"),
          axios.get("/api/categorias/"),
        ]);
        setPuntos(resEst.data);
        setFiltrados(resEst.data);
        setCategorias(resCat.data);
      } catch (err) {
        console.error("Error al cargar datos:", err);
      }
    };
    fetchData();
  }, []);

  // LÓGICA DE FILTRADO Y ORDENAMIENTO POR DISTANCIA
  useEffect(() => {
    let resultado = puntos.map(p => {
      // Calculamos distancia si el usuario activó GPS
      const dist = miUbicacion 
        ? calcularDistancia(miUbicacion[0], miUbicacion[1], p.latitud, p.longitud)
        : null;
      return { ...p, distancia: dist };
    });

    // Filtrado
    resultado = resultado.filter((p) => {
      const coincideCat = catActiva === "Todas" || p.categoria_nombre === catActiva;
      const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                             p.direccion.toLowerCase().includes(busqueda.toLowerCase());
      return coincideCat && coincideNombre;
    });

    // Ordenamiento: El más cercano primero
    if (miUbicacion) {
      resultado.sort((a, b) => a.distancia - b.distancia);
    }

    setFiltrados(resultado);
  }, [catActiva, busqueda, puntos, miUbicacion]);

  return (
    <div className="d-flex flex-column vh-100 bg-white overflow-hidden">
      <Navbar bg="dark" variant="dark" className="py-2 px-3 z-index-top shadow-sm">
        <Container fluid>
          <Navbar.Brand className="fw-bold d-flex align-items-center gap-2">
            <MapPin size={20} className="text-primary" />
            <span style={{ fontSize: "1.1rem", letterSpacing: "-0.5px" }}>MORÓN CERCA</span>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container fluid className="p-0 flex-grow-1 position-relative overflow-hidden">
        <Row className="g-0 h-100 flex-column-mobile d-flex flex-md-row">
          <Col md={4} lg={3} className="sidebar-container border-end bg-white shadow-sm d-flex flex-column">
            <Sidebar
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              catActiva={catActiva}
              setCatActiva={setCatActiva}
              categorias={categorias}
              filtrados={filtrados}
              setCentro={setCentro}
              renderIcono={renderIcono}
            />
          </Col>

          <Col md={8} lg={9} className="map-wrapper flex-grow-1 position-relative">
            <MapContainer center={centro} zoom={14} style={{ height: "100%", width: "100%" }} zoomControl={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <RecenterMap coords={centro} />

              <TrazadorRuta posicionUsuario={miUbicacion} destino={destinoRuta} />

              {filtrados.map((p) => (
                <Marker key={p.id} position={[p.latitud, p.longitud]}>
                  <Popup>
                    <div className="text-center p-1">
                      <h6 className="fw-bold mb-1">{p.nombre}</h6>
                      <p className="small text-muted mb-2">{p.direccion}</p>
                      <Button size="sm" variant="primary" className="w-100" onClick={() => verDetalle(p)}>
                        Ver Detalles
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              ))}

              <BotonUbicacion setCentro={setCentro} setMiUbicacion={setMiUbicacion} />
            </MapContainer>
          </Col>
        </Row>
      </Container>

      <footer className="bg-light border-top py-2 px-4 shadow-sm z-index-top mt-auto">
        <Row className="align-items-center">
          <Col xs={7} md={6} className="text-muted small">&copy; 2025 Municipalidad de Morón</Col>
          <Col xs={5} md={6} className="text-end d-flex justify-content-end gap-3">
            <a href="#" className="text-muted"><Facebook size={18} /></a>
            <a href="#" className="text-muted"><Instagram size={18} /></a>
            <a href="#" className="text-muted"><Globe size={18} /></a>
          </Col>
        </Row>
      </footer>

      <DetalleModal
        show={showModal}
        onHide={() => setShowModal(false)}
        seleccionado={seleccionado}
        miUbicacion={miUbicacion}
        setDestinoRuta={setDestinoRuta}
      />
    </div>
  );
}

export default App;