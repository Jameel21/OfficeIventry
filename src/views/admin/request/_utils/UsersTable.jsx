import Pagination from "@/components/pagination/Pagination";
import DataTable from "@/components/table/DataTable";
import { useGetUserRequest } from "@/store/hooks/EmployeeHooks";
import { useState } from "react";
import { useParams } from "react-router-dom";

const UsersTable = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const headers = ["Employee Name", "Equipment", "Request date", "status"];
  const columnWidths = ["w-[25%]", "w-[25%]", "w-[25%]", "w-[25%]"];

  const { data, isLoading, error } = useGetUserRequest({id, page, limit });

  const requestData = data?.requests;
 

  const tableData = requestData?.map((item) => ({
    cells: [
      { id: item._id, render: () => item.employeeId.userName },
      { render: () => item.equipmentId.equipmentNameId.equipmentName },
      { render: () => new Date(item.requestDate).toLocaleDateString("en-GB") },
      { render: () => item.requestLogId.status },
    ],
    menu:
      item.requestLogId.status === "pending" ? ["view", "cancel"] : ["view"],
  }));
  return (
    <div>
      <div>
        <DataTable
          headers={headers}
          tableData={tableData}
          isLoading={isLoading}
          columnWidths={columnWidths}
          error={error}
          showBreadCrumbs={false}
          // handleMenuChange={handleMenuChange}
        />
      </div>
      <Pagination
        page={page}
        limit={limit}
        totalItems={data?.totalRequests || 0}
        onPageChange={(newPage) => setPage(newPage)}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />
    </div>
  );
};

export default UsersTable;
