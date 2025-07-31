import { useCallback, useEffect, useState } from "react";
import { Eye, Home } from "react-feather";
import { Link } from "react-router-dom";
import { Alert, Badge } from "reactstrap";
import ReusableTable from "../../@core/common/Table";
import { getTransactionType } from "../../utility/helper/transaction-type";
import { getAllAdminHouses } from "../../utility/services/api/get/Houses";

const UserHouses = ({ id }) => {
  const [userHouses, setUserHouses] = useState([]);
  const getUserHouses = async () => {
    const response = await getAllAdminHouses({ sellerId: id });
    setUserHouses(response?.data);
  };
  const headers = ["عنوان", "مبلغ", "نوع", "مشاهده"];

  const renderRow = useCallback((house) => {
    const transactionType = getTransactionType(house.transaction_type);

    return (
      <>
        <td>{house.title}</td>
        <td>{house.price}</td>
        <td>
          <Badge color={transactionType?.color}>{transactionType?.text}</Badge>
        </td>
        <td>
          <Link to={`/bookings-management/${house.id}`}>
            <Eye />
          </Link>
        </td>
      </>
    );
  }, []);

  useEffect(() => {
    getUserHouses();
  }, []);
  return (
    <ReusableTable
      pageTitle={
        <div className="d-inline-flex gap-1 align-items-center">
          <Home size={35} />
          <h1>آگهی هایی که این کاربر ساخته است</h1>
        </div>
      }
      headers={headers}
      data={userHouses}
      renderRow={renderRow}
      emptyState={<Alert>این کاربر آگهی نساخته است</Alert>}
    />
  );
};
export default UserHouses;
