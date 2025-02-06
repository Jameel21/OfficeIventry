import DataTable from "@/components/table/DataTable";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  useDeleteDepartment,
  useGetAllDepartment,
} from "@/store/hooks/MasterHooks";
import toast from "react-hot-toast";
import Pagination from "@/components/pagination/Pagination";
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";
import { useState } from "react";
import { getDecodedData } from "@/utils/encryptDecrypt";

const DepartmentTable = ({ page, limit, setPage, setLimit }) => {
  const userData = getDecodedData("userData");
    const menuPermission = userData?.menuPermission || [];
  
    const departmentPermission = menuPermission.find(
      (perm) => perm?.menu?.pageName === "Department"
    );

  const navigate = useNavigate();
  const refetch = useQueryClient();

  const headers = ["Department", "Created Date"];
  const columnWidths = ["w-[50%]", "w-[50%]"];

  const { data, isLoading, error } = useGetAllDepartment({ page, limit });
  const departmentData = data?.departments;

  const { mutateAsync } = useDeleteDepartment();

  const [showModal, setShowModal] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

  const handleMenuChange = async (value, departmentId) => {
    switch (value) {
      case "View":
        navigate(`/admin/viewDepartment/${departmentId}`);
        break;
      case "Edit":
        if (!departmentPermission?.update) {
          toast.error("You don't have permission to perform this action.");
          return;
        }
        navigate(`/admin/editDepartment/${departmentId}`);
        break;
      case "Delete":
        setSelectedDepartmentId(departmentId);
        setShowModal(true); 
        break;
    }
  };

  const handleDelete = async () => {
    try {
      const response = await mutateAsync(selectedDepartmentId);
      refetch.refetchQueries(["AllDepartment"]);
      toast.success(response?.data?.message || "Department deleted successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to delete department. Please try again.";
      toast.error(errorMessage);
    } finally {
      setShowModal(false);
    }
  };

  const tableData = departmentData?.map((item) => ({
    cells: [
      {
        id: item._id,
        render: () => (
          <div className="flex items-center gap-2">
            <BreadCrumbs
              data={["View", "Edit", "Delete"]}
              onChange={(value) => handleMenuChange(value, item._id)}
            />
            <span>{item.department}</span>
          </div>
        ),
      },
      { render: () => new Date(item.createdAt).toLocaleDateString("en-GB") },
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
        title={"Are you sure you want to delete?"}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
      <Pagination
        page={page}
        limit={limit}
        totalItems={data?.totalDepartments || 0}
        onPageChange={(newPage) => setPage(newPage)}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />
    </div>
  );
};

export default DepartmentTable;
