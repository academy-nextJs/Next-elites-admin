import { useState } from "react";
import { Marker } from "react-leaflet";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import MapComponent from "../components/map/map";

const CityModal = ({ isOpen, toggle, onSubmit }) => {
  const [cityName, setCityName] = useState("");
  const [location, setLocation] = useState(null);

  const handleMapClick = (latlng) => {
    setLocation([latlng.lat, latlng.lng]);
  };

  const handleSubmit = () => {
    onSubmit({ area_name: cityName, lat: location.lat, lng: location.lng });
    toggle();
  };

  return (
    <Modal className="yekan" isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>افزودن شهر</ModalHeader>
      <ModalBody>
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
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          تایید
        </Button>
        <Button color="secondary" onClick={toggle}>
          لغو
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CityModal;
