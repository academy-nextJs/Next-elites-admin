import { useMutation } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { Col, FormGroup, Input, Label, Button } from "reactstrap";
import { createCategory } from "../../utility/services/api/post/Category";
import ReusableModal from "../../@core/common/Modal";

const Filters = React.memo(
  ({ filters, searchInput, onSearchChange, onFilterChange, onReset, refetch }) => {
    const handleInputChange = useCallback(
      (e) => {
        const { name, value } = e.target;
        if (name === "title") {
          onSearchChange(value);
        } else {
          onFilterChange(name, value);
        }
      },
      [onSearchChange, onFilterChange]
    );
    const [modalOpen, setModalOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");

    const toggleModal = () => setModalOpen(!modalOpen);

    const handleModalSubmit = () => {
      mutate({ name: newCategoryName });
    };

    const { mutate } = useMutation({
      mutationKey: ["POST_CATEGORIES"],
      mutationFn: (data) =>
        toast.promise(createCategory(data), {
          loading: "درحال پردازش",
        }),
      onSuccess: () => {
        toast.success("دسته‌بندی شما با موفقیت افزوده شد");
        refetch();
        toggleModal();
      },
    });

    return (
      <Col xs={20} md={20}>
        <div className="d-flex flex-column flex-md-row align-items-center gap-2">
          <FormGroup style={{ marginBottom: "0" }}>
            <Label htmlFor="title">جستجو:</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={searchInput}
              onChange={handleInputChange}
              placeholder="جستجوی پیام..."
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
            <Button color="primary" className="mt-2" onClick={toggleModal}>
              + ساخت
            </Button>
          </FormGroup>

          <FormGroup>
            <Label>&nbsp;</Label>
            <Button color="primary" onClick={onReset} className="mt-2">
              حذف فیلترها
            </Button>
          </FormGroup>

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
                  تایید
                </Button>
                <Button color="secondary" onClick={toggleModal}>
                  لغو
                </Button>
              </>
            }
          />
        </div>
      </Col>
    );
  }
);

export default Filters;
