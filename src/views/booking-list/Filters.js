import React, { useCallback } from "react";
import { Col, FormGroup, Input, Label, Button } from "reactstrap";

const sortOptions = [
  { value: "createdAt", label: "تاریخ ساخت" },
  { value: "updatedAt", label: "تاریخ آپدیت" },
];

const orderOptions = [
  { value: "DESC", label: "نزولی" },
  { value: "ASC", label: "صعودی" },
];

const status = [
  { value: "confirmed", label: "تأیید شده" },
  { value: "pending", label: "در انتظار" },
  { value: "canceled", label: "لغو شده" },
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
          <Label htmlFor="status">وضعیت:</Label>
          <Input
            type="select"
            id="status"
            name="status"
            value={filters.status}
            onChange={handleInputChange}
          >
            {status.map((option) => (
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
});

export default Filters;
