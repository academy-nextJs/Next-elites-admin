import { Edit, Trash2 } from "react-feather";
import { useState } from "react";
import EditCityModal from "./EditCityModal";
import WarningModal from "./WarningModal";

const CityCard = ({ city, imageUrl, onEdit, onDelete, lat, lng }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [warningModalOpen, setWarningModalOpen] = useState(false); // State for warning modal

  const toggleEditModal = () => setEditModalOpen(!editModalOpen);
  const toggleWarningModal = () => setWarningModalOpen(!warningModalOpen); // Toggle function for warning modal

  const handleEditSubmit = (data) => {
    onEdit(data);
  };

  const handleDeleteConfirm = () => {
    onDelete();
    toggleWarningModal();
  };

  return (
    <div
      className="card shadow-sm"
      style={{
        borderRadius: "15px",
        overflow: "hidden",
        width: "48%",
        height: "250px"
      }}
    >
      <div style={{ height: "180px", overflow: "hidden" }}>
        <img
          src={imageUrl}
          alt={city}
          className="img-fluid w-100 h-100 object-fit-cover"
          style={{ objectPosition: "center" }}
        />
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-dark yekan">{city}</h5>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <button
            onClick={toggleEditModal}
            className="btn btn-outline-primary btn-sm rounded-pill d-flex align-items-center"
          >
            <Edit size={16} className="me-1" />
            ویرایش
          </button>

          <button
            onClick={toggleWarningModal} // Open the warning modal on delete button click
            className="btn btn-outline-danger btn-sm rounded-pill d-flex align-items-center"
          >
            <Trash2 size={16} className="me-1" />
            حذف
          </button>
        </div>
      </div>

      <EditCityModal
        isOpen={editModalOpen}
        toggle={toggleEditModal}
        cityData={{ city, location: [lat, lng] }}
        onSubmit={handleEditSubmit}
      />

      <WarningModal
        isOpen={warningModalOpen}
        toggle={toggleWarningModal}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default CityCard;
