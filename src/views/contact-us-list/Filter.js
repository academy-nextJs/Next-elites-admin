import React, { useCallback } from "react";
import { Col, FormGroup, Input, Label, Button } from "reactstrap";

const Filters = React.memo(
  ({ filters, searchInput, onSearchChange, onFilterChange, onReset }) => {
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
            <Button color="primary" onClick={onReset} className="mt-2">
              حذف فیلترها
            </Button>
          </FormGroup>
        </div>
      </Col>
    );
  }
);

export default Filters;
