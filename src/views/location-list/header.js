import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { createLocation } from "../../utility/services/api/post/Location";
import CityModal from "./CityModal";

const PageHeader = ({ refetch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [search, setSearch] = useState(searchParams.get("area_name") || "");
  const [limit, setLimit] = useState(searchParams.get("limit") || "10");
  const [modalOpen, setModalOpen] = useState(false);

  const updateParams = (newParams) => {
    const params = new URLSearchParams(newParams);
    navigate({ search: params.toString() });
  };

  useEffect(() => {
    updateParams({ area_name: search, limit });
  }, [search, limit]);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleModalSubmit = (data) => {
    mutate(data);
  };

  const { mutate } = useMutation({
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
    <div className="w-100">
      <Row className="align-items-center justify-content-between">
        <Col xs={12} md={9}>
          <div className="d-flex px-2 flex-column flex-md-row align-items-center gap-2">
            <FormGroup>
              <Label for="rowsPerPage">تعداد ایتم:</Label>
              <Input
                type="select"
                id="rowsPerPage"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </Input>
            </FormGroup>

            <FormGroup className="w-50">
              <Label for="search">جستجو:</Label>
              <Input
                id="search"
                type="text"
                placeholder="جستجو"
                className="form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </FormGroup>
          </div>
        </Col>

        <Col xs={12} md={3} className="text-end mt-3 mt-md-0">
          <Button color="primary" onClick={toggleModal}>
            + ساخت
          </Button>
        </Col>
      </Row>

      <CityModal
        isOpen={modalOpen}
        toggle={toggleModal}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default PageHeader;
