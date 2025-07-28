// ** Reactstrap Imports
import { useState } from "react";
import { Button, Input, Table } from "reactstrap";
import WarningModal from "../../@core/common/WarningModal";
import ReusableModal from "../../@core/common/Modal";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editCategory } from "../../utility/services/api/put/Category";
import { deleteCategory } from "../../utility/services/api/delete/Category";
import PageHeader from "./header";

const TableBasic = ({ data, refetch }) => {
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editName, setEditName] = useState(selectedCategory?.name);

  const toggleWarningModal = () => setWarningModalOpen(!warningModalOpen);
  const toggleEditModal = () => setEditModalOpen(!editModalOpen);

  const { mutate: handleDelete } = useMutation({
    mutationKey: ["DELETE_CATEGORY"],
    mutationFn: () => {
      toast.promise(deleteCategory(selectedCategory.id), {
        loading: "درحال پردازش",
      });
    },
    onSuccess: () => {
      toast.success("دسته بندی شما با موفقیت ویرایش شد");
      toggleEditModal();
      refetch();
    },
    onError: () => toast.error("خطا !"),
  });

  const { mutate: handleEditSubmit } = useMutation({
    mutationKey: ["PUT_LOCATIONS"],
    mutationFn: () => {
      toast.promise(
        editCategory(
          {
            name: editName,
          },
          selectedCategory.id
        ),
        {
          loading: "درحال پردازش",
        }
      );
    },
    onSuccess: () => {
      toast.success("دسته بندی شما با موفقیت ویرایش شد");
      toggleWarningModal();
      refetch();
    },
    onError: () => toast.error("خطا !"),
  });

  return (
    <>
      {" "}
      <div className="w-50">
        <PageHeader refetch={refetch} />
        <Table responsive>
          <thead>
            <tr className="text-center">
              <th style={{ fontSize: "18px" }}>نام</th>
              <th style={{ fontSize: "18px" }}>ویرایش</th>
              <th style={{ fontSize: "18px" }}>حذف</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((category, index) => {
              return (
                <tr className="text-center" key={index}>
                  <td>{category.name}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => {
                        setSelectedCategory(category);
                        setEditName(category.name);
                        toggleEditModal();
                      }}
                    >
                      ویرایش
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="danger"
                      onClick={() => {
                        setSelectedCategory(category);
                        toggleWarningModal();
                      }}
                    >
                      حذف
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <WarningModal
          message="آیا از حذف کردن این دسته بندی مطمعنید؟"
          title="هشدار"
          isOpen={warningModalOpen}
          toggle={toggleWarningModal}
          onConfirm={handleDelete}
        />

        <ReusableModal
          isOpen={editModalOpen}
          toggle={toggleEditModal}
          title="ویرایش دسته‌بندی"
          bodyContent={
            <div>
              <Input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder=""
              />
            </div>
          }
          footerActions={
            <>
              <Button color="primary" onClick={handleEditSubmit}>
                تایید
              </Button>
              <Button color="secondary" onClick={toggleEditModal}>
                لغو
              </Button>
            </>
          }
        />
      </div>
    </>
  );
};

export default TableBasic;
