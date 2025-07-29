import React, { useCallback } from "react";
import { Col, FormGroup, Input, Label, Button } from "reactstrap";

const sortOptions = [{ value: "createdAt", label: "تاریخ ساخت" }];

const orderOptions = [
  { value: "DESC", label: "نزولی" },
  { value: "ASC", label: "صعودی" },
];

const roleOptions = [
  { value: "", label: "همه" },
  { value: "admin", label: "ادمین" },
  { value: "buyer", label: "خریدار" },
  { value: "seller", label: "فروشنده" },
];

const Filters = React.memo(
  ({ filters, emailInput, onEmailChange, onFilterChange, onReset }) => {
    const handleInputChange = useCallback(
      (e) => {
        const { name, value } = e.target;
        if (name === "email") {
          onEmailChange(value);
        } else {
          onFilterChange(name, value);
        }
      },
      [onEmailChange, onFilterChange]
    );

    return (
      <Col xs={20} md={20}>
        <div className="d-flex flex-column flex-md-row align-items-center gap-2">
          <FormGroup style={{ marginBottom: "0" }}>
            <Label htmlFor="email">ایمیل:</Label>
            <Input
              type="text"
              id="email"
              name="email"
              value={emailInput}
              onChange={handleInputChange}
              placeholder="جستجوی در ایمیل..."
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="role">نقش:</Label>
            <Input
              type="select"
              id="role"
              name="role"
              value={filters.role}
              onChange={handleInputChange}
            >
              {roleOptions.map((option) => (
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
