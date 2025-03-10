import Pagination from "@/components/pagination/Pagination";
import DataTable from "@/components/table/DataTable";
import { useGetUserRequest } from "@/store/hooks/EmployeeHooks";
import { useState } from "react";
import { useParams } from "react-router-dom";

const UsersTable = ({ selectedRequests }) => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const headersMapping = {
    All: ["Employee Name", "Equipment", "Request Date", "Status",],
    Pending: [
      "Employee Name",
      "Equipment",
      "Request Date",
      "Status",
    ],
    Cancelled: [
      "Employee Name",
      "Equipment",
      "Request Date",
      "Status",
    ],
    Approved: [
      "Employee Name",
      "Equipment",
      "Serial Number",
      "Status",
    ],
    Completed: [
      "Employee Name",
      "Equipment",
      "Request Date",
      "Status",
    ],
    Rejected: [
      "Employee Name",
      "Equipment",
      "Request Date",
      "Status",
    ],
  };

  let headers = headersMapping[selectedRequests] || headersMapping["Pending"];

  const columnWidths = ["w-[25%]", "w-[25%]", "w-[25%]", "w-[25%]"];

  const { data, isLoading, error } = useGetUserRequest({
    id,
    page,
    limit,
    status: selectedRequests,
  });

  const requestData = data?.requests;

  const tableData = requestData?.map((item) => ({
    cells: [
      { id: item._id, render: () => item?.employeeId?.userName || "none" },
      {
        render: () =>
          item?.equipmentId?.equipmentNameId?.equipmentName || "none",
      },
      ...(selectedRequests === "Approved"
        ? [
            { render: () => item?.equipmentId?.serialNumber || "none" },
            { render: () => item?.requestLogId?.status || "none" },
          ]
        : [
            {
              render: () =>
                new Date(item?.requestDate).toLocaleDateString("en-GB"),
            },
            { render: () => item?.requestLogId?.status || "none" },
          ]),
    ],
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
          bodyClassName={"cursor-default"}
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
