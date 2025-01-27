import Pagination from "@/components/pagination/Pagination";
import DataTable from "@/components/table/DataTable";
import { useGetAllRequestLogs } from "@/store/hooks/LogHooks";
import { useNavigate } from "react-router-dom";

const RequestLogTable = ({ page, limit, setPage, setLimit }) => {
  const navigate = useNavigate();

  const headers = ["Username", "Equipment", "Request Date", "Status"];
  const columnWidths = ["w-[25%]", "w-[25%]", "w-[25%]", "w-[25%]"];

  const { data, isLoading, error } = useGetAllRequestLogs({ page, limit });
  const logData = data?.logs;
  const tableData = logData?.map((item) => ({
    cells: [
      {
        id: item._id,
        render: () => item.requestId?.employeeId?.userName,
      },
      {
        render: () =>
          item.requestId?.equipmentId?.equipmentNameId?.equipmentName,
      },
      {
        render: () =>
          new Date(item.requestId?.requestDate).toLocaleDateString("en-GB"),
      },
      { render: () => item.status },
    ],
    menu: ["View"],
  }));

  const handleMenuChange = (value, id) => {
    switch (value) {
      case "View":
        navigate(`/admin/viewRequestLog/${id}`);
    }
  };
  return (
    <div>
      <div>
        <DataTable
          headers={headers}
          tableData={tableData}
          isLoading={isLoading}
          columnWidths={columnWidths}
          error={error}
          showBreadCrumbs={true}
          handleMenuChange={handleMenuChange}
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

export default RequestLogTable;
