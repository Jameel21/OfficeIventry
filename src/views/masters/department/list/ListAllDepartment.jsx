import UiButton from "@/components/form-fields/_utils/Button";
import { useNavigate } from "react-router-dom";
import DepartmentTable from "../_utils/DepartmentTable";
import { useState } from "react";

const ListAllDepartment = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleAddUser = () => {
    navigate("/admin/addDepartment");
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="text-base font-normal md:text-lg md:font-medium text-slate-700">
          Department
        </div>
        <div className="flex items-center gap-2">
          <UiButton
            onClick={handleAddUser}
            className={"w-28 h-7 md:w-40 md:h-11 text-white"}
            variant={"secondary"}
            buttonName={"Add Department"}
          />
        </div>
      </div>
      <div className="mt-8">
        <DepartmentTable
          page={page}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
        />
      </div>
    </div>
  );
};

export default ListAllDepartment;
