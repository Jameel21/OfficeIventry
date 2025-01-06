import DataTable from "@/components/table/DataTable";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  useDeleteDepartment,
  useGetAllDepartment,
} from "@/store/hooks/MasterHooks";
import toast from "react-hot-toast";
import Pagination from "@/components/pagination/Pagination";
import { getDecodedData } from "@/utils/encryptDecrypt";

const DepartmentTable = ({ page, limit, setPage, setLimit }) => {
  const navigate = useNavigate();
  const refetch = useQueryClient();

  const headers = ["Department", "Created At"];
  const columnWidths = ["w-[50%]", "w-[50%]"];
  const userData = getDecodedData("userData");
  const role = userData?.userRole

  const { data, isLoading, error } = useGetAllDepartment({ page, limit });
  const departmentData = data?.departments;

  const { mutateAsync } = useDeleteDepartment();

  const handleMenuChange = async (value, departmentId) => {
    switch (value) {
      case "view":
        navigate(`/admin/viewDepartment/${departmentId}`);
        break;
      case "edit":
        navigate(`/admin/editDepartment/${departmentId}`);
        break;
      case "delete":
        try {
          const response = await mutateAsync(departmentId);
          refetch.refetchQueries(["AllDepartment"]);
          toast.success(
            response?.data?.message || "Department deleted successfully"
          );
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            "Failed to delete department. Please try again";
          toast.error(errorMessage);
        }
    }
  };

  const tableData = departmentData?.map((item) => ({
    cells: [
      { id: item._id, render: () => item.department },
      { render: () => new Date(item.createdAt).toLocaleDateString("en-GB") },
    ],
    menu: role === "Employee" ? ["view"] : ["view", "edit", "delete"],
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
