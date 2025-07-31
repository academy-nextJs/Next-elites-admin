import { useQuery } from "@tanstack/react-query";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MessageCircle } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import ErrorDisplay from "../@core/common/ErrorDisplay";
import LoadingSpinner from "../@core/common/LoadingSpinner";
import ReusableTable from "../@core/common/Table";
import formatToPersianDate from "../utility/helper/format-date";
import { getAllComments } from "../utility/services/api/get/Comment";
import CommentPopoverActions from "../views/comment-popover";
import EmptyState from "../@core/common/EmptyState";
import Filters from "../views/comments-list/Filter";

const CommentsList = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize state from URL
  const [filters, setFilters] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      sort: searchParams.get("sort") || "created_at",
      limit: parseInt(searchParams.get("limit")) || 15,
      page: parseInt(searchParams.get("page")) || 1,
      order: searchParams.get("order") || "DESC",
      rating: parseInt(searchParams.get("rating")) || "",
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

  const { rating, ...restFilters } = filters;
  const {
    data: commentsData,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["comments", filters],
    queryFn: () =>
      getAllComments({ ...restFilters, ...(rating && { rating }) }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const tableData = useMemo(
    () => commentsData?.data || [],
    [commentsData?.data]
  );

  const totalPages = useMemo(() => {
    const totalCount = commentsData?.totalCount ?? 0;
    return Math.ceil(totalCount / filters.limit) || 1;
  }, [commentsData, filters.limit]);

  const handleFilterChange = useCallback((name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name !== "page" && { page: 1 }),
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      rating: "",
      limit: 15,
      page: 1,
      sort: "created_at",
      order: "DESC",
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
    () => ["عنوان", "توضیحات", "امتیاز", "تاریخ ایجاد", "عملیات"],
    []
  );

  const renderRow = useCallback((comment) => {
    return (
      <>
        <td
          style={{
            maxWidth: "150px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {comment.title}
        </td>
        <td
          style={{
            maxWidth: "250px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {comment.caption}
        </td>
        <td>{comment.rating}</td>
        <td>{formatToPersianDate(comment.created_at)}</td>
        <td>
          <CommentPopoverActions
            title={comment.title}
            caption={comment.caption}
            rating={comment.rating}
            id={comment.id}
            userId={comment.user_id}
            houseId={comment.house_id}
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
            <MessageCircle size={35} />
            <h1>مدیریت نظرات</h1>
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

export default CommentsList;
