import toast from "react-hot-toast";
import { deleteUser } from "../services/api/delete/Users";
import { useMutation } from "@tanstack/react-query";

const useDeleteUser = (id, refetch, toggleDeleteModal) => {
  const { mutate: deleteUserAction } = useMutation({
    mutationKey: ["DELETE_USER"],
    mutationFn: () =>
      toast.promise(deleteUser(id), {
        loading: "در حال حذف کاربر...",
        success: "کاربر با موفقیت حذف شد",
        error: "خطا در حذف",
      }),
    onSuccess: () => {
      refetch();
      toggleDeleteModal();
    },
  });

  return { deleteUserAction };
};
export default useDeleteUser;
