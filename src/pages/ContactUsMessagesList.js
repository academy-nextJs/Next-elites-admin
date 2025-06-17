import { useQuery } from "@tanstack/react-query";
import React, { useState, useCallback, useEffect } from "react";
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

// Main component for displaying Contact Us messages
const ContactUsMessagesList = React.memo(() => {
  // State hooks for managing pagination, limit, and search term
  const [limit, setLimit] = useState(5); // Pagination limit
  const [page, setPage] = useState(1); // Current page number
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [debouncedTerm, setDebouncedTerm] = useState(""); // State to hold debounced search term

  const [timeoutId, setTimeoutId] = useState(null); // Timeout state to store the ID for debouncing

  // Function to handle the debounced search
  const debouncedSearch = useCallback(
    (term) => {
      // Clear previous timeout if it exists
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set a new timeout to call the API after 1500ms
      const id = setTimeout(() => {
        setDebouncedTerm(term); // Update the debounced search term
      }, 1500); // Delay 1500ms after the last keystroke

      // Save the timeoutId for future cancellation
      setTimeoutId(id);
    },
    [timeoutId]
  );

  // Query to fetch contact messages data based on pagination, limit, and debounced searchTerm
  const { data, isLoading, error } = useQuery({
    queryKey: ["CONTACTMESSAGE", { page, limit, debouncedTerm }],
    queryFn: () =>
      getAllContactMessage({
        page,
        limit,
        title: debouncedTerm.trim() || undefined, // Send empty title if only spaces
      }),
    enabled: debouncedTerm !== undefined, // Ensure query is triggered only when debouncedTerm is updated
  });

  // Table headers
  const headers = ["شناسه", "عنوان", "پیام", ""];

  // Function to render each row of the table
  const renderRow = useCallback((ContactUS) => {
    return (
      <>
        <td>{ContactUS.id}</td>
        <td>{ContactUS.title}</td>
        <td className="message-column">
          <div className="message-text-wrapper">
            <p className="m-0 message-text">{ContactUS.message}</p>
          </div>
        </td>
        <td className="">
          <ContactPopover ContactUS={ContactUS} />
        </td>
      </>
    );
  }, []);

  // Handlers for pagination and limit change
  const handleLimitChange = (e) => setLimit(Number(e.target.value)); // Update pagination limit
  const handlePaginationClick = (direction) => {
    setPage((prev) => Math.max(prev + direction, 1)); // Update page number for pagination
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Update the search term immediately

    // Trigger debounced search to prevent excessive API calls
    debouncedSearch(value);
  };

  return (
    <div>
      {isLoading ? (
        <p>در حال بارگذاری...</p> // Loading state
      ) : error ? (
        <p>خطا در دریافت پیام‌ها</p> // Error state
      ) : (
        <>
          <ReusableTable
            pageTitle={
              <div className="d-inline-flex gap-1 align-items-center">
                <MessageSquare size={35} />
                <h1>مدیریت پیام‌های کاربران ({data.totalCount})</h1>
              </div>
            }
            headerContent={
              <Col xs={20} md={20}>
                <div className="d-flex flex-column flex-md-row align-items-center gap-2">
                  <FormGroup>
                    <Label htmlFor="search">جستجو:</Label>
                    <Input
                      type="text"
                      id="search"
                      value={searchTerm} // Bind input value to searchTerm state
                      onChange={handleInputChange} // Handle input changes
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="limit">تعداد:</Label>
                    <Input
                      type="select"
                      id="limit"
                      value={limit}
                      onChange={handleLimitChange} // Handle limit change
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
            data={data?.data || []} // Display data from the query
            renderRow={renderRow} // Use renderRow function for each row
          />
          <Pagination className="mt-3">
            <PaginationItem disabled={page === 1}>
              <PaginationLink onClick={() => handlePaginationClick(-1)}>
                قبلی
              </PaginationLink>
            </PaginationItem>
            <PaginationItem disabled={page * limit >= data?.totalCount}>
              <PaginationLink onClick={() => handlePaginationClick(1)}>
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

