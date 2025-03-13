import { useState } from "react";
import EmployeeTable from "./_utils/EmployeeTable";
import { useGetAllUsers } from "@/store/hooks/UserHooks";
import UiInput from "@/components/form-fields/_utils/UiInput";

const EmployeeLog = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useGetAllUsers({
    page,
    limit,
    searchTerm,
  });
  const userData = data?.users;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium text-slate-700">Employee Log</div>
        <div className="flex items-center gap-2 mt-1">
          <UiInput
            placeholder={"Search by name or email or id"}
            inputClassName="h-7 md:h-9 md:w-40 lg:h-11 lg:w-96 hidden sm:flex"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="mt-7">
        <EmployeeTable
          page={page}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
          userData={userData}
          isLoading={isLoading}
          error={error}
          data={data}
        />
      </div>
    </div>
  );
};

export default EmployeeLog;
