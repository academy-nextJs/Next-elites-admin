import { Edit3, Trash2 } from "react-feather";
import Popover from "../../@core/common/Popver";
import ReusableModal from "../../@core/common/Modal";
import { Button } from "reactstrap";
import { useState } from "react";

const HousePopover = ({ id, refetch }) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const toggleDeleteModal = () => {
    setIsOpenDeleteModal((prev) => !prev);
  };
  const actionDropdownItems = [
    {
      label: "ویرایش",
      icon: Edit3,
      //   onClick: () => toggleEditModal(),
    },
    {
      label: "حذف",
      icon: Trash2,
      className: "text-danger",
        onClick: () => toggleDeleteModal(),
    },
  ];
  const deleteFooterAction = (
    <>
      <Button color="danger">بله</Button>
      <Button color="secondary">خیر</Button>
    </>
  );
  return (
    <>
      <Popover items={actionDropdownItems} />
      <ReusableModal
        isOpen={isOpenDeleteModal}
        toggle={toggleDeleteModal}
        title="هشدار"
        bodyContent={<p>آیا از حذف کردن این خانه مطمعنید؟</p>}
        footerActions={deleteFooterAction}
      />
    </>
  );
};
export default HousePopover;
