import { useState } from "react";
import RequestLogTable from "./_utils/RequestLogTable";

const RequestLog = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  return (
    <div className="w-full">
      <div className="mt-2 text-lg font-medium text-slate-700">Request Log</div>
      <div className="mt-10">
        <RequestLogTable
          page={page}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
        />
      </div>
    </div>
  );
};

export default RequestLog;
