import {
  useCancelPendingRequest,
  useGetMyRequest,
} from "@/store/hooks/EmployeeHooks";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import DataTable from "@/components/table/DataTable";
import Pagination from "@/components/pagination/Pagination";
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";
import { useState } from "react";

const EmployeeTable = ({ page, limit, setPage, setLimit }) => {
  const navigate = useNavigate();

  const refetch = useQueryClient();

  const headers = ["Employee Name", "Equipment", "Request date", "Status"];
  const columnWidths = ["w-[25%]", "w-[25%]", "w-[25%]", "w-[25%]"];

  const { data, isLoading, error } = useGetMyRequest({ page, limit });
  const userData = data?.requests;

  const { mutateAsync } = useCancelPendingRequest();

  const [showModal, setShowModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const handleMenuChange = async (value, id) => {
    switch (value) {
      case "View":
        navigate(`/viewRequest/${id}`);
        break;
      case "Cancel":
        setSelectedRequestId(id);
        setShowModal(true);
        break;
    }
  };

  const handleCancel = async () => {
    try {
      const response = await mutateAsync(selectedRequestId);
      refetch.refetchQueries(["equipmentRequest"]);
      toast.success(response?.data?.message || "Request canceled successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to cancel request. Please try again.";
      toast.error(errorMessage);
    } finally {
      setShowModal(false);
    }
  };

  const tableData = userData?.map((item) => ({
    cells: [
      {
        id: item._id,
        render: () => (
          <div className="flex items-center gap-4">
            <BreadCrumbs
              data={
                item.requestLogId.status === "Pending"
                  ? ["View", "Cancel"]
                  : ["View"]
              }
              onChange={(value) => handleMenuChange(value, item._id)}
            />
            <span>{item.employeeId.userName}</span>
          </div>
        ),
      },
      { render: () => item.equipmentId.equipmentNameId.equipmentName ?? "none" },
      { render: () => new Date(item.requestDate).toLocaleDateString("en-GB") },
      { render: () => item.requestLogId.status },
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
        />
      </div>
      <ConfirmationModal
        showModal={showModal}
        title={"Are you sure you want to cancel ?"}
        onClose={() => setShowModal(false)}
        onConfirm={handleCancel}
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

export default EmployeeTable;
