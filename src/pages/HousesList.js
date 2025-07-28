import { useQuery } from "@tanstack/react-query";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Eye, Home, Star } from "react-feather";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import ErrorDisplay from "../@core/common/ErrorDisplay";
import LoadingSpinner from "../@core/common/LoadingSpinner";
import ReusableTable from "../@core/common/Table";
import formatToPersianDate from "../utility/helper/format-date";
import { getTransactionType } from "../utility/helper/transaction-type";
import { getAllHouses } from "../utility/services/api/get/Houses";
import Filters from "../views/houses-list/Filters";
import EmptyState from "../@core/common/EmptyState";
import { formatNumber } from "../utility/helper/format-number";
import { Badge } from "reactstrap";
import NoImage from "../assets/images/no.jpg";

const HousesList = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize state from URL
  const [filters, setFilters] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      search: searchParams.get("search") || "",
      limit: parseInt(searchParams.get("limit")) || 5,
      page: parseInt(searchParams.get("page")) || 1,
      location: searchParams.get("location") || "",
      sort: searchParams.get("sort") || "price",
      order: searchParams.get("order") || "DESC",
      propertyType: searchParams.get("propertyType") || "",
      transactionType: searchParams.get("transactionType") || "",
    };
  });

  const [debouncedFilters] = useDebounce(filters, 3000);
  const prevFiltersRef = useRef(filters);

  const [searchInput, setSearchInput] = useState(filters.search);
  const [debounceSearch] = useDebounce(searchInput, 2000);

  useEffect(() => {
    if (filters.search !== debounceSearch) {
      setFilters((prev) => ({
        ...prev,
        search: debounceSearch,
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
    data: housesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["HOUSES", filters],
    queryFn: () => getAllHouses(filters),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const tableData = useMemo(
    () => housesData?.houses || [],
    [housesData?.houses]
  );

  const totalPages = useMemo(() => {
    const totalCount = housesData?.totalCount ?? 0;
    return Math.ceil(totalCount / filters.limit) || 1;
  }, [housesData, filters.limit]);

  const handleFilterChange = useCallback((name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name !== "page" && { page: 1 }),
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: "",
      limit: 5,
      page: 1,
      location: "",
      sort: "price",
      order: "DESC",
      propertyType: "",
      transactionType: "",
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
    () => [
      "عنوان",
      "قیمت",
      "نوع",
      "امتیاز",
      "آخرین تغییر",
      "دسته بندی",
      "نام کاربر",
      "عملیات",
    ],
    []
  );

  const renderRow = useCallback((house) => {
    const transactionType = getTransactionType(house.transaction_type);
    const formattedDate = formatToPersianDate(house.last_updated);

    return (
      <>
        <td className="d-flex gap-1 align-items-center">
          <img
            width={100}
            height={60}
            className="rounded"
            src={house.photos !== null ? house.photos[0] : NoImage}
            alt={house.title}
            loading="lazy"
          />
          <p className="fw-bolder">{house.title}</p>
        </td>
        <td>{formatNumber(house.price)} تومان</td>
        <td className="fw-bolder">
          {transactionType && (
            <Badge color={transactionType.color}>{transactionType.text}</Badge>
          )}
        </td>
        <td>
          {house.rate}
          <Star
            fill="currentColor"
            className="text-warning"
            size={16}
            style={{ marginRight: "5px" }}
          />
        </td>
        <td>{formattedDate}</td>
        <td>{house.categories.name}</td>
        <td>{house.sellerName || "نامشخص"}</td>
        <td>
          <Link to={`/houses-management/${house.id}`}>
            <Eye className="cursor-pointer" />
          </Link>
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
            <Home size={35} />
            <h1>مدیریت املاک</h1>
          </div>
        }
        headerStyle={{ whiteSpace: "nowrap", fontSize: "18px" }}
        headerContent={filtersComponent}
        headers={headers}
        data={tableData}
        renderRow={renderRow}
        rowKey={(house) => house.id}
        emptyState={<EmptyState onReset={resetFilters} />}
        currentPage={filters.page}
        totalPages={totalPages}
        onPageChange={(page) => handleFilterChange("page", page)}
        showPagination
      />
    </div>
  );
});

export default HousesList;
