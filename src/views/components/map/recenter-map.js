import { useEffect } from "react";
import { useMap } from "react-leaflet";

export function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center);
    }
  }, [center, map]);
  return null;
}
