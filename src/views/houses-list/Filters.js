import React, { useCallback } from "react";
import { Col, FormGroup, Input, Label, Button } from "reactstrap";

const propertyTypes = [
  { value: "", label: "همه" },
  { value: "apartment", label: "آپارتمان" },
  { value: "house", label: "خانه" },
  { value: "villa", label: "ویلا" },
  { value: "land", label: "زمین" },
  { value: "commercial", label: "تجاری" },
];

const transactionTypes = [
  { value: "mortgage", label: "رهن" },
  { value: "rental", label: "اجاره" },
  { value: "direct_purchase", label: "نقدی" },
  { value: "reservation", label: "رزرو" },
];

const sortOptions = [
  { value: "price", label: "قیمت" },
  { value: "created_at", label: "تاریخ ساخت" },
  { value: "rate", label: "امتیاز" },
];

const orderOptions = [
  { value: "DESC", label: "نزولی" },
  { value: "ASC", label: "صعودی" },
];

const Filters = React.memo(
  ({ filters, searchInput, onSearchChange, onFilterChange, onReset }) => {
    const handleInputChange = useCallback(
      (e) => {
        const { name, value } = e.target;
        if (name === "search") {
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
            <Label htmlFor="search">جستجو:</Label>
            <Input
              type="text"
              id="search"
              name="search"
              value={searchInput}
              onChange={handleInputChange}
              placeholder="جستجوی ملک..."
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="search">نوع پرداخت:</Label>
            <Input
              type="select"
              id="transactionType"
              name="transactionType"
              value={filters.transactionType}
              onChange={handleInputChange}
            >
              {" "}
              {transactionTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="property_type">نوع ملک:</Label>
            <Input
              type="select"
              id="propertyType"
              name="propertyType"
              value={filters.propertyType}
              onChange={handleInputChange}
            >
              {propertyTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
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
