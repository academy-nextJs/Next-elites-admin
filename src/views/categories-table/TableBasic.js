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








  return (
    <>
      {" "}
      <div className="w-50">
        <PageHeader refetch={refetch} />




      </div>
    </>
  );
};

export default TableBasic;
