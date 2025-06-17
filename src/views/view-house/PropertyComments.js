
import { useCallback, useEffect, useState } from "react";
import { Eye, MessageSquare } from "react-feather";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";
import ReusableTable from "../../@core/common/Table";
import { getAllComments } from "../../utility/services/api/get/Comment";

const PropertyComments = ({ id }) => {
  const [propertyComments, setPropertyComments] = useState([]);
  const getPropertyComments = async () => {
    const response = await getAllComments({ house_id: id });
    setPropertyComments(response);
  };
  const headers = ["عنوان", "محتوا", "عملیات"];

  const renderRow = useCallback((comment) => {
    return (
      <>
        <td>{comment.title}</td>
        <td>{comment.caption}</td>
        <td>
          <Link to={`/comments-management/${id}`}>
            <Eye />
          </Link>
        </td>
      </>
    );
  }, []);

  useEffect(() => {
    getPropertyComments();
  }, []);
  return (
    <ReusableTable
      pageTitle={
        <div className="d-inline-flex gap-1 align-items-center">
          <MessageSquare size={35} />
          <h1>نظرات درباره این خانه</h1>
        </div>
      }
      headers={headers}
      data={propertyComments.data}
      renderRow={renderRow}
      emptyState={<Alert>بدون نظر</Alert>}
    />
  );
};
export default PropertyComments;

