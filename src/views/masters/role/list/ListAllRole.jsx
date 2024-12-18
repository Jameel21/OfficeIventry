import UiButton from "@/components/form-fields/_utils/Button";
import { useNavigate } from "react-router-dom";
import RoleTable from "../_utils/RoleTable";

const ListAllRole = () => {

  const navigate = useNavigate();

  const handleAddRole = () => {
    navigate("/admin/addRole");
  };


  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="text-base font-normal md:text-lg md:font-medium text-slate-700">Role</div>
        <div className="flex items-center gap-2">
          <UiButton
            onClick={handleAddRole}
            className={"w-28 h-7 md:w-40 md:h-11 text-white"}
            variant={"secondary"}
            buttonName={"Add Role"}
          />
        </div>
      </div>
      <div className="mt-8">
      <RoleTable/>
      </div>
</div>
  )
}

export default ListAllRole