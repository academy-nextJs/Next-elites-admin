import React from "react";
import { Button } from "reactstrap";
import ReusableModal from "../../@core/common/Modal";

const WarningModal = ({ isOpen, toggle, onConfirm }) => {
  const bodyContent = (
    <p>آیا از حذف کردن این مقصد مطمعنید؟</p>
  );

  const footerActions = (
    <>
      <Button color="danger" onClick={onConfirm}>بله</Button>
      <Button color="secondary" onClick={toggle}>خیر</Button>
    </>
  );

  return (
    <ReusableModal
      isOpen={isOpen}
      toggle={toggle}
      title="هشدار"
      bodyContent={bodyContent}
      footerActions={footerActions}
    />
  );
};

export default WarningModal;