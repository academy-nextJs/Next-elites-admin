import React, { useState, useEffect } from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";
import MapComponent from "../components/map/map";
import ReusableModal from "../../@core/common/Modal";

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
          initialLocation={location}
          initialZoom={5}
          onMapClick={handleMapClick}
        />
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
      title="ویرایش مقصد"
      bodyContent={bodyContent}
      footerActions={footerActions}
    />
  );
};

export default EditCityModal;
