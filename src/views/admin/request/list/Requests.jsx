import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";
import { useState } from "react";
import RequestTable from "../_utils/RequestTable";

const Requests = () => {
  const [selectedRequests, setSelectedRequests] = useState("Pending");

  const mainMenu = ["Pending", "Approved", "Completed", "Rejected", "Canceled"];

  const handleMainMenuChange = (value) => {
    setSelectedRequests(value);
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-2">
        <div className="text-lg font-medium text-slate-700">
          {selectedRequests} requests
        </div>
        <div>
          <BreadCrumbs
            className="h-7 w-7"
            data={mainMenu}
            onChange={(value) => handleMainMenuChange(value)}
          />
        </div>
      </div>

      <div className="mt-10">
        <RequestTable selectedRequests={selectedRequests} />
      </div>
    </div>
  );
};

export default Requests;
