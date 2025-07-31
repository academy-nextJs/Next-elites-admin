import React, { useCallback } from "react";
import { Col, FormGroup, Input, Label, Button } from "reactstrap";

const rateOptions = [
  { value: "1", label: "1 ستاره" },
  { value: "2", label: "2 ستاره" },
  { value: "3", label: "3 ستاره" },
  { value: "4", label: "4 ستاره" },
  { value: "5", label: "5 ستاره" },
];

const sortOptions = [{ value: "created_at", label: "تاریخ ساخت" }];

const orderOptions = [
  { value: "DESC", label: "نزولی" },
  { value: "ASC", label: "صعودی" },
];

const Filters = React.memo(({ filters, onFilterChange, onReset }) => {
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      onFilterChange(name, value);
    },
    [onFilterChange]
  );

  return (
    <Col xs={20} md={20}>
      <div className="d-flex flex-column flex-md-row align-items-center gap-2">
        <FormGroup>
          <Label htmlFor="rating">امتیاز:</Label>
          <Input
            type="select"
            id="rating"
            name="rating"
            value={filters.rating}
            onChange={handleInputChange}
          >
            {rateOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="sort">مرتب سازی بر اساس:</Label>
          <Input
            type="select"
            id="sort"
            name="sort"
            value={filters.sort}
            onChange={handleInputChange}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Input>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="order">ترتیب:</Label>
          <Input
            type="select"
            id="order"
            name="order"
            value={filters.order}
            onChange={handleInputChange}
          >
            {orderOptions.map((option) => (
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
            <option value={10}>15</option>
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
});

export default Filters;
