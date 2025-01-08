import { useState } from "react";
import AllocationTable from "./_utils/AllocationTable";
import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";
import UiInput from "@/components/form-fields/_utils/UiInput";
import { useGetAllocationLog } from "@/store/hooks/LogHooks";

const AllocationLog = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("Allocated To");
  const [searchTerm, setSearchTerm] = useState("");

  const mainMenu = ["Equipment", "Allocated To", "Allocated By", "Date"];
  const { data, isLoading, error } = useGetAllocationLog({ page, limit });
  const logData = data?.logs;

  const filteredLogs = logData?.filter((log) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

  switch (keyword) {
    case "Equipment":
      return log?.equipmentId?.equipmentNameId?.equipmentName
        .toLowerCase()
        .includes(lowerCaseSearchTerm);
    case "Allocated To":
      return log?.employeeId?.userName
        .toLowerCase()
        .includes(lowerCaseSearchTerm);
    case "Allocated By":
      return log?.requestLogId?.updatedBy?.userName
        .toLowerCase()
        .includes(lowerCaseSearchTerm);
    case "Date":
      return new Date(log?.issueDate)
      .toLocaleDateString("en-GB")
      .includes(searchTerm); 
    default:
      return log?.employeeId?.userName
      .toLowerCase()
      .includes(lowerCaseSearchTerm);
  }
  });

  const handleMainMenuChange = (value) => {
    setKeyword(value);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    console.log("SearchTerm",searchTerm);
  };
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium text-slate-700">Allocation Log</div>
        <div className="flex items-center gap-2 mt-1">
          <UiInput
            placeholder={`Search by ${keyword}`}
            inputClassName="h-7 md:h-9 md:w-40 lg:h-11 lg:w-96 hidden sm:flex"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <BreadCrumbs
            className="hidden h-7 w-7 sm:flex"
            data={mainMenu}
            onChange={(value) => handleMainMenuChange(value)}
          />
        </div>
      </div>
      <div className="mt-7">
        <AllocationTable
          page={page}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
          isLoading={isLoading}
          error={error}
          logData={filteredLogs}
          data={data}
        />
      </div>
    </div>
  );
};

export default AllocationLog;
