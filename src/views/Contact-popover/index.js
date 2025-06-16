import { useEffect, useState } from "react";
import { Edit3, Trash2 } from "react-feather";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import ReusableModal from "../../@core/common/Modal";
import Popover from "../../@core/common/Popver";

const ContactPopover = ({ ContactUS }) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedMessage, setEditedMessage] = useState(ContactUS.message);
  const [editedTitle, setEditedTitle] = useState(ContactUS.title);

  const toggleDeleteModal = () => setIsOpenDeleteModal((prev) => !prev);
  const toggleEditModal = () => setEditModalOpen((prev) => !prev);

  useEffect(() => {
    setEditedMessage(ContactUS.message);
    setEditedTitle(ContactUS.title);
  }, [ContactUS]);

  const actionDropdownItems = [
    {
      label: "ویرایش",
      icon: Edit3,
      onClick: toggleEditModal,
    },
    {
      label: "حذف",
      icon: Trash2,
      className: "text-danger",
      onClick: toggleDeleteModal,
    },
  ];

  const handleMessageChange = (e) => setEditedMessage(e.target.value);
  const handleTitleChange = (e) => setEditedTitle(e.target.value);

  return (
    <>
      <Popover items={actionDropdownItems} />

      <ReusableModal
        isOpen={isOpenDeleteModal}
        toggle={toggleDeleteModal}
        bodyContent={<p>آیا از حذف کردن این پیام مطمئنید؟</p>}
        footerActions={
          <>
            <Button color="danger">بله</Button>
            <Button onClick={toggleDeleteModal} color="secondary">
              خیر
            </Button>
          </>
        }
      />

      <ReusableModal
        isOpen={editModalOpen}
        toggle={toggleEditModal}
        bodyContent={
          <Form>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label
                    for="title"
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#333",
                    }}
                  >
                    عنوان پیام
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    value={editedTitle}
                    onChange={handleTitleChange}
                    placeholder="عنوان جدید پیام"
                    className="mb-3"
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Label
                    for="message"
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#333",
                    }}
                  >
                    پیام
                  </Label>
                  <Input
                    id="message"
                    type="textarea"
                    value={editedMessage}
                    onChange={handleMessageChange}
                    placeholder="ویرایش پیام"
                    rows={5}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        }
        footerActions={
          <>
            <Button color="primary">تایید</Button>
            <Button onClick={toggleEditModal} color="secondary">
              لغو
            </Button>
          </>
        }
      />
    </>
  );
};

export default ContactPopover;
