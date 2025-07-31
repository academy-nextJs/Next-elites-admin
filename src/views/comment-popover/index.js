import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Edit3, Home, MessageCircle, Star, Trash2, User } from "react-feather";
import toast from "react-hot-toast";
import Rating from "react-rating";
import { Button, FormGroup, Input, Label } from "reactstrap";
import ReusableModal from "../../@core/common/Modal";
import Popover from "../../@core/common/Popver";
import { deleteComment } from "../../utility/services/api/delete/Comment";
import { editComment } from "../../utility/services/api/put/Comment";
import { useNavigate } from "react-router-dom";

const CommentPopoverActions = ({ id, refetch, title, caption, rating, userId, houseId }) => {
  const navigate = useNavigate()
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [commentTitle, setCommentTitle] = useState(title);
  const [commentCaption, setCommentCaption] = useState(caption);
  const [commentRating, setCommentRating] = useState(rating);
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
          <Label htmlFor="title">عنوان کامنت</Label>
          <Input
            id="title"
            type="text"
            value={commentTitle}
            onChange={(e) => setCommentTitle(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="caption">توضیح کامنت</Label>
          <Input
            id="caption"
            type="text"
            value={commentCaption}
            onChange={(e) => setCommentCaption(e.target.value)}
          />
        </div>

        <div className="d-flex flex-column">
          <Label htmlFor="rate">امتیاز</Label>
          <Rating
            id="rate"
            direction="rtl"
            initialRating={commentRating}
            onChange={(value) => setCommentRating(value)}
            emptySymbol={<Star />}
            placeholderSymbol={<Star className="text-primary" />}
            fullSymbol={<Star className="text-primary" />}
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
      <Button color="danger" onClick={() => deleteTableComment()}>
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
    {
      label: "مشاهده کاربر",
      icon: User,
      onClick: () => navigate(`/users-management/${userId}`),
    },
    {
      label: "مشاهده ملک",
      icon: Home,
      onClick: () => navigate(`/houses-management/${houseId}`),
    },
  ];
  const { mutate: deleteTableComment } = useMutation({
    mutationKey: ["DELETE_COMMENT"],
    mutationFn: () =>
      toast.promise(deleteComment(id), {
        loading: "پردازش...",
      }),
    onSuccess: () => {
      refetch();
      toast.success("کامنت شما با موفقیت حذف شد");
      toggleDeleteModal();
    },
  });
  const { mutate: editTableComment } = useMutation({
    mutationKey: ["EDIT_COMMENT"],
    mutationFn: () =>
      toast.promise(
        editComment(
          {
            title: commentTitle,
            caption: commentCaption,
            rating: commentRating,
          },
          id
        ),
        {
          loading: "پردازش...",
        }
      ),
    onSuccess: () => {
      refetch();
      toast.success("کامنت شما با موفقیت ویرایش شد");
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
export default CommentPopoverActions;
