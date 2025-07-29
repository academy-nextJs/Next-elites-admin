import { useQuery } from "@tanstack/react-query";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MessageSquare } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import ReusableTable from "../@core/common/Table";
import { getAllContactMessage } from "../utility/services/api/get/ContactUS";
import ContactPopover from "../views/Contact-popover";
import Filters from "../views/contact-us-list/Filter";
import ErrorDisplay from "../@core/common/ErrorDisplay";
import LoadingSpinner from "../@core/common/LoadingSpinner";
import EmptyState from "../@core/common/EmptyState";

const ContactUsMessagesList = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize state from URL
  const [filters, setFilters] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      title: searchParams.get("title") || "",
      limit: parseInt(searchParams.get("limit")) || 5,
      page: parseInt(searchParams.get("page")) || 1,
    };
  });

  const [debouncedFilters] = useDebounce(filters, 3000);
  const prevFiltersRef = useRef(filters);

  const [searchInput, setSearchInput] = useState(filters.title);
  const [debounceSearch] = useDebounce(searchInput, 2000);

  useEffect(() => {
    if (filters.title !== debounceSearch) {
      setFilters((prev) => ({
        ...prev,
        title: debounceSearch,
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

  const { title, ...restFilters } = filters;

  const { data, isLoading, error } = useQuery({
    queryKey: ["CONTACT_MESSAGE", filters],
    queryFn: () =>
      getAllContactMessage({
        ...(title?.trim() ? { title: title } : {}),
        ...restFilters,
      }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const tableData = useMemo(() => data?.data || [], [data?.data]);

  const totalPages = useMemo(() => {
    const totalCount = data?.totalCount ?? 0;
    return Math.ceil(totalCount / filters.limit) || 1;
  }, [data, filters.limit]);

  const handleFilterChange = useCallback((name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name !== "page" && { page: 1 }),
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      title: "",
      limit: 5,
      page: 1,
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

  const headers = useMemo(() => ["شناسه", "عنوان", "پیام", ""], []);

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

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div>
      <ReusableTable
        pageTitle={
          <div className="d-inline-flex gap-1 align-items-center">
            <MessageSquare size={35} />
            <h1>مدیریت پیام‌های کاربران ({data.totalCount})</h1>
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

export default ContactUsMessagesList;
