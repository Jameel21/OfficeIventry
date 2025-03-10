import { useState } from "react";
import AllocationTable from "./_utils/AllocationTable";
import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";
import UiInput from "@/components/form-fields/_utils/UiInput";
import { useGetAllocationLog } from "@/store/hooks/LogHooks";

const AllocationLog = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("Employee Name");
  const [searchTerm, setSearchTerm] = useState("");

  const mainMenu = ["Employee Name","Equipment", "Serial Number","Allocated By",];
  const { data, isLoading, error } = useGetAllocationLog({ page, limit, keyword, searchTerm });
  const logData = data?.logs;


  const handleMainMenuChange = (value) => {
    setKeyword(value);
    setPage(1);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium text-slate-700">Allocation Log</div>
        <div className="flex items-center gap-2 mt-1">
          <UiInput
            placeholder={`Search by ${keyword}`}
            inputClassName="h-7 sm:h-9 md:w-40  lg:w-96 hidden sm:flex"
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
      <div className="mt-9">
        <AllocationTable
          page={page}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
          isLoading={isLoading}
          error={error}
          logData={logData}
          data={data}
        />
      </div>
    </div>
  );
};

export default AllocationLog;
