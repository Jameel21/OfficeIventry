import { useState } from "react";
import EmployeeTable from "./_utils/EmployeeTable";

const EmployeeLog = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  return (
    <div>
      <div className="mt-2 text-lg font-medium text-slate-700">
        Employee Log
      </div>
      <div className="mt-8">
        <EmployeeTable
          page={page}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
        />
      </div>
    </div>
  );
};

export default EmployeeLog;
