import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { MessageSquare, Trash2 } from "react-feather";
import toast from "react-hot-toast";
import { Button } from "reactstrap";
import ReusableModal from "../../@core/common/Modal";
import Popover from "../../@core/common/Popver";
import { deleteLocation } from "../../utility/services/api/delete/Location";
import { editLocation } from "../../utility/services/api/put/Location";
import EditCityModal from "./EditCityModal";

const LocationPopover = ({ refetch, id, lat, lng, city }) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const toggleEditModal = () => setIsOpenEditModal((prev) => !prev);
  const toggleDeleteModal = () => setIsOpenDeleteModal((prev) => !prev);

  const { mutate: handleEdit } = useMutation({
    mutationKey: ["PUT_LOCATIONS"],
    mutationFn: (data) =>
      toast.promise(
        editLocation(
          {
            area_name: data.area_name,
            lat: data.lat,
            lng: data.lng,
          },
          id
        ),
        {
          loading: "درحال پردازش",
        }
      ),
    onSuccess: () => {
      toast.success("مقصد شما با موفقیت ویرایش شد");
      refetch();
    },
  });

  const { mutate: handleDelete } = useMutation({
    mutationKey: ["DELETE_LOCATIONS"],
    mutationFn: () =>
      toast.promise(deleteLocation(id), {
        loading: "درحال پردازش...",
        error: "خطا !",
      }),
    onSuccess: () => {
      toast.success("مقصد با موفقیت حذف شد");
      refetch();
    },
  });

  const actionDropdownItems = [
    {
      label: " ویرایش",
      icon: MessageSquare,
      onClick: toggleEditModal,
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
        bodyContent={<p>آیا از حذف کردن این مقصد مطمئنید؟</p>}
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

      <EditCityModal
        isOpen={isOpenEditModal}
        toggle={toggleEditModal}
        cityData={{ city, location: [lat, lng] }}
        onSubmit={handleEdit}
      />
    </>
  );
};

export default LocationPopover;
