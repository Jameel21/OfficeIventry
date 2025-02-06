import UiButton from "@/components/form-fields/_utils/Button";
import { useNavigate } from "react-router-dom";
import RoleTable from "../_utils/RoleTable";
import { useState } from "react";
import { getDecodedData } from "@/utils/encryptDecrypt";

const ListAllRole = () => {

    const userData = getDecodedData("userData");
    const menuPermission = userData?.menuPermission || [];

    const rolePermission = menuPermission.find(
      (perm) => perm?.menu?.pageName === "Role"
    );

  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleAddRole = () => {
    navigate("/admin/addRole");
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="text-base font-normal md:text-lg md:font-medium text-slate-700">
          Role
        </div>
        <div className="flex items-center gap-2">
          {rolePermission?.create && <UiButton
            onClick={handleAddRole}
            className={"w-28 h-7 md:w-40 md:h-11 text-white"}
            variant={"secondary"}
            buttonName={"Add Role"}
          />}
        </div>
      </div>
      <div className="mt-8">
        <RoleTable
          page={page}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
        />
      </div>
    </div>
  );
};

export default ListAllRole;
