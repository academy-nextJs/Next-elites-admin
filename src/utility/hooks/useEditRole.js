import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editUserRole } from "../services/api/put/UpdateUserRole";

const useEditRole = (role, id, refetch, toggleEditModal) => {
  const { mutate: editUserAction } = useMutation({
    mutationKey: ["EDIT_USER_ROLE"],
    mutationFn: () =>
      toast.promise(editUserRole(role, id), {
        loading: "در حال ویرایش نقش کاربر...",
        success: "کاربر با موفقیت ویرایش شد",
        error: "خطا در ویرایش",
      }),
    onSuccess: () => {
      refetch();
      toggleEditModal();
    },
  });

  return { editUserAction };
};
export default useEditRole;
