import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Edit3, Trash2 } from "react-feather";
import toast from "react-hot-toast";
import { Button, FormGroup, Input, Label } from "reactstrap";
import ReusableModal from "../../@core/common/Modal";
import Popover from "../../@core/common/Popver";
import { editDiscount } from "../../utility/services/api/put/Discount";
import { deleteDiscountCode } from "../../utility/services/api/delete/DiscountCode";

const DiscountPopoverActions = ({
  id,
  refetch,
  initialCode,
  initialDiscountPercentage,
  initialValidUntil,
}) => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [code, setCode] = useState(initialCode);
  const [discount_percentage, setDiscountPercentage] = useState(
    initialDiscountPercentage
  );
  const [valid_until, setValid_until] = useState(initialValidUntil);
  const toggleEditModal = () => {
    setIsOpenEditModal((prev) => !prev);
  };
  const toggleDeleteModal = () => {
    setIsOpenDeleteModal((prev) => !prev);
  };
  const editBodyContent = (
    <>
      <FormGroup className="d-flex flex-column gap-1">
        <div>
          <Label htmlFor="code">کد</Label>
          <Input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="discount_percentage">درصد تخفیف</Label>
          <Input
            id="discount_percentage"
            type="text"
            value={discount_percentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
          />
        </div>

        <div className="d-flex flex-column">
          <Label htmlFor="valid_until">معتبر تا</Label>
          <Input
            id="valid_until"
            type="text"
            value={valid_until}
            onChange={(e) => setValid_until(e.target.value)}
          />
        </div>
      </FormGroup>
    </>
  );
  const editFooterActions = (
    <>
      <Button color="primary" onClick={() => editTableComment()}>
        تایید
      </Button>
      <Button color="secondary" onClick={() => toggleEditModal()}>
        لغو
      </Button>
    </>
  );
  const deleteFooterAction = (
    <>
      <Button color="danger" onClick={() => deleteTableDiscountCode()}>
        بله
      </Button>
      <Button color="secondary" onClick={toggleDeleteModal}>
        خیر
      </Button>
    </>
  );
  const actionDropdownItems = [
    {
      label: "ویرایش",
      icon: Edit3,
      onClick: () => toggleEditModal(),
    },
    {
      label: "حذف",
      icon: Trash2,
      className: "text-danger",
      onClick: () => toggleDeleteModal(),
    },
  ];
  const { mutate: deleteTableDiscountCode } = useMutation({
    mutationKey: ["DELETE_CODE"],
    mutationFn: () =>
      toast.promise(deleteDiscountCode(id), {
        loading: "پردازش...",
      }),
    onSuccess: () => {
      refetch();
      toast.success("کد تخفیف شما با موفقیت حذف شد");
      toggleDeleteModal();
    },
  });
  const { mutate: editTableComment } = useMutation({
    mutationKey: ["EDIT_DISCOUNT"],
    mutationFn: () =>
      toast.promise(
        editDiscount(
          {
            code: code,
            discount_percentage: discount_percentage,
            valid_until: valid_until,
          },
          id
        ),
        {
          loading: "پردازش...",
        }
      ),
    onSuccess: () => {
      refetch();
      toast.success("کد تخفیف شما با موفقیت ویرایش شد");
      toggleEditModal();
    },
  });
  return (
    <>
      <Popover items={actionDropdownItems} />
      <ReusableModal
        isOpen={isOpenEditModal}
        toggle={toggleEditModal}
        title="ویرایش کامنت"
        bodyContent={editBodyContent}
        footerActions={editFooterActions}
      />
      <ReusableModal
        isOpen={isOpenDeleteModal}
        toggle={toggleDeleteModal}
        title="هشدار"
        bodyContent={<p>آیا از حذف کردن این نظر مطمعنید؟</p>}
        footerActions={deleteFooterAction}
      />
    </>
  );
};
export default DiscountPopoverActions;
