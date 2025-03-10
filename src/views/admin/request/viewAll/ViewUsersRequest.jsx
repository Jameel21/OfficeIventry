import { CircleArrowLeft } from "lucide-react";
import UsersTable from "../_utils/UsersTable";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";
import { useState } from "react";

const ViewUsersRequest = () => {
  const navigate = useNavigate();
  const handlePreviousPage = () => {
    navigate("/admin/employeeLog");
  };
  const mainMenu = [
    "All",
    "Pending",
    "Approved",
    "Completed",
    "Rejected",
    "Cancelled",
  ];
  const [selectedRequests, setSelectedRequests] = useState("All");
  const handleMainMenuChange = (value) => {
    setSelectedRequests(value);
  };
  return (
    <div>
      <div className="flex justify-between gap-4">
        <div>
          <CircleArrowLeft
            className="w-4 h-4 mt-1 cursor-pointer md:w-5 md:h-5 hover:opacity-90"
            onClick={handlePreviousPage}
          />
          <h1 className="text-lg font-medium text-center sm:text-start text-slate-700">
            {selectedRequests} Logs
          </h1>
        </div>
        <div>
          <BreadCrumbs
            className="h-7 w-7"
            data={mainMenu}
            onChange={(value) => handleMainMenuChange(value)}
          />
        </div>
      </div>
      <div className="mt-12">
        <UsersTable selectedRequests={selectedRequests}/>
      </div>
    </div>
  );
};

export default ViewUsersRequest;
