import { useQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { Eye, Users } from "react-feather";
import { Link } from "react-router-dom";
import { Badge, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import ReusableTable from "../@core/common/Table";
import formatToPersianDate from "../utility/helper/format-date";
import { getRoleColor } from "../utility/helper/get-role-color";
import { getAllUsers } from "../utility/services/api/get/Users";
import UserPopover from "../views/user-popover";

const UsersList = React.memo(() => {

  // const navigate = useNavigate();
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const [discount_percentage, setDiscountPercentage] = useState(
  //   searchParams.get("discount_percentage") || ""
  // );
  // const [code, setCode] = useState(searchParams.get("code") || "");
  // const [limit, setLimit] = useState(parseInt(searchParams.get("limit")) || 5);
  // const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);
  // const queryKey = ["USERS", limit];

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
  //   };
  //   updateParams(params);
  // }, [limit, page]);

  const {
    data: usersData,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["USERS"],
    queryFn: () => getAllUsers({ page: 1, limit: 5 }),
    keepPreviousData: true,
  });

  const headers = [
    "نام",
    "نقش",
    "تاریخ عضویت",
    "وضعیت ایمیل",
    "شماره موبایل",
    "عملیات",
  ];

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
          <UserPopover style={{ marginRight: "10px" }} />
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
                <Users size={35} />
                <h1>مدیریت کاربران</h1>
              </div>
            }
            headers={headers}
            data={usersData.users || []}
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

export default UsersList;
