import { useState } from "react";
import { Marker } from "react-leaflet";
import { Button, FormGroup, Input, Label } from "reactstrap";
import MapComponent from "../components/map/map";
import ReusableModal from "../../@core/common/Modal";

const CityModal = ({ isOpen, toggle, onSubmit }) => {
  const [cityName, setCityName] = useState("");
  const [location, setLocation] = useState(null);

  const handleMapClick = (latlng) => {
    setLocation([latlng.lat, latlng.lng]);
  };

  const handleSubmit = () => {
    onSubmit({ area_name: cityName, lat: location[0], lng: location[1] });
    toggle();
  };

  const bodyContent = (
    <>
      <FormGroup>
        <Label for="cityName">نام شهر</Label>
        <Input
          id="cityName"
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
      </FormGroup>
      <div style={{ height: "300px" }}>
        <MapComponent
          initialLocation={[32, 55]}
          initialZoom={5}
          onMapClick={handleMapClick}
        >
          {location && <Marker position={location} />}
        </MapComponent>
      </div>
    </>
  );

  const footerActions = (
    <>
      <Button color="primary" onClick={handleSubmit}>
        تایید
      </Button>
      <Button color="secondary" onClick={toggle}>
        لغو
      </Button>
    </>
  );

  return (
    <ReusableModal
      isOpen={isOpen}
      toggle={toggle}
      title="افزودن شهر"
      bodyContent={bodyContent}
      footerActions={footerActions}
    />
  );
};

export default CityModal;
