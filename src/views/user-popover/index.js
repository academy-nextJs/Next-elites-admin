import { useState } from "react";
import { Edit3, Trash2, User } from "react-feather";
import { Button } from "reactstrap";
import ReusableModal from "../../@core/common/Modal";
import Popover from "../../@core/common/Popver";

const UserPopover = ({ id, refetch }) => {
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
    {
      label: "تغییر نقش",
      icon: User,
      onClick: () => toggleDeleteModal(),
    },
  ];
  const deleteFooterAction = (
    <>
      <Button color="danger">
        بله
      </Button>
      <Button color="secondary" onClick={toggleDeleteModal}>
        خیر
      </Button>
    </>
  );
  return (
    <>
      <Popover items={actionDropdownItems} />
      <ReusableModal
        isOpen={isOpenDeleteModal}
        toggle={toggleDeleteModal}
        title="هشدار"
        bodyContent={<p>آیا از حذف کردن این کاربر مطمعنید؟</p>}
        footerActions={deleteFooterAction}
      />
    </>
  );
};
export default UserPopover;
