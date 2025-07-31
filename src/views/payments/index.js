import { useQuery } from "@tanstack/react-query";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DollarSign } from "react-feather";
import EmptyState from "../../@core/common/EmptyState";
import ErrorDisplay from "../../@core/common/ErrorDisplay";
import LoadingSpinner from "../../@core/common/LoadingSpinner";
import ReusableTable from "../../@core/common/Table";
import { getAllPayments } from "../../utility/services/api/get/payments";
import { formatNumber } from "../../utility/helper/format-number";
import formatToPersianDate from "../../utility/helper/format-date";
import PaymentPopover from "./popover";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import Filters from "./Filters";

const Payments = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize state from URL
  const [filters, setFilters] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      limit: parseInt(searchParams.get("limit")) || 5,
      page: parseInt(searchParams.get("page")) || 1,
      sort: searchParams.get("sort") || "price",
      order: searchParams.get("order") || "DESC",
      amount: searchParams.get("amount") || "",
      status: searchParams.get("status") || "",
    };
  });

  const [debouncedFilters] = useDebounce(filters, 3000);
  const prevFiltersRef = useRef(filters);

  const [searchInput, setSearchInput] = useState(filters.amount);
  const [debounceSearch] = useDebounce(searchInput, 2000);

  useEffect(() => {
    if (filters.amount !== debounceSearch) {
      setFilters((prev) => ({
        ...prev,
        amount: debounceSearch,
        page: 1,
      }));
    }
  }, [debounceSearch]);

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

  const { status, amount, ...restFilters } = filters;
  const {
    data: paymentData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["PAYMENTS", filters],
    queryFn: () =>
      getAllPayments({
        ...restFilters,
        ...(status && { status }),
        ...(amount && { amount }),
      }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const tableData = useMemo(
    () => paymentData?.data || [],
    [paymentData?.data]
  );

  const totalPages = useMemo(() => {
    const totalCount = paymentData?.totalCount ?? 0;
    return Math.ceil(totalCount / filters.limit) || 1;
  }, [paymentData, filters.limit]);

  const handleFilterChange = useCallback((name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name !== "page" && { page: 1 }),
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      status: "",
      amount: "",
      limit: 5,
      page: 1,
      sort: "createdAt",
      order: "DESC",
    });
    setSearchInput("");
  }, []);

  const filtersComponent = useMemo(
    () => (
      <Filters
        filters={filters}
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
      />
    ),
    [filters, searchInput, handleFilterChange, resetFilters]
  );

  const headers = useMemo(
    () => ["مبلغ", "وضعیت", "توضیحات", "تاریخ", "عملیات"],
    []
  );

  const renderRow = useCallback((payment) => {
    return (
      <>
        <td>{formatNumber(payment.amount)}</td>
        <td>
          <p className="fw-bolder">
            {payment.status == "completed"
              ? "تایید شده"
              : payment.status == "pending"
              ? "در انتظار"
              : "لغو شده"}
          </p>
        </td>
        <td>{payment.description}</td>
        <td>{formatToPersianDate(payment.createdAt)}</td>
        <td>
          <PaymentPopover payment={payment} id={payment.id} refetch={refetch} />
        </td>
      </>
    );
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div className="houses-list-container">
      <ReusableTable
        pageTitle={
          <div className="d-inline-flex gap-1 align-items-center">
            <DollarSign size={35} />
            <h1>مدیریت پرداختی ها</h1>
          </div>
        }
        headerContent={filtersComponent}
        headers={headers}
        data={tableData}
        renderRow={renderRow}
        rowKey={(payment) => payment.id}
        emptyState={<EmptyState onReset={resetFilters} />}
        currentPage={filters.page}
        totalPages={totalPages}
        onPageChange={(page) => handleFilterChange("page", page)}
        showPagination
      />
    </div>
  );
});

export default Payments;
