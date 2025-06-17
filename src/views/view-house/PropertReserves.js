import { useCallback, useEffect, useState } from "react";
import ReusableTable from "../../@core/common/Table";
import { Book, Eye } from "react-feather";
import { Alert } from "reactstrap";
import formatToPersianDate from "../../utility/helper/format-date";
import { getAllBookings } from "../../utility/services/api/get/Bookings";
import { Link } from "react-router-dom";

const PropertReserves = ({ id }) => {
  const [propertyBookings, setPropertyBookings] = useState([]);
  const getPropertyBookings = async () => {
    const response = await getAllBookings();
    const filteredBookings = response.filter((e) => e.houseId == id);
    console.log(response);
    setPropertyBookings(filteredBookings);
  };
  const headers = ["از", "تا", "عملیات"];

  const renderRow = useCallback((house) => {
    return (
      <>
        <td>
          {house.reservedDates
            ? formatToPersianDate(house.reservedDates[0].value)
            : ""}
        </td>
        <td>
          {house.reservedDates
            ? formatToPersianDate(house.reservedDates[1].value)
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
    getPropertyBookings();
  }, []);
  return (
    <ReusableTable
      pageTitle={
        <div className="d-inline-flex gap-1 align-items-center">
          <Book size={35} />
          <h1>کاربرانی که این خانه را رزرو کردند</h1>
        </div>
      }
      headers={headers}
      data={propertyBookings}
      renderRow={renderRow}
      emptyState={<Alert>کسی این خانه را رزرو نکرده است</Alert>}
    />
  );
};
export default PropertReserves;