// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Reactstrap Imports
import { Badge, Button, Card, CardBody } from "reactstrap";

// ** Third Party Components

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import WarningModal from "../../@core/common/WarningModal";
import avatar from "../../assets/images/avatars/10.png";
import formatToPersianDate from "../../utility/helper/format-date";
import { getStatus } from "../../utility/helper/get-status";
import { getUserById } from "../../utility/services/api/get/Users";
import {
  cancelBooking,
  restoreBooking,
} from "../../utility/services/api/post/Booking";
import {
  confirmBooking,
  editBooking,
} from "../../utility/services/api/put/Booking";
import EditModal from "../booking-popover/EditModal";

const BookingInfoCard = ({ data, refetch, id }) => {
  const status = getStatus(data.status);
  const [userData, setUserData] = useState({});
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
  const { mutate: cancelBookingAction } = useMutation({
    mutationKey: ["CANCEL_BOOKING"],
    mutationFn: () =>
      toast.promise(cancelBooking(id), {
        error: "خطا در لغو",
        loading: "درحال پردازش...",
        success: "رزرو با موفقیت لغو شد",
      }),
    onSuccess: () => refetch(),
  });
  const { mutate: continueBookingAction } = useMutation({
    mutationKey: ["CONTINUE_BOOKING"],
    mutationFn: () =>
      toast.promise(restoreBooking(id), {
        error: "خطا در بازیابی",
        loading: "درحال پردازش...",
        success: "رزرو با موفقیت بازیابی شد",
      }),
    onSuccess: () => refetch(),
  });
  const { mutate: confirmBookingAction } = useMutation({
    mutationKey: ["CONFIRM_BOOKING"],
    mutationFn: () =>
      toast.promise(confirmBooking(id), {
        error: "خطا در تایید",
        loading: "درحال پردازش...",
        success: "رزرو با موفقیت تایید شد",
      }),
    onSuccess: () => refetch(),
  });
  const { mutate: editBookingAction } = useMutation({
    mutationKey: ["EDIT_BOOKING"],
    mutationFn: (payload) =>
      toast.promise(editBooking({ ...payload, id: id }), {
        error: "خطا در ویرایش",
        loading: "درحال پردازش...",
        success: "رزرو با موفقیت ویرایش شد",
      }),
    onSuccess: () => {
      setIsEditModalOpen(!isEditModalOpen);
      refetch();
    },
  });
  const fetchUserData = async () => {
    const response = await getUserById(data?.user_id);
    setUserData(response.user);
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  const bookingDetail = [
    { title: "شناسه خانه:", desc: data?.houseId + " #" },
    { title: "شناسه کاربر:", desc: data?.user_id + " #" },
    {
      title: "از:",
      desc:
        data?.reservedDates !== undefined &&
        formatToPersianDate(data?.reservedDates[0].value),
    },
    {
      title: "تا:",
      desc:
        data?.reservedDates !== undefined &&
        formatToPersianDate(data?.reservedDates[1].value),
    },
    { title: "شماره تلفن کاربر:", desc: data?.sharedMobile },
    { title: "ایمیل کاربر:", desc: data?.sharedEmail },
    { title: "ساخته شده در تاریخ:", desc: formatToPersianDate(data?.createdAt) },
    { title: "آخرین تغییرات:", desc: formatToPersianDate(data?.updatedAt) },
  ];

  const actionBtns = () => {
    return (
      <>
        <Button
          color="primary"
          style={{ whiteSpace: "nowrap" }}
          onClick={() => setIsEditModalOpen(!isEditModalOpen)}
        >
          ویرایش
        </Button>
        {data?.status === "pending" ? (
          <>
            <Button
              onClick={() => toggleWarningModal()}
              className="ms-1"
              style={{ whiteSpace: "nowrap" }}
              color="danger"
              outline
            >
              لغو درخواست
            </Button>{" "}
            <Button
              onClick={() => toggleWarningModal3()}
              className="ms-1"
              style={{ whiteSpace: "nowrap" }}
              color="success"
              outline
            >
              تایید درخواست
            </Button>
          </>
        ) : data.status === "confirmed" ? (
          <></>
        ) : data.status === "canceled" ? (
          <Button
            className="ms-1"
            color="info"
            outline
            onClick={() => toggleWarningModal2()}
            style={{ whiteSpace: "nowrap" }}
          >
            بازیابی رزرو
          </Button>
        ) : null}
      </>
    );
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              <div className="pb-75 rounded">
                <img
                  width={150}
                  height={150}
                  src={
                    userData?.profilePicture ? userData?.profilePicture : avatar
                  }
                  className="rounded"
                />
              </div>
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>{userData?.fullName}</h4>
                  <div className="d-flex justify-content-center gap-1">
                    <Badge color={status?.color} className="text-capitalize">
                      {status?.text}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">مشخصات</h4>
          <div className="info-container">
            <ul className="list-unstyled">
              {bookingDetail?.map((item, index) => (
                <li key={index} className="mb-75">
                  <span className="fw-bolder me-25">{item.title}</span>
                  <span>{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="d-flex justify-content-center pt-2">
            {actionBtns()}
          </div>
        </CardBody>
      </Card>
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
        initialData={data}
        onSave={(updatedData) => editBookingAction(updatedData)}
      />
    </Fragment>
  );
};

export default BookingInfoCard;
