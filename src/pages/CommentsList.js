import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import { MessageCircle } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Col,
  FormGroup,
  Input,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import ReusableTable from "../@core/common/Table";
import formatToPersianDate from "../utility/helper/format-date";
import CommentPopoverActions from "../views/comment-popover";
import { getAllComments } from "../utility/services/api/get/Comment";

const CommentsList = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [sort, setSort] = useState(searchParams.get("sort") || "created_at");
  const [order, setOrder] = useState(searchParams.get("order") || "DESC");
  const [rating, setRating] = useState(searchParams.get("rating") || "");
  const [limit, setLimit] = useState(parseInt(searchParams.get("limit")) || 5);
  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);

  const updateParams = useCallback(
    (newParams) => {
      const params = new URLSearchParams(newParams);
      navigate({ search: params.toString() });
    },
    [navigate]
  );

  useEffect(() => {
    const params = {
      sort,
      order,
      limit,
      page,
    };
    if (rating != null && rating !== "") params.rating = rating;
    updateParams(params);
  }, [sort, order, rating, limit, page, updateParams]);

  const {
    data: commentsData,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: [
      "comments",
      { sort, order, limit, page, ...(rating && { rating }) },
    ],
    queryFn: () =>
      getAllComments({ sort, order, limit, page, ...(rating && { rating }) }),
    keepPreviousData: true,
  });

  const headers = ["عنوان", "توضیحات", "امتیاز", "تاریخ ایجاد", "عملیات"];

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
            refetch={refetch}
          />
        </td>
      </>
    );
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
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
                <MessageCircle size={35} />
                <h1>مدیریت نظرات</h1>
              </div>
            }
            headers={headers}
            data={commentsData.data || []}
            renderRow={renderRow}
          />
          <Pagination className="mt-3">
            <PaginationItem disabled={page <= 1}>
              <PaginationLink onClick={() => handlePageChange(page - 1)}>
                قبلی
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(page + 1)}>
                بعدی
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </>
      )}
    </div>
  );
});

export default CommentsList;
