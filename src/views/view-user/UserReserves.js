import { useCallback, useEffect, useState } from "react";
import ReusableTable from "../../@core/common/Table";
import { Book, Eye } from "react-feather";
import { Alert } from "reactstrap";
import formatToPersianDate from "../../utility/helper/format-date";
import { getAllBookings } from "../../utility/services/api/get/Bookings";
import { Link } from "react-router-dom";

const UserReserves = ({ id }) => {
  const [userBookings, setUserBookings] = useState([]);
  const getUsersBookings = async () => {
    const response = await getAllBookings({ user_id: id });
    setUserBookings(response?.data);
  };
  const headers = ["از", "تا", "عملیات"];

  const renderRow = useCallback((user) => {
    return (
      <>
        <td>
          {user.reservedDates
            ? formatToPersianDate(user.reservedDates[0].value)
            : ""}
        </td>
        <td>
          {user.reservedDates
            ? formatToPersianDate(user.reservedDates[1].value)
            : ""}
        </td>
        <td>
          <Link to={`/bookings-management/${id}`}>
            <Eye />
          </Link>
        </td>
      </>
    );
  }, []);

  useEffect(() => {
    getUsersBookings();
  }, []);
  return (
    <ReusableTable
      pageTitle={
        <div className="d-inline-flex gap-1 align-items-center">
          <Book size={35} />
          <h1>خانه هایی که این کاربر رزرو کرده است</h1>
        </div>
      }
      headers={headers}
      data={userBookings}
      renderRow={renderRow}
      emptyState={<Alert>این کاربر خانه ای را رزرو نکرده است</Alert>}
    />
  );
};
export default UserReserves;
