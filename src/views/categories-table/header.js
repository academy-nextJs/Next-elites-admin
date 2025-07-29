import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import ReusableModal from "../../@core/common/Modal"; // Import the reusable modal
import { createCategory } from "../../utility/services/api/post/Category";

const PageHeader = ({ refetch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [search, setSearch] = useState(searchParams.get("name") || "");
  const [limit, setLimit] = useState(searchParams.get("limit") || "10");
  const [modalOpen, setModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const updateParams = (newParams) => {
    const params = new URLSearchParams(newParams);
    navigate({ search: params.toString() });
  };

  useEffect(() => {
    updateParams({ name: search, limit });
  }, [search, limit]);



  return (
    <div className="w-100">
      <Row className="align-items-center justify-content-between">
        <Col xs={12} md={9}>
          <div className="d-flex flex-column flex-md-row align-items-center gap-2">
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

      <ReusableModal
        isOpen={modalOpen}
        toggle={toggleModal}
        title="ایجاد دسته‌بندی جدید"
        bodyContent={
          <FormGroup>
            <Label for="categoryName">نام دسته‌بندی</Label>
            <Input
              id="categoryName"
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="نام دسته بندی را وارد کنید..."
            />
          </FormGroup>
        }
        footerActions={
          <>
            <Button color="primary" onClick={handleModalSubmit}>
              Submit
            </Button>
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
          </>
        }
      />
    </div>
  );
};

export default PageHeader;
