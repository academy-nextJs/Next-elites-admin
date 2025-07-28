import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { Check, Edit3, RotateCcw, Users, X } from "react-feather";
import toast from "react-hot-toast";
import ReusableModal from "../../@core/common/Modal";
import Popover from "../../@core/common/Popver";
import ReusableTable from "../../@core/common/Table";
import WarningModal from "../../@core/common/WarningModal";
import {
  cancelBooking,
  restoreBooking,
} from "../../utility/services/api/post/Booking";
import {
  confirmBooking,
  editBooking,
} from "../../utility/services/api/put/Booking";
import EditModal from "./EditModal";

const BookingPopover = ({ id, refetch, travelersData, status, booking }) => {
  const [travelersModal, setTravelersModal] = useState(false);
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [warningModalOpen2, setWarningModalOpen2] = useState(false);
  const [warningModalOpen3, setWarningModalOpen3] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggleWarningModal = () => {
    setWarningModalOpen((prev) => !prev);
  };
  const toggleWarningModal2 = () => {
    setWarningModalOpen2((prev) => !prev);
  };
  const toggleWarningModal3 = () => {
    setWarningModalOpen3((prev) => !prev);
  };
  const toggleTravelersModal = () => {
    setTravelersModal((prev) => !prev);
  };
  const headers = ["نام", "نام خانوادگی", "کد ملی", "جنسیت", "تاریخ تولد"];
  const renderRow = useCallback((user) => {
    return (
      <>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.nationalId}</td>
        <td>{user.gender}</td>
        <td>{user.birthDate}</td>
      </>
    );
  }, []);
  const { mutate: cancelBookingAction } = useMutation({
    mutationKey: ["CANCEL_BOOKING"],
    mutationFn: () =>
      toast.promise(cancelBooking(id), {
        error: "خطا در لغو",
        loading: "درحال پردازش...",
        success: "رزرو با موفقیت لغو شد",
      }),
    onSuccess: () => {
      toggleWarningModal();
      refetch();
    },
  });
  const { mutate: continueBookingAction } = useMutation({
    mutationKey: ["CONTINUE_BOOKING"],
    mutationFn: () =>
      toast.promise(restoreBooking(id), {
        error: "خطا در بازیابی",
        loading: "درحال پردازش...",
        success: "رزرو با موفقیت بازیابی شد",
      }),
    onSuccess: () => {
      toggleWarningModal2();
      refetch();
    },
  });
  const { mutate: confirmBookingAction } = useMutation({
    mutationKey: ["CONFIRM_BOOKING"],
    mutationFn: () =>
      toast.promise(confirmBooking(id), {
        error: "خطا در تایید",
        loading: "درحال پردازش...",
        success: "رزرو با موفقیت تایید شد",
      }),
    onSuccess: () => {
      toggleWarningModal3();
      refetch();
    },
  });
  const { mutate: editBookingAction } = useMutation({
    mutationKey: ["EDIT_BOOKING"],
    mutationFn: (payload) =>
      toast.promise(editBooking({ ...payload, id }), {
        error: "خطا در ویرایش",
        loading: "درحال پردازش...",
        success: "رزرو با موفقیت ویرایش شد",
      }),
    onSuccess: () => {
      setIsEditModalOpen(!isEditModalOpen);
      refetch();
    },
  });
  const confirmedDropdown = [
    {
      label: "ویرایش",
      icon: Edit3,
      onClick: () => setIsEditModalOpen(!isEditModalOpen),
    },
    {
      label: "مسافران",
      icon: Users,
      onClick: () => toggleTravelersModal(),
    },
  ];

  const canceledDropdown = [
    {
      label: "ویرایش",
      icon: Edit3,
      onClick: () => setIsEditModalOpen(!isEditModalOpen),
    },
    {
      label: "بازیابی",
      icon: RotateCcw,
      onClick: () => toggleWarningModal2(),
    },
    {
      label: "مسافران",
      icon: Users,
      onClick: () => toggleTravelersModal(),
    },
  ];

  const pendingDropdown = [
    {
      label: "ویرایش",
      icon: Edit3,
      onClick: () => setIsEditModalOpen(!isEditModalOpen),
    },
    {
      label: "لغو",
      icon: X,
      onClick: () => toggleWarningModal(),
    },
    {
      label: "تایید",
      icon: Check,
      onClick: () => toggleWarningModal3(),
    },
    {
      label: "مسافران",
      icon: Users,
      onClick: () => toggleTravelersModal(),
    },
  ];
  return (
    <>
      <Popover
        items={
          status == "pending"
            ? pendingDropdown
            : status == "canceled"
            ? canceledDropdown
            : status == "confirmed"
            ? confirmedDropdown
            : ""
        }
      />
      <ReusableModal
        isOpen={travelersModal}
        toggle={toggleTravelersModal}
        title="مشخصات مسافران"
        bodyContent={
          <ReusableTable
            headerStyle={{ fontSize: "14px", whiteSpace: "nowrap" }}
            pageTitle={
              <div className="d-inline-flex gap-1 align-items-center">
                <Users size={35} />
                <h1>تعداد {travelersData.length} نفر</h1>
              </div>
            }
            headers={headers}
            data={travelersData || []}
            renderRow={renderRow}
          />
        }
      />
      <WarningModal
        message="آیا از لغو کردن این رزرو مطمعنید؟"
        title="هشدار"
        isOpen={warningModalOpen}
        toggle={toggleWarningModal}
        onConfirm={cancelBookingAction}
      />
      <WarningModal
        message="آیا از بازیابی این رزرو مطمعنید؟"
        title="هشدار"
        isOpen={warningModalOpen2}
        toggle={toggleWarningModal2}
        onConfirm={continueBookingAction}
      />
      <WarningModal
        message="آیا از تایید این رزرو مطمعنید؟"
        title="هشدار"
        isOpen={warningModalOpen3}
        toggle={toggleWarningModal3}
        onConfirm={confirmBookingAction}
      />
      <EditModal
        isOpen={isEditModalOpen}
        toggle={() => setIsEditModalOpen(!isEditModalOpen)}
        initialData={booking}
        onSave={(updatedData) => editBookingAction(updatedData)}
      />
    </>
  );
};
export default BookingPopover;
