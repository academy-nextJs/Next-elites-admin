import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useMemo } from "react";
import { DollarSign } from "react-feather";
import EmptyState from "../../@core/common/EmptyState";
import ErrorDisplay from "../../@core/common/ErrorDisplay";
import LoadingSpinner from "../../@core/common/LoadingSpinner";
import ReusableTable from "../../@core/common/Table";
import { getAllPayments } from "../../utility/services/api/get/payments";
import { formatNumber } from "../../utility/helper/format-number";
import formatToPersianDate from "../../utility/helper/format-date";
import PaymentPopover from "./popover";

const Payments = React.memo(() => {
  const {
    data: paymentData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["PAYMENTS"],
    queryFn: () => getAllPayments(),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const tableData = useMemo(
    () => paymentData?.payments || [],
    [paymentData?.payments]
  );

  const headers = useMemo(
    () => ["مبلغ", "وضعیت", "توضیحات", "تاریخ", "عملیات"],
    []
  );

  const renderRow = useCallback((payment) => {
    return (
      <>
        <td>{formatNumber(payment.amount)}</td>
        <td>
          <p className="fw-bolder">
            {payment.status == "completed"
              ? "تایید شده"
              : payment.status == "pending"
              ? "در انتظار"
              : "لغو شده"}
          </p>
        </td>
        <td>{payment.description}</td>
        <td>{formatToPersianDate(payment.createdAt)}</td>
        <td>
          <PaymentPopover payment={payment} id={payment.id} refetch={refetch} />
        </td>
      </>
    );
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div className="houses-list-container">
      <ReusableTable
        pageTitle={
          <div className="d-inline-flex gap-1 align-items-center">
            <DollarSign size={35} />
            <h1>مدیریت پرداختی ها</h1>
          </div>
        }
        headerStyle={{ whiteSpace: "nowrap", fontSize: "18px" }}
        headers={headers}
        data={tableData}
        renderRow={renderRow}
        rowKey={(location) => location.id}
        emptyState={<EmptyState onReset={refetch} />}
      />
    </div>
  );
});

export default Payments;
