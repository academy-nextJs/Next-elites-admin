import { useQuery } from "@tanstack/react-query";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Map } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { getAllLocations } from "../../utility/services/api/get/Location";
import EmptyState from "../../@core/common/EmptyState";
import ErrorDisplay from "../../@core/common/ErrorDisplay";
import LoadingSpinner from "../../@core/common/LoadingSpinner";
import ReusableTable from "../../@core/common/Table";
import Filters from "./Filter";
import LocationPopover from "./popover";

const LocationListContainer = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize state from URL
  const [filters, setFilters] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      area_name: searchParams.get("area_name") || "",
      limit: parseInt(searchParams.get("limit")) || 5,
      page: parseInt(searchParams.get("page")) || 1,
    };
  });

  const [debouncedFilters] = useDebounce(filters, 3000);
  const prevFiltersRef = useRef(filters);

  const [searchInput, setSearchInput] = useState(filters.area_name);
  const [debounceSearch] = useDebounce(searchInput, 2000);

  useEffect(() => {
    if (filters.area_name !== debounceSearch) {
      setFilters((prev) => ({
        ...prev,
        area_name: debounceSearch,
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
    data: locationData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["LOCATIONS", filters],
    queryFn: () => {
      const filteredParams = { ...filters };
      if (!filteredParams.area_name) {
        delete filteredParams.area_name;
      }
      return getAllLocations(filteredParams);
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const tableData = useMemo(
    () => locationData?.data || [],
    [locationData?.data]
  );

  const totalPages = useMemo(() => {
    const totalCount = locationData?.totalCount ?? 0;
    return Math.ceil(totalCount / filters.limit) || 1;
  }, [locationData, filters.limit]);

  const handleFilterChange = useCallback((name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name !== "page" && { page: 1 }),
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      area_name: "",
      limit: 5,
      page: 1,
    });
    setSearchInput("");
  }, []);

  const filtersComponent = useMemo(
    () => (
      <Filters
        refetch={refetch}
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
    () => ["شناسه", "نام", "طول جغرافیایی", "عرض جغرافیایی", "عملیات"],
    []
  );

  const renderRow = useCallback((location) => {
    return (
      <>
        <td>{location.id}</td>
        <td className="d-flex gap-1 align-items-center">
          <p className="fw-bolder">{location.area_name}</p>
        </td>
        <td>{location.lat || "نا معتبر"}</td>
        <td>{location.lng || "نا معتبر"}</td>
        <td>
          <LocationPopover
            refetch={refetch}
            id={location.id}
            city={location.area_name}
            lat={location.lat || 31}
            lng={location.lng || 55}
          />
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
            <Map size={35} />
            <h1>مدیریت مقاصد</h1>
          </div>
        }
        headerStyle={{ whiteSpace: "nowrap", fontSize: "18px" }}
        headerContent={filtersComponent}
        headers={headers}
        data={tableData}
        renderRow={renderRow}
        rowKey={(location) => location.id}
        emptyState={<EmptyState onReset={resetFilters} />}
        currentPage={filters.page}
        totalPages={totalPages}
        onPageChange={(page) => handleFilterChange("page", page)}
        showPagination
      />
    </div>
  );
});

export default LocationListContainer;
