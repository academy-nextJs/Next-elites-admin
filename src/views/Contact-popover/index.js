import { useState } from "react";
import { MessageSquare, Trash2 } from "react-feather";
import { Button } from "reactstrap";
import ReusableModal from "../../@core/common/Modal";
import Popover from "../../@core/common/Popver";
import { deleteContactMessage } from "../../utility/services/api/get/ContactUS";

const ContactPopover = ({ ContactUS }) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleViewModal = () => setModalOpen((prev) => !prev);
  const toggleDeleteModal = () => setIsOpenDeleteModal((prev) => !prev);

  const handleDelete = async () => {
    try {
      await deleteContactMessage(ContactUS.id);
      toggleDeleteModal();
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const actionDropdownItems = [
    {
      label: "مشاهده کامل",
      icon: MessageSquare,
      onClick: toggleViewModal,
    },
    {
      label: "حذف",
      icon: Trash2,
      className: "text-danger",
      onClick: toggleDeleteModal,
    },
  ];

  return (
    <>
      <Popover items={actionDropdownItems} />

      <ReusableModal
        isOpen={isOpenDeleteModal}
        toggle={toggleDeleteModal}
        bodyContent={<p>آیا از حذف کردن این پیام مطمئنید؟</p>}
        footerActions={
          <>
            <Button color="danger" onClick={handleDelete}>
              بله
            </Button>
            <Button onClick={toggleDeleteModal} color="secondary">
              خیر
            </Button>
          </>
        }
      />

      <ReusableModal
        isOpen={modalOpen}
        toggle={toggleViewModal}
        bodyContent={
          <div className="py-1 px-2 bg-light rounded-3 shadow-sm border border-muted">
            <h5 className="text-dark fw-bold">{ContactUS.title}</h5>
            <p
              className=""
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "15px",
                lineHeight: "1.6",
                marginBottom: "0",
              }}
            >
              {ContactUS.message}
            </p>
          </div>
        }
      />
    </>
  );
};

export default ContactPopover;
