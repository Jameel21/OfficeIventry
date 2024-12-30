import { useState } from "react";
import AllocationTable from "./_utils/AllocationTable";

const AllocationLog = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  return (
    <div className="w-full">
      <div className="mt-2 text-lg font-medium text-slate-700">
        Allocation Log
      </div>
      <div className="mt-10">
        <AllocationTable
          page={page}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
        />
      </div>
    </div>
  );
};

export default AllocationLog;
