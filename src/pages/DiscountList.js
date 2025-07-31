import { useQuery } from "@tanstack/react-query";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Percent } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import EmptyState from "../@core/common/EmptyState";
import ErrorDisplay from "../@core/common/ErrorDisplay";
import LoadingSpinner from "../@core/common/LoadingSpinner";
import ReusableTable from "../@core/common/Table";
import formatToPersianDate from "../utility/helper/format-date";
import { getAllDiscounts } from "../utility/services/api/get/DiscountCode";
import Filters from "../views/discount-list/Filters";
import DiscountPopoverActions from "../views/discount-popover";

const DiscountList = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const [filters, setFilters] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      discount_percentage: searchParams.get("discount_percentage") || "",
      limit: parseInt(searchParams.get("limit")) || 5,
      page: parseInt(searchParams.get("page")) || 1,
      code: searchParams.get("code") || "",
    };
  });

  const [debouncedFilters] = useDebounce(filters, 3000);
  const prevFiltersRef = useRef(filters);

  const [searchInput, setSearchInput] = useState(filters.code);
  const [debounceSearch] = useDebounce(searchInput, 2000);

  useEffect(() => {
    if (filters.code !== debounceSearch) {
      setFilters((prev) => ({
        ...prev,
        code: debounceSearch,
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

  const {
    data: discountsData,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["DISCOUNT", filters],
    queryFn: () =>
      getAllDiscounts({
        limit: filters.limit,
        page: filters.page,
        ...(filters.discount_percentage && {
          discount_percentage: filters.discount_percentage,
        }),
        ...(filters.code && { code: filters.code }),
      }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const tableData = useMemo(
    () => discountsData?.data || [],
    [discountsData?.data]
  );

  const totalPages = useMemo(() => {
    const totalCount = discountsData?.totalCount ?? 0;
    return Math.ceil(totalCount / filters.limit) || 1;
  }, [discountsData, filters.limit]);

  const handleFilterChange = useCallback((name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name !== "page" && { page: 1 }),
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      code: "",
      limit: 5,
      page: 1,
      discount_percentage: "",
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
    () => ["#", "کد", "درصد تخفیف", "معتبر تا", "عملیات"],
    []
  );

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

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div>
      <ReusableTable
        pageTitle={
          <div className="d-inline-flex gap-1 align-items-center">
            <Percent size={35} />
            <h1>مدیریت کدهای تخفیف</h1>
          </div>
        }
        headerStyle={{ whiteSpace: "nowrap", fontSize: "18px" }}
        headerContent={filtersComponent}
        headers={headers}
        data={tableData}
        renderRow={renderRow}
        rowKey={(discount) => discount.id}
        emptyState={<EmptyState onReset={resetFilters} />}
        currentPage={filters.page}
        totalPages={totalPages}
        onPageChange={(page) => handleFilterChange("page", page)}
        showPagination
      />
    </div>
  );
});

export default DiscountList;
