import React, { useCallback, useState } from "react";
import { Col, FormGroup, Input, Label, Button } from "reactstrap";
import CityModal from "./CityModal";
import { useMutation } from "@tanstack/react-query";
import { createLocation } from "../../utility/services/api/post/Location";
import toast from "react-hot-toast";

const Filters = React.memo(
  ({
    filters,
    searchInput,
    onSearchChange,
    onFilterChange,
    onReset,
    refetch,
  }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = () => setModalOpen(!modalOpen);
    const handleInputChange = useCallback(
      (e) => {
        const { name, value } = e.target;
        if (name === "area_name") {
          onSearchChange(value);
        } else {
          onFilterChange(name, value);
        }
      },
      [onSearchChange, onFilterChange]
    );
    const handleModalSubmit = (data) => {
      postCity(data);
    };
    const { mutate: postCity } = useMutation({
      mutationKey: ["POST_LOCATIONS"],
      mutationFn: (data) =>
        toast.promise(createLocation(data), {
          pending: "درحال پردازش",
        }),
      onSuccess: () => {
        toast.success("مقصد شما با موفقیت افزوده شد");
        refetch();
      },
    });

    return (
      <Col xs={20} md={20}>
        <div className="d-flex flex-column flex-md-row align-items-center gap-2">
          <FormGroup style={{ marginBottom: "0" }}>
            <Label htmlFor="area_name">جستجو:</Label>
            <Input
              type="text"
              id="area_name"
              name="area_name"
              value={searchInput}
              onChange={handleInputChange}
              placeholder="جستجوی مقصد..."
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="limit">تعداد در صفحه:</Label>
            <Input
              type="select"
              id="limit"
              name="limit"
              value={filters.limit}
              onChange={handleInputChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label>&nbsp;</Label>
            <Button color="primary" onClick={onReset} className="mt-2">
              حذف فیلترها
            </Button>
          </FormGroup>
          <FormGroup>
            <Label>&nbsp;</Label>
            <Button color="primary" onClick={toggleModal} className="mt-2">
              افزودن مقصد
            </Button>
          </FormGroup>
        </div>
        <CityModal
          isOpen={modalOpen}
          toggle={toggleModal}
          onSubmit={handleModalSubmit}
        />
      </Col>
    );
  }
);

export default Filters;
