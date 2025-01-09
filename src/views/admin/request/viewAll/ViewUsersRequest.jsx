import { CircleArrowLeft } from "lucide-react";
import UsersTable from "../_utils/UsersTable"
import { useNavigate } from "react-router-dom";

const ViewUsersRequest = () => {
 const navigate = useNavigate();
  const handlePreviousPage = () => {
    navigate("/admin/employeeLog");
  };
  return (
    <div>
      <div className="flex gap-4">
        <CircleArrowLeft
          className="w-4 h-4 mt-1 cursor-pointer md:w-5 md:h-5 hover:opacity-90"
          onClick={handlePreviousPage}
        />
        <h1 className="text-lg font-medium text-center sm:text-start text-slate-700">
          User Request
        </h1>
      </div>
      <div className="mt-12">
        <UsersTable/>
      </div>
    </div>
  )
}

export default ViewUsersRequest