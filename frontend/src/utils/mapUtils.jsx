import React, { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { 
  School, Stethoscope, Pill, Wrench, Landmark, Flame,
  Store, Utensils, Dumbbell, ShieldAlert, Trees, Library, MapPin, Navigation 
} from "lucide-react";
import { Button } from "react-bootstrap";
import L from "leaflet";
import "leaflet-routing-machine";

export function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => { map.invalidateSize(); }, 100);
    if (coords && coords[0] && coords[1]) {
      map.flyTo(coords, 16);
    }
  }, [coords, map]);
  return null;
}

export const renderIcono = (iconoSlug) => {
  const iconMap = {
    'fa-school': <School size={16} />,
    'fa-hospital': <Stethoscope size={16} />,
    'fa-pills': <Pill size={16} />,
    'fa-key': <Wrench size={16} />,
    'fa-store': <Store size={16} />,
    'fa-utensils': <Utensils size={16} />,
    'fa-dumbbell': <Dumbbell size={16} />,
    'fa-landmark': <Landmark size={16} />,
    'fa-fire': <Flame size={16} />,
    'fa-shield-alt': <ShieldAlert size={16} />,
    'fa-trees': <Trees size={16} />,
    'fa-library': <Library size={16} />,
  };
  return iconMap[iconoSlug] || <MapPin size={16} />;
};

// COMPONENTE DE RUTA
export function TrazadorRuta({ posicionUsuario, destino }) {
  const map = useMap();

  useEffect(() => {
    if (!posicionUsuario || !destino) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(posicionUsuario[0], posicionUsuario[1]),
        L.latLng(destino[0], destino[1])
      ],
      lineOptions: {
        styles: [{ color: "#0d6efd", weight: 6, opacity: 0.7 }]
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      createMarker: () => null,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [posicionUsuario, destino, map]);

  return null;
}

export function BotonUbicacion({ setCentro, setMiUbicacion }) {
  const map = useMap();

  const localizar = () => {
    map.locate({ setView: true, maxZoom: 16 });
  };

  useMapEvents({
    locationfound(e) {
      const coords = [e.latlng.lat, e.latlng.lng];
      setCentro(coords);
      setMiUbicacion(coords); // Guardamos tu ubicación real para la ruta
      
      map.eachLayer((layer) => {
        if (layer instanceof L.Circle && layer.options.className === 'user-location') {
          map.removeLayer(layer);
        }
      });

      L.circle(e.latlng, { 
        radius: 30, 
        color: '#0d6efd', 
        fillColor: '#0d6efd', 
        fillOpacity: 0.3,
        className: 'user-location'
      }).addTo(map);
    },
    locationerror() {
      alert("No se pudo obtener la ubicación. Activa el GPS.");
    }
  });

  return (
    <Button 
      variant="primary" 
      onClick={localizar}
      className="position-absolute shadow-lg rounded-circle d-flex align-items-center justify-content-center"
      style={{ bottom: '30px', right: '20px', width: '55px', height: '55px', zIndex: 1000, border: '2px solid white' }}
    >
      <Navigation size={24} fill="white" />
    </Button>
  );
}

/**
 * Calcula la distancia en kilómetros entre dos puntos usando la fórmula de Haversine
 */
export const calcularDistancia = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

