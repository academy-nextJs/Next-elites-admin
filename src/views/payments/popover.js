import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Book, Check, MessageSquare, Trash2, User } from "react-feather";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import ReusableModal from "../../@core/common/Modal";
import Popover from "../../@core/common/Popver";
import { deletePayment } from "../../utility/services/api/delete/Payments";
import { editPayment } from "../../utility/services/api/put/Payment";
import EditPaymentModal from "./EditPaymentModal";
import { verifyPayment } from "../../utility/services/api/post/PaymentVerify";
import WarningModal from "../../@core/common/WarningModal";

const PaymentPopover = ({ refetch, id, payment }) => {
  const navigate = useNavigate();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenVerifyModal, setIsOpenVerifyModal] = useState(false);
  const toggleDeleteModal = () => {
    setIsOpenDeleteModal((prev) => !prev);
  };

  const toggleEditModal = () => {
    setIsOpenEditModal((prev) => !prev);
  };

  const toggleVerifyModal = () => {
    setIsOpenVerifyModal((prev) => !prev);
  };

  const { mutate: handleEdit } = useMutation({
    mutationKey: ["PUT_LOCATIONS"],
    mutationFn: (data) =>
      toast.promise(
        editPayment(
          {
            amount: data.amount,
            description: data.description,
          },
          id
        ),
        {
          loading: "درحال پردازش",
        }
      ),
    onSuccess: () => {
      toast.success("پرداخت با موفقیت ویرایش شد");
      refetch();
    },
  });

  const { mutate: handleDelete } = useMutation({
    mutationKey: ["DELETE_PAYMENT"],
    mutationFn: () =>
      toast.promise(deletePayment(id), {
        loading: "درحال حذف",
        success: "با موفقیت حذف شد",
        error: "خطا در حذف",
      }),
    onSuccess: () => refetch(),
  });

  const { mutate: verify } = useMutation({
    mutationKey: ["VERIFY_PAYMENT"],

    mutationFn: () =>
      toast.promise(verifyPayment(id), {
        loading: "درحال تایید",
        success: "با موفقیت تایید شد",
        error: "خطا در حذف",
      }),
    onSuccess: () => refetch(),
  });

  const actionDropdownItems = [
    { label: "تایید", icon: Check, onClick: toggleVerifyModal },
    {
      label: " ویرایش",
      icon: MessageSquare,
      onClick: toggleEditModal,
    },
    {
      label: "حذف",
      icon: Trash2,
      className: "text-danger",
      onClick: toggleDeleteModal,
    },
    {
      label: "مشاهده کاربر",
      icon: User,
      onClick: () => navigate(`/users-management/${payment.userId}`),
    },
    {
      label: "مشاهده رزرو",
      icon: Book,
      onClick: () => navigate(`/bookings-management/${payment.bookingId}`),
    },
  ];

  return (
    <>
      <Popover items={actionDropdownItems} />
      <ReusableModal
        isOpen={isOpenDeleteModal}
        toggle={toggleDeleteModal}
        bodyContent={<p>آیا از حذف کردن این پرداخت مطمئنید؟</p>}
        footerActions={
          <>
            <Button color="danger" onClick={handleDelete}>
              بله
            </Button>
            <Button onClick={toggleDeleteModal} color="secondary">
              خیر
            </Button>
          </>
        }
      />
      <EditPaymentModal
        paymentData={payment}
        onSubmit={handleEdit}
        toggle={toggleEditModal}
        isOpen={isOpenEditModal}
      />
      <WarningModal
        message="آیا از تایید کردن این پرداخت مطمعنید؟"
        title="هشدار"
        isOpen={isOpenVerifyModal}
        toggle={toggleVerifyModal}
        onConfirm={verify}
      />
    </>
  );
};

export default PaymentPopover;
