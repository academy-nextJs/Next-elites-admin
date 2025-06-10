import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const WarningModal = ({ isOpen, toggle, onConfirm }) => {
  return (
    <Modal className="yekan" isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>هشدار</ModalHeader>
      <ModalBody>
        آیا از حذف کردن این مقصد مطمعنید؟
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={onConfirm}>بله</Button>
        <Button color="secondary" onClick={toggle}>خیر</Button>
      </ModalFooter>
    </Modal>
  );
};

export default WarningModal;