import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import { MessageSquare } from "react-feather";
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
import { getAllContactMessage } from "../utility/services/api/get/ContactUS";
import ContactPopover from "../views/Contact-popover";

const ContactUsMessagesList = React.memo(() => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const {
    data: ContactUsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["CONTACTMESSAGE", { page, limit }],
    queryFn: () => getAllContactMessage({ page, limit }),
  });

  const headers = ["شناسه", "عنوان", "پیام", ""];

  const renderRow = useCallback((ContactUS) => {
    return (
      <>
        <td>{ContactUS.id}</td>
        <td>{ContactUS.title}</td>
        <td className="">
          <div className="w-100 d-flex align-items-center justify-content-center">
            <p style={{ maxWidth: "200px" }} className="m-0 text-truncate">
              {ContactUS.message}
            </p>
          </div>
        </td>
        <td className="d-flex align-items-center justify-content-center">
          <ContactPopover
            ContactUS={ContactUS}
            style={{ marginRight: "10px" }}
          />
        </td>
      </>
    );
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>در حال بارگذاری...</p>
      ) : error ? (
        <p>خطا در دریافت پیام‌ها</p>
      ) : (
        <>
          <ReusableTable
            pageTitle={
              <div className="d-inline-flex gap-1 align-items-center">
                <MessageSquare size={35} />
                <h1>مدیریت پیام‌های کاربران ({ContactUsData.totalCount})</h1>
              </div>
            }
            headerContent={
              <Col xs={20} md={20}>
                <div className="d-flex flex-column flex-md-row align-items-center gap-2">
                  <FormGroup>
                    <Label htmlFor="search"> جستجو:</Label>
                    <Input type="text" id="search" />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="limit"> تعداد:</Label>
                    <Input
                      type="select"
                      id="limit"
                      value={limit}
                      onChange={(e) => setLimit(Number(e.target.value))}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                    </Input>
                  </FormGroup>
                </div>
              </Col>
            }
            headers={headers}
            data={ContactUsData?.data || []}
            renderRow={renderRow}
          />
          <Pagination className="mt-3">
            <PaginationItem disabled={page === 1}>
              <PaginationLink
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              >
                قبلی
              </PaginationLink>
            </PaginationItem>
            <PaginationItem
              disabled={page * limit >= ContactUsData?.totalCount}
            >
              <PaginationLink onClick={() => setPage((prev) => prev + 1)}>
                بعدی
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </>
      )}
    </div>
  );
});

export default ContactUsMessagesList;
