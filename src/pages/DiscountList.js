import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import { Percent } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Col,
  FormGroup,
  Input,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import ReusableTable from "../@core/common/Table";
import formatToPersianDate from "../utility/helper/format-date";
import { getAllDiscounts } from "../utility/services/api/get/DiscountCode";
import DiscountPopoverActions from "../views/discount-popover";

const DiscountList = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [discount_percentage, setDiscountPercentage] = useState(
    searchParams.get("discount_percentage") || ""
  );
  const [code, setCode] = useState(searchParams.get("code") || "");
  const [limit, setLimit] = useState(parseInt(searchParams.get("limit")) || 5);
  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);

  const updateParams = useCallback(
    (newParams) => {
      const params = new URLSearchParams(newParams);
      navigate({ search: params.toString() });
    },
    [navigate]
  );

  useEffect(() => {
    const params = {
      limit,
      page,
      code,
      discount_percentage,
    };
    if (discount_percentage != null && discount_percentage !== "")
      params.discount_percentage = discount_percentage;
    if (code != null && code !== "") params.code = code;

    updateParams(params);
  }, [limit, page, discount_percentage, code, updateParams]);

  const {
    data: discountsData,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: [
      "DISCOUNT",
      {
        limit,
        page,
        ...(discount_percentage && { discount_percentage }),
        ...(code && { code }),
      },
    ],
    queryFn: () =>
      getAllDiscounts({
        limit,
        page,
        ...(discount_percentage && { discount_percentage }),
        ...(code && { code }),
      }),
    keepPreviousData: true,
  });

  const headers = ["#", "کد", "درصد تخفیف", "معتبر تا", "عملیات"];

  const renderRow = useCallback((discountCode) => {
    return (
      <>
        <td>{discountCode.id}</td>
        <td>{discountCode.code}</td>
        <td
          style={{
            maxWidth: "150px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {discountCode.discount_percentage}%
        </td>
        <td>{formatToPersianDate(discountCode.valid_until)}</td>
        <td>
          <DiscountPopoverActions
            id={discountCode.id}
            initialCode={discountCode.code}
            initialDiscountPercentage={discountCode.discount_percentage}
            initialValidUntil={discountCode.valid_until}
            refetch={refetch}
          />
        </td>
      </>
    );
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>در حال بارگذاری...</p>
      ) : error ? (
        <p>خطا در دریافت نظرات</p>
      ) : (
        <>
          <ReusableTable
            pageTitle={
              <div className="d-inline-flex gap-1 align-items-center">
                <Percent size={35} />
                <h1>مدیریت کدهای تخفیف</h1>
              </div>
            }
            headerContent={
              <Col>
                <div className="d-flex flex-column flex-md-row align-items-center gap-2">
                  <FormGroup>
                    <Label htmlFor="search"> جستجو:</Label>
                    <Input
                      type="text"
                      id="search"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="percentage">درصد تخفیف:</Label>
                    <Input
                      type="text"
                      id="percentage"
                      value={discount_percentage}
                      onChange={(e) => setDiscountPercentage(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="limit">تعداد:</Label>
                    <Input
                      type="select"
                      id="limit"
                      value={limit}
                      onChange={(e) => setLimit(parseInt(e.target.value))}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                    </Input>
                  </FormGroup>
                </div>
              </Col>
            }
            headers={headers}
            data={discountsData.data || []}
            renderRow={renderRow}
          />
          <Pagination className="mt-3">
            <PaginationItem disabled={page <= 1}>
              <PaginationLink onClick={() => handlePageChange(page - 1)}>
                قبلی
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(page + 1)}>
                بعدی
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </>
      )}
    </div>
  );
});

export default DiscountList;
