import { useQuery } from "@tanstack/react-query";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Book, Eye } from "react-feather";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Badge, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import ReusableTable from "../@core/common/Table";
import formatToPersianDate from "../utility/helper/format-date";
import { getStatus } from "../utility/helper/get-status";
import { getAllBookings } from "../utility/services/api/get/Bookings";
import BookingPopover from "../views/booking-popover";
import { useDebounce } from "use-debounce";
import Filters from "../views/booking-list/Filters";
import EmptyState from "../@core/common/EmptyState";

const BookingsList = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize state from URL
  const [filters, setFilters] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      limit: parseInt(searchParams.get("limit")) || 5,
      page: parseInt(searchParams.get("page")) || 1,
      sort: searchParams.get("sort") || "createdAt",
      order: searchParams.get("order") || "DESC",
      status: searchParams.get("status") || "pending",
    };
  });

  const [debouncedFilters] = useDebounce(filters, 3000);
  const prevFiltersRef = useRef(filters);

  const updateURL = useCallback(
    (newFilters) => {
      const params = new URLSearchParams();
      let hasChanges = false;

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== prevFiltersRef.current[key]) {
          params.set(key, value.toString());
          hasChanges = true;
        }
      });

      if (hasChanges) {
        navigate(
          { search: params.toString() },
          {
            replace: true,
            state: { preserveScroll: true },
          }
        );
        prevFiltersRef.current = newFilters;
      }
    },
    [navigate]
  );

  useEffect(() => {
    const stringifiedPrev = JSON.stringify(prevFiltersRef.current);
    const stringifiedCurrent = JSON.stringify(debouncedFilters);

    if (stringifiedPrev !== stringifiedCurrent) {
      updateURL(debouncedFilters);
      prevFiltersRef.current = debouncedFilters;
    }
  }, [debouncedFilters, updateURL]);

  const {
    data: bookingsData,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["BOOKINGS", filters],
    queryFn: () => getAllBookings(filters),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const tableData = useMemo(
    () => bookingsData?.data || [],
    [bookingsData?.data]
  );

  const totalPages = useMemo(() => {
    const totalCount = bookingsData?.totalCount ?? 0;
    return Math.ceil(totalCount / filters.limit) || 1;
  }, [bookingsData, filters.limit]);

  const handleFilterChange = useCallback((name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name !== "page" && { page: 1 }),
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      limit: 5,
      page: 1,
      sort: "price",
      order: "DESC",
      status: "pending",
    });
  }, []);

  const filtersComponent = useMemo(
    () => (
      <Filters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
      />
    ),
    [filters, handleFilterChange, resetFilters]
  );

  const headers = useMemo(
    () => ["شناسه", "از", "تا", "وضعیت", "شماره تماس", "عملیات"],
    []
  );

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
            headerStyle={{ whiteSpace: "nowrap", fontSize: "18px" }}
            headerContent={filtersComponent}
            pageTitle={
              <div className="d-inline-flex gap-1 align-items-center">
                <Book size={35} />
                <h1>مدیریت رزروها</h1>
              </div>
            }
            headers={headers}
            rowKey={(house) => house.id}
            data={tableData}
            emptyState={<EmptyState onReset={resetFilters} />}
            currentPage={filters.page}
            totalPages={totalPages}
            onPageChange={(page) => handleFilterChange("page", page)}
            showPagination
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
