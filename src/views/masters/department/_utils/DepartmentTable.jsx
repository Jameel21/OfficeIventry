import DataTable from "@/components/table/DataTable";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  useDeleteDepartment,
  useGetAllDepartment,
} from "@/store/hooks/MasterHooks";
import toast from "react-hot-toast";
import Pagination from "@/components/pagination/Pagination";

const DepartmentTable = ({ page, limit, setPage, setLimit }) => {
  const navigate = useNavigate();
  const refetch = useQueryClient();

  const headers = ["Department", "Created At"];
  const columnWidths = ["w-[50%]", "w-[50%]"];

  const { data, isLoading, error } = useGetAllDepartment({ page, limit });
  const departmentData = data?.departments;

  const { mutate: deleteDepartment } = useDeleteDepartment();

  const handleMenuChange = (value, departmentId) => {
    switch (value) {
      case "view":
        navigate(`/admin/viewDepartment/${departmentId}`);
        break;
      case "edit":
        navigate(`/admin/editDepartment/${departmentId}`);
        break;
      case "delete":
        deleteDepartment(departmentId, {
          onSuccess: () => {
            refetch.refetchQueries(["AllDepartment"]);
            toast.error("Department deleted successfully");
          },
          onError: (error) => {
            toast.error(
              `Failed to delete department: ${
                error.response?.data?.message || error.message
              }`
            );
          },
        });
    }
  };

  const tableData = departmentData?.map((item) => ({
    cells: [
      { id: item._id, render: () => item.department },
      { render: () => new Date(item.createdAt).toLocaleDateString("en-GB") },
    ],
    menu: ["view", "edit", "delete"],
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
