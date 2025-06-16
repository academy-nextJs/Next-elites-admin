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
  // const navigate = useNavigate();
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const [discount_percentage, setDiscountPercentage] = useState(
  //   searchParams.get("discount_percentage") || ""
  // );
  // const [code, setCode] = useState(searchParams.get("code") || "");
  // const [limit, setLimit] = useState(parseInt(searchParams.get("limit")) || 5);
  // const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);

  // const updateParams = useCallback(
  //   (newParams) => {
  //     const params = new URLSearchParams(newParams);
  //     navigate({ search: params.toString() });
  //   },
  //   [navigate]
  // );

  // useEffect(() => {
  //   const params = {
  //     limit,
  //     page,
  //     code,
  //     discount_percentage,
  //   };
  //   if (discount_percentage != null && discount_percentage !== "")
  //     params.discount_percentage = discount_percentage;
  //   if (code != null && code !== "") params.code = code;

  //   updateParams(params);
  // }, [limit, page, discount_percentage, code, updateParams]);

  const {
    data: bookingsData,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: [
      "BOOKINGS",
      // {
      //   limit,
      //   page,
      //   ...(discount_percentage && { discount_percentage }),
      //   ...(code && { code }),
      // },
    ],
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
          <BookingPopover travelersData={booking.traveler_details} />
        </td>
      </>
    );
  }, []);

  // const handlePageChange = useCallback((newPage) => {
  //   setPage(newPage);
  // }, []);

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
            data={bookingsData || []}
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
