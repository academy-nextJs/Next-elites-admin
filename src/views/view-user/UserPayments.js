import { useCallback, useEffect, useState } from "react";
import { DollarSign, Eye } from "react-feather";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";
import ReusableTable from "../../@core/common/Table";
import { getStatus } from "../../utility/helper/get-status";
import { getAllPayments } from "../../utility/services/api/get/payments";

const UserPayments = ({ id }) => {
  const [userPayments, setUserPayments] = useState([]);
  const getUserPayments = async () => {
    const response = await getAllPayments({ userId: id });
    setUserPayments(response?.data);
  };
  const headers = ["مبلغ", "توضیحات", "وضعیت", "مشاهده رزرو"];

  const renderRow = useCallback((payment) => {
    return (
      <>
        <td>{payment.amount}</td>
        <td>{payment.description}</td>
        <td>{getStatus(payment.status)?.text}</td>
        <td>
          <Link to={`/bookings-management/${payment.bookingId}`}>
            <Eye />
          </Link>
        </td>
      </>
    );
  }, []);

  useEffect(() => {
    getUserPayments();
  }, []);
  return (
    <ReusableTable
      pageTitle={
        <div className="d-inline-flex gap-1 align-items-center">
          <DollarSign size={35} />
          <h1>پرداخت هایی که این کاربر انجام داده است</h1>
        </div>
      }
      headers={headers}
      data={userPayments}
      renderRow={renderRow}
      emptyState={<Alert>این کاربر پرداختی را انجام داده است</Alert>}
    />
  );
};
export default UserPayments;
