import DataTable from "@/components/table/DataTable";
import { useGetAllRequestLogs } from "@/store/hooks/LogHooks";
import { useNavigate } from "react-router-dom";

const RequestLogTable = () => {
  const navigate = useNavigate();

  const headers = ["Username", "Equipment", "Request Date", "Status"];
  const menu = ["view"];
  const columnWidths = ["w-[25%]", "w-[25%]", "w-[25%]", "w-[25%]"];

  const { data: logData, isLoading, error } = useGetAllRequestLogs();

  const tableData = logData?.map((item) => [
    {
      id: item._id,
      render: () => item.requestId?.employeeId?.userName,
    },
    {
      render: () => item.requestId?.equipmentId?.equipmentNameId?.equipmentName,
    },
    {
      render: () =>
        new Date(item.requestId?.requestDate).toLocaleDateString("en-GB"),
    },
    { render: () => item.status },
  ]);

  const handleMenuChange = (value, id) => {
    switch (value) {
      case "view":
        navigate(`/admin/viewRequestLog/${id}`);
    }
  };
  return (
    <div>
      <DataTable
        headers={headers}
        tableData={tableData}
        isLoading={isLoading}
        columnWidths={columnWidths}
        error={error}
        showBreadCrumbs={true}
        menu={menu}
        handleMenuChange={handleMenuChange}
      />
    </div>
  );
};

export default RequestLogTable;
