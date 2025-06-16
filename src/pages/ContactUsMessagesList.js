import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import { Eye, MessageSquare } from "react-feather";
import {
  Col,
  FormGroup,
  Input,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import ReusableModal from "../@core/common/Modal";
import ReusableTable from "../@core/common/Table";
import { getAllContactMessage } from "../utility/services/api/get/ContactUS";
import ContactPopover from "../views/Contact-popover";

const ContactUsMessagesList = React.memo(() => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const toggleModalOpen = () => setModalOpen((prev) => !prev);

  const {
    data: ContactUsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["CONTACTMESSAGE"],
    queryFn: getAllContactMessage,
  });

  const headers = ["شناسه", "عنوان", "پیام", ""];

  const renderRow = useCallback((ContactUS) => {
    return (
      <>
        <td>{ContactUS.id}</td>
        <td>{ContactUS.title}</td>
        <td style={{ maxWidth: "150px" }} className="text-truncate text-right">
          {ContactUS.message}
        </td>
        <td className="d-flex align-items-center justify-content-center">
          <Eye
            onClick={() => {
              setSelectedMessage(ContactUS);
              setModalOpen(true);
            }}
            className="cursor-pointer text-primary"
            size={18}
          />
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
                <h1>مدیریت پیام‌های کاربران</h1>
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
                    <Input type="select" id="limit">
                      <option value={5}>5</option>
                      <option value={10}>10</option>
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
            <PaginationItem>
              <PaginationLink>قبلی</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>بعدی</PaginationLink>
            </PaginationItem>
          </Pagination>
        </>
      )}

      <ReusableModal
        isOpen={modalOpen}
        toggle={toggleModalOpen}
        bodyContent={
          selectedMessage ? (
            <div className="py-3 px-4 bg-light rounded-3 shadow-sm border border-muted">
              <h5 className="text-dark fw-bold">{selectedMessage.title}</h5>
              <p
                className="text-muted"
                style={{
                  whiteSpace: "pre-wrap",
                  fontSize: "15px",
                  lineHeight: "1.6",
                  marginBottom: "0",
                }}
              >
                {selectedMessage.message}
              </p>
            </div>
          ) : (
            <p>در حال بارگذاری پیام...</p>
          )
        }
      />
    </div>
  );
});

export default ContactUsMessagesList;
