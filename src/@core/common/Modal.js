import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ReusableModal = ({ isOpen, toggle, title, bodyContent, footerActions }) => {
  return (
    <Modal className="yekan" isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        {bodyContent}
      </ModalBody>
      <ModalFooter>
        {footerActions ? (
          footerActions
        ) : (
          <>
            <Button color="secondary" onClick={toggle}>بستن</Button>
          </>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default ReusableModal;