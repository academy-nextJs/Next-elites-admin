import React from "react";
import { Button } from "reactstrap";
import ReusableModal from "./Modal";

const WarningModal = ({ isOpen, toggle, title = "Warning", message, onConfirm }) => {
  const bodyContent = (
    <p>{message}</p>
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
      title={title}
      bodyContent={bodyContent}
      footerActions={footerActions}
    />
  );
};

export default WarningModal;