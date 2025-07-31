import { useState } from "react";
import { Trash2, User } from "react-feather";
import { Button, FormGroup, Input, Label } from "reactstrap";
import ReusableModal from "../../@core/common/Modal";
import Popover from "../../@core/common/Popver";
import useDeleteUser from "../../utility/hooks/useDeleteUser";
import useEditRole from "../../utility/hooks/useEditRole";

const roleOptions = [
  { value: "buyer", label: "خریدار" },
  { value: "seller", label: "فروشنده" },
  { value: "admin", label: "ادمین" },
];

const UserPopover = ({ id, refetch, userRole }) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [role, setRole] = useState(userRole);

  const toggleDeleteModal = () => {
    setIsOpenDeleteModal((prev) => !prev);
  };

  const toggleEditModal = () => {
    setIsEditModal((prev) => !prev);
  };

  const { deleteUserAction } = useDeleteUser(id, refetch, toggleDeleteModal);
  const { editUserAction } = useEditRole(role, id, refetch, toggleEditModal);

  const actionDropdownItems = [
    {
      label: "حذف",
      icon: Trash2,
      className: "text-danger",
      onClick: () => toggleDeleteModal(),
    },
    {
      label: "تغییر نقش",
      icon: User,
      onClick: () => toggleEditModal(),
    },
  ];
  const deleteFooterAction = (
    <>
      <Button color="danger" onClick={deleteUserAction}>
        بله
      </Button>
      <Button color="secondary" onClick={toggleDeleteModal}>
        خیر
      </Button>
    </>
  );
  const editFooterAction = (
    <>
      <Button color="danger" onClick={editUserAction}>
        بله
      </Button>
      <Button color="secondary" onClick={toggleEditModal}>
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
      <ReusableModal
        isOpen={isEditModal}
        toggle={toggleEditModal}
        title="ویرایش نقش"
        bodyContent={
          <FormGroup>
            <Label htmlFor="role">نقش کاربر:</Label>
            <Input
              type="select"
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Input>
          </FormGroup>
        }
        footerActions={editFooterAction}
      />
    </>
  );
};
export default UserPopover;
