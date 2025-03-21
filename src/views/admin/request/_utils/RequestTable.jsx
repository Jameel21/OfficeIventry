import DataTable from "@/components/table/DataTable";
import {
  useDeleteRequest,
  useGetAllRequests,
  useUpdateRequestFields,
} from "@/store/hooks/EmployeeHooks";
import { useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Pagination from "@/components/pagination/Pagination";
import { useState } from "react";
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import { getDecodedData } from "@/utils/encryptDecrypt";

const RequestTable = ({ selectedRequests }) => {
  const userData = getDecodedData("userData");
  const menuPermission = userData?.menuPermission || [];

  const requestPermission = menuPermission.find(
    (perm) => perm?.menu?.pageName === "All Request"
  );

  const navigate = useNavigate();
  const refetch = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const headersMapping = {
    All: ["Username", "Equipment", "Request Date", "Status"],
    Pending: ["Username", "Equipment", "Request Date", "Reason"],
    Cancelled: ["Username", "Equipment", "Request Date", "Reason"],
    Approved: ["Username", "Equipment", "Issue Date", "Mark as Return"],
    Completed: ["Username", "Equipment", "Request Date", "Reason"],
    Rejected: ["Username", "Equipment", "Request Date", "Rejected Reason"],
  };
  const columnWidths = ["w-[20%]", "w-[20%]", "w-[20%]", "w-[40%]"];
  const headers = headersMapping[selectedRequests] || headersMapping["Pending"];

  const { data, isLoading, error } = useGetAllRequests(
    page,
    limit,
    selectedRequests
  );
  const requestData = data?.requests;

  const { mutateAsync } = useUpdateRequestFields();
  const deleteRequest = useDeleteRequest();

  const [showModal, setShowModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

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
        if (!requestPermission?.update) {
          toast.error("You don't have permission to perform this action.");
          return;
        }
        navigate(`/admin/approveRequest/${id}`, { state: { equipmentId } });
        break;
      case "Delete":
        setSelectedRequestId(id);
        setShowModal(true);
        break;
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteRequest.mutateAsync(selectedRequestId);
      refetch.refetchQueries(["pendingRequests"]);
      toast.success(response?.data?.message || "Request deleted successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to delete request. Please try again.";
      toast.error(errorMessage);
    } finally {
      setShowModal(false);
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
        {
          render: () =>
            item?.equipmentId?.equipmentNameId?.equipmentName ?? "none",
        },
        selectedRequests !== "Approved" && {
          render: () => new Date(item?.requestDate).toLocaleDateString("en-GB"),
        },

        // selectedRequests === "All" && {
        //   render: () => item?.requestLogId?.status
        // },

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
            selectedRequests === "All" ? (
              <div className="md:w-[200px] lg:w-[250px] xl:w-[250px] break-words whitespace-normal">
                {item?.requestLogId?.status ?? "N/A"}
              </div>
            ) : selectedRequests === "Rejected" ? (
              <div className="md:w-[200px] lg:w-[250px] xl:w-[250px] break-words whitespace-normal">
                {item.rejectedReason}
              </div>
            ) : (
              <div className="w-[200px] md:w-[200px] lg:w-[250px] xl:w-[250px] break-words whitespace-normal">
                {item.reason || "N/A"}
              </div>
            ),
        },
      ].filter(Boolean), // Remove undefined cells
      menu:
        item?.requestLogId?.status === "Pending"
          ? ["View", "Update"]
          : item?.requestLogId?.status === "Completed"
          ? ["View", "Delete"]
          : ["View"],
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
          bodyClassName={"cursor-default"}
          handleMenuChange={handleMenuChange}
        />
      </div>
      <ConfirmationModal
        showModal={showModal}
        title={"Are you sure you want to delete?"}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
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
