import { useQuery } from "@tanstack/react-query";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Eye, Users } from "react-feather";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Badge } from "reactstrap";
import { useDebounce } from "use-debounce";
import ReusableTable from "../@core/common/Table";
import formatToPersianDate from "../utility/helper/format-date";
import { getRoleColor } from "../utility/helper/get-role-color";
import { getAllUsers } from "../utility/services/api/get/Users";
import Filters from "../views/user-list/Filters";
import UserPopover from "../views/user-popover";
import EmptyState from "../@core/common/EmptyState";

const UsersList = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize state from URL
  const [filters, setFilters] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      email: searchParams.get("email") || "",
      limit: parseInt(searchParams.get("limit")) || 5,
      page: parseInt(searchParams.get("page")) || 1,
      role: searchParams.get("role") || "",
      sort: searchParams.get("sort") || "price",
      order: searchParams.get("order") || "DESC",
    };
  });

  const [debouncedFilters] = useDebounce(filters, 3000);
  const prevFiltersRef = useRef(filters);

  const [emailInput, setEmailInput] = useState(filters.email);
  const [debounceEmail] = useDebounce(emailInput, 2000);

  useEffect(() => {
    if (filters.email !== debounceEmail) {
      setFilters((prev) => ({
        ...prev,
        email: debounceEmail,
        page: 1,
      }));
    }
  }, [debounceEmail]);

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
  const { email, role, ...restFilters } = filters;
  const {
    data: usersData,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["USERS", filters],
    queryFn: () =>
      getAllUsers({
        ...(debounceEmail?.trim() ? { email: debounceEmail } : {}),
        ...(role?.trim() ? { role: role } : {}),
        ...restFilters,
      }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const tableData = useMemo(() => usersData?.data || [], [usersData?.data]);

  const totalPages = useMemo(() => {
    const totalCount = usersData?.totalCount ?? 0;
    return Math.ceil(totalCount / filters.limit) || 1;
  }, [usersData, filters.limit]);

  const handleFilterChange = useCallback((name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name !== "page" && { page: 1 }),
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      email: "",
      limit: 5,
      page: 1,
      role: "",
      sort: "price",
      order: "DESC",
    });
    setEmailInput("");
  }, []);

  const filtersComponent = useMemo(
    () => (
      <Filters
        filters={filters}
        emailInput={emailInput}
        onEmailChange={setEmailInput}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
      />
    ),
    [filters, emailInput, handleFilterChange, resetFilters]
  );

  const headers = useMemo(
    () => [
      "نام",
      "نقش",
      "تاریخ عضویت",
      "وضعیت ایمیل",
      "شماره موبایل",
      "عملیات",
    ],
    []
  );

  const renderRow = useCallback((user) => {
    const role = getRoleColor(user.role);
    return (
      <>
        <td>{user.fullName}</td>
        <td>{role && <Badge color={role.color}>{role.text}</Badge>}</td>
        <td>{formatToPersianDate(user.membershipDate)}</td>
        <td>
          <Badge color={user.emailVerified ? "light-success" : "light-danger"}>
            {user.emailVerified ? "تایید شده" : "تایید نشده"}
          </Badge>
        </td>
        <td>{user.phoneNumber || "نامعتبر"}</td>
        <td>
          <Link to={`/users-management/${user.id}`}>
            <Eye className="cursor-pointer" />
          </Link>
          <UserPopover
            userRole={user.role}
            id={user.id}
            refetch={refetch}
            style={{ marginRight: "10px" }}
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
                <Users size={35} />
                <h1>مدیریت کاربران</h1>
              </div>
            }
            headers={headers}
            renderRow={renderRow}
            headerStyle={{ whiteSpace: "nowrap", fontSize: "18px" }}
            headerContent={filtersComponent}
            data={tableData}
            rowKey={(house) => house.id}
            emptyState={<EmptyState onReset={resetFilters} />}
            currentPage={filters.page}
            totalPages={totalPages}
            onPageChange={(page) => handleFilterChange("page", page)}
            showPagination
          />
        </>
      )}
    </div>
  );
});

export default UsersList;
