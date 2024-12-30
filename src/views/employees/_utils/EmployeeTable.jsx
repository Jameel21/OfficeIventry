import {
  useCancelPendingRequest,
  useGetMyRequest,
} from "@/store/hooks/EmployeeHooks";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import DataTable from "@/components/table/DataTable";
import Pagination from "@/components/pagination/Pagination";

const EmployeeTable = ({ page, limit, setPage, setLimit }) => {
  const navigate = useNavigate();

  const refetch = useQueryClient();

  const headers = [
    "Employee Name",
    "Equipment",
    "Request date",
    "Expected Return",
    "status",
  ];
  const columnWidths = ["w-[ 20%]", "w-[20%]", "w-[20%]", "w-[20%]", "w-[20%]"];

  const { data, isLoading, error } = useGetMyRequest({ page, limit });
  const userData = data?.requests;

  const cancelRequest = useCancelPendingRequest();

  const handleMenuChange = (value, id) => {
    switch (value) {
      case "view":
        navigate(`/viewRequest/${id}`);
        break;
      case "cancel":
        cancelRequest.mutate(id, {
          onSuccess: () => {
            refetch.refetchQueries(["equipmentRequest"]);
            toast.error("Request canceled successfully");
          },
          onError: (error) => {
            const errorMessage =
              error.response?.data?.message ||
              `Failed to cancel request. Please try again.`;
            toast.error(errorMessage);
          },
        });
    }
  };

  const tableData = userData?.map((item) => ({
    cells: [
      { id: item._id, render: () => item.employeeId.userName },
      { render: () => item.equipmentId.equipmentNameId.equipmentName },
      { render: () => new Date(item.requestDate).toLocaleDateString("en-GB") },
      {
        render: () => new Date(item.expectedReturn).toLocaleDateString("en-GB"),
      },
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
          showBreadCrumbs={true}
          handleMenuChange={handleMenuChange}
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

export default EmployeeTable;
