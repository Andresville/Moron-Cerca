import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import { 
  School, Stethoscope, Pill, Wrench, Landmark, Flame,
  Store, Utensils, Dumbbell, ShieldAlert, Trees, Library, MapPin 
} from "lucide-react";

// Componente para re-centrar el mapa suavemente
export function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 16);
  }, [coords]);
  return null;
}

// Función mapeadora de iconos
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