import { useCallback, useState } from "react";
import { Check, Edit3, Users, X } from "react-feather";
import ReusableModal from "../../@core/common/Modal";
import Popover from "../../@core/common/Popver";
import ReusableTable from "../../@core/common/Table";

const BookingPopover = ({ id, refetch, travelersData }) => {
  const [travelersModal, setTravelersModal] = useState(false);
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
  const actionDropdownItems = [
    {
      label: "ویرایش",
      icon: Edit3,
      //   onClick: () => toggleEditModal(),
    },
    {
      label: "لفو",
      icon: X,
      className: "text-danger",
      //   onClick: () => toggleDeleteModal(),
    },
    {
      label: "تایید",
      icon: Check,
      className: "text-success",
      //   onClick: () => toggleDeleteModal(),
    },
    {
      label: "مسافران",
      icon: Users,
      onClick: () => toggleTravelersModal(),
    },
  ];
  return (
    <>
      <Popover items={actionDropdownItems} />
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
    </>
  );
};
export default BookingPopover;
