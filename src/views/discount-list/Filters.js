import React, { useCallback } from "react";
import { Col, FormGroup, Input, Label, Button } from "reactstrap";

const discountOptions = [
  { value: 5, label: "5%" },
  { value: 10, label: "10%" },
  { value: 15, label: "15%" },
  { value: 20, label: "20%" },
  { value: 25, label: "25%" },
  { value: 30, label: "30%" },
  { value: 35, label: "35%" },
  { value: 40, label: "40%" },
  { value: 45, label: "45%" },
  { value: 50, label: "50%" },
  { value: 55, label: "55%" },
  { value: 60, label: "60%" },
  { value: 65, label: "65%" },
  { value: 70, label: "70%" },
  { value: 75, label: "75%" },
  { value: 80, label: "80%" },
  { value: 85, label: "85%" },
  { value: 90, label: "90%" },
  { value: 95, label: "95%" },
  { value: 100, label: "100%" },
];

const Filters = React.memo(
  ({ filters, searchInput, onSearchChange, onFilterChange, onReset }) => {
    const handleInputChange = useCallback(
      (e) => {
        const { name, value } = e.target;
        if (name === "code") {
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
            <Label htmlFor="code">جستجو:</Label>
            <Input
              type="text"
              id="code"
              name="code"
              value={searchInput}
              onChange={handleInputChange}
              placeholder="جستجوی کد تخفیف..."
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="discount_percentage">درصد:</Label>
            <Input
              type="select"
              id="discount_percentage"
              name="discount_percentage"
              value={filters.discount_percentage}
              onChange={handleInputChange}
            >
              {discountOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Input>
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
