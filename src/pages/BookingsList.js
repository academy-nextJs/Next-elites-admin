import { useQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { Book, Eye, MoreVertical } from "react-feather";
import { Badge, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import ReusableTable from "../@core/common/Table";
import formatToPersianDate from "../utility/helper/format-date";
import { getStatus } from "../utility/helper/get-status";
import { getAllBookings } from "../utility/services/api/get/Bookings";
import BookingPopover from "../views/booking-popover";
import { Link } from "react-router-dom";

const BookingsList = React.memo(() => {
  const {
    data: bookingsData,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["BOOKINGS"],
    queryFn: getAllBookings,
    keepPreviousData: true,
  });

  const headers = ["شناسه", "از", "تا", "وضعیت", "شماره تلفن", "عملیات"];

  const renderRow = useCallback((booking) => {
    const status = getStatus(booking.status);
    return (
      <>
        <td>#{booking.id}</td>
        <td>{formatToPersianDate(booking.reservedDates[0].value)}</td>
        <td>{formatToPersianDate(booking.reservedDates[1].value)}</td>
        {status && (
          <td>
            <Badge color={status.color}>{status.text}</Badge>
          </td>
        )}
        <td dir="ltr">{booking.sharedMobile}</td>
        <td>
          <Link to={`/bookings-management/${booking.id}`}>
            <Eye className="cursor-pointer" />
          </Link>
          <BookingPopover
            booking={booking}
            refetch={refetch}
            id={booking.id}
            status={booking.status}
            travelersData={booking.traveler_details}
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
        <p>خطا در دریافت نظرات</p>
      ) : (
        <>
          <ReusableTable
            pageTitle={
              <div className="d-inline-flex gap-1 align-items-center">
                <Book size={35} />
                <h1>مدیریت رزروها</h1>
              </div>
            }
            headers={headers}
            data={bookingsData.data || []}
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
    </div>
  );
});

export default BookingsList;
