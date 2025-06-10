import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import MapComponent from "../components/map/map";

const EditCityModal = ({ isOpen, toggle, cityData, onSubmit }) => {
  const [cityName, setCityName] = useState(cityData.city || "");
  const [location, setLocation] = useState(cityData.location || null);

  useEffect(() => {
    setCityName(cityData.city || "");
    setLocation(cityData.location || null);
  }, [cityData]);

  const handleMapClick = (latlng) => {
    setLocation(latlng);
  };

  const handleSubmit = () => {
    onSubmit({ area_name: cityName, lat: location.lat, lng: location.lng });
    toggle();
  };

  return (
    <Modal className="yekan" isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>ویرایش مقصد</ModalHeader>
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
            initialLocation={location}
            initialZoom={5}
            onMapClick={handleMapClick}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditCityModal;
