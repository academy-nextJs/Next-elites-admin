import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

const MapClickHandler = ({ onClick }) => {
  useMapEvents({
    click: (e) => {
      onClick?.(e.latlng);
    },
  });
  return null;
};

const MapComponent = ({
  initialLocation,
  initialZoom,
  className,
  children,
  onMapClick,
}) => {
  const lightProps = {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  };
  const darkProps = {
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  };

  return (
    <>
      <MapContainer
        className={`h-100 w-100 rounded ${className}`}
        center={initialLocation}
        zoom={initialZoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={lightProps.url}
        />
        <MapClickHandler onClick={onMapClick} />
        {children}
      </MapContainer>
    </>
  );
};

export default MapComponent;
