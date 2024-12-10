import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddRoleForm from "../_utils/AddRoleForm";

const AddRole = () => {
  const navigate = useNavigate();

  const handlePreviousPage = () => {
    navigate("/admin/role");
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4">
        <CircleArrowLeft
          className="w-4 h-4 mt-1 cursor-pointer md:w-5 md:h-5 hover:opacity-90"
          onClick={handlePreviousPage}
        />
        <h1 className="text-lg font-medium text-center sm:text-start text-slate-700">
          Add Role
        </h1>
      </div>
      <AddRoleForm />
    </div>
  );
};

export default AddRole;
