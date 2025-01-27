import DataTable from "@/components/table/DataTable";
import {
  useGetAllRequests,
  useUpdateRequestFields,
} from "@/store/hooks/EmployeeHooks";
import { useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Pagination from "@/components/pagination/Pagination";
import { useState } from "react";

const RequestTable = ({ selectedRequests }) => {
  const navigate = useNavigate();
  const refetch = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const headersMapping = {
    Pending: ["Username", "Equipment", "Request Date", "Reason"],
    Canceled: ["Username", "Equipment", "Request Date", "Reason"],
    Approved: ["Username", "Equipment", "Issue Date", "Mark as Return"],
    Completed: ["Username", "Equipment", "Request Date", "Reason"],
    Rejected: ["Username", "Equipment", "Request Date", "Rejected Reason"],
  };
  const columnWidths = ["w-[20%]", "w-[20%]", "w-[20%]", "w-[40%]"];
  const headers = headersMapping[selectedRequests] || headersMapping["Pending"];

  const { data, isLoading, error } = useGetAllRequests(
    page,
    limit,
    selectedRequests.toLowerCase()
  );
  const requestData = data?.requests;

  const { mutateAsync } = useUpdateRequestFields();

  const handleCheckboxChange = async (id, currentValue) => {
    const payload = {
      id,
      markAsReturn: !currentValue,
    };
    try {
      const response = await mutateAsync(payload);
      toast.success(response?.data?.message || "updated successFully");
      refetch.refetchQueries({ queryKey: ["pendingRequests"] });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || `Failed to update request.`;
      toast.error(errorMessage);
    }
  };

  const handleMenuChange = (value, id, equipmentId = null) => {
    switch (value) {
      case "View":
        navigate(`/viewRequest/${id}`, {
          state: { prevPage: selectedRequests },
        });
        break;
      case "Update":
        navigate(`/admin/approveRequest/${id}`, { state: { equipmentId } });
    }
  };

  const mapTableData = (requests) => {
    return requests?.map((item) => ({
      cells: [
        {
          id: item._id,
          equipmentId: item?.equipmentId?.equipmentNameId,
          render: () => item?.employeeId?.userName,
        },
        { render: () => item?.equipmentId?.equipmentNameId?.equipmentName },
        selectedRequests !== "Approved" && {
          render: () => new Date(item?.requestDate).toLocaleDateString("en-GB"),
        },
        selectedRequests === "Approved" && {
          render: () => new Date(item?.issueDate).toLocaleDateString("en-GB"),
        },
        selectedRequests === "Approved" && {
          render: () => (
            <Checkbox
              checked={item?.markAsReturn}
              onCheckedChange={() =>
                handleCheckboxChange(item._id, item.markAsReturn)
              }
            />
          ),
        },
        selectedRequests !== "Approved" && {
          render: () =>
            selectedRequests === "Rejected" ? (
              <div className="md:w-[200px] lg:w-[250px] xl:w-[450px] break-words whitespace-normal">
                {item.rejectedReason}
              </div>
            ) : (
              <div className="w-[200px] md:w-[200px] lg:w-[250px] xl:w-[450px] break-words whitespace-normal">
                {item.reason || "N/A"}
              </div>
            ),
        },
      ].filter(Boolean), // Remove undefined cells
      menu: selectedRequests === "Pending" ? ["View", "Update"] : ["View"],
    }));
  };

  const tableData = mapTableData(requestData);

  return (
    <div>
      <div>
        <DataTable
          headers={headers}
          isLoading={isLoading}
          columnWidths={columnWidths}
          error={error}
          showBreadCrumbs={true}
          tableData={tableData}
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

export default RequestTable;
