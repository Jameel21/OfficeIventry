import Pagination from "@/components/pagination/Pagination";
import DataTable from "@/components/table/DataTable";

const AllocationTable = ({
  page,
  limit,
  setPage,
  setLimit,
  isLoading,
  error,
  data,
  logData,
}) => {
  const headers = ["Employee Name","Equipment", "Serial Number",  "Allocated By", "Date"];
  const columnWidths = ["w-[20%]","w-[20%]", "w-[20%]", "w-[20%]", "w-[20%]"];

  const tableData = logData?.map((item) => ({
    cells: [
      { render: () => item.employeeId.userName },
      {
        id: item._id,
        render: () => item.equipmentId.equipmentNameId.equipmentName,
      },
      { render: () => item.equipmentId.serialNumber || "none" },
      
      { render: () => item.requestLogId.updatedBy.userName },
      { render: () => new Date(item.issueDate).toLocaleDateString("en-GB") },
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
        totalItems={data?.totalLogs || 0}
        onPageChange={(newPage) => setPage(newPage)}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />
    </div>
  );
};

export default AllocationTable;
