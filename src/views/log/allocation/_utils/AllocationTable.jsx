import DataTable from "@/components/table/DataTable";
import { useGetAllocationLog } from "@/store/hooks/LogHooks";

const AllocationTable = () => {
  const headers = ["Equipment", "Allocated To", "Allocated By", "Date"];
  const columnWidths = ["w-[25%]", "w-[25%]", "w-[25%]", "w-[25%]"];

  const { data: logData, isLoading, error } = useGetAllocationLog();

  const tableData = logData?.map((item) => ({
    cells: [
      {
        id: item._id,
        render: () => item.equipmentId.equipmentNameId.equipmentName,
      },
      { render: () => item.requestLogId.createdBy.userName },
      { render: () => item.requestLogId.updatedBy.userName },
      { render: () => new Date(item.issueDate).toLocaleDateString("en-GB") },
    ],
  }));

  return (
    <div>
      <DataTable
        headers={headers}
        tableData={tableData}
        isLoading={isLoading}
        columnWidths={columnWidths}
        error={error}
        showBreadCrumbs={false}
      />
    </div>
  );
};

export default AllocationTable;
