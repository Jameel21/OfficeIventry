import DataTable from "@/components/table/DataTable";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  useDeleteDepartment,
  useGetAllDepartment,
} from "@/store/hooks/MasterHooks";
import toast from "react-hot-toast";

const DepartmentTable = () => {
  const navigate = useNavigate();
  const refetch = useQueryClient();

  const headers = ["Department", "Created At"];
  const menu = ["view", "edit", "delete"];
  const columnWidths = ["w-[50%]", "w-[50%]"];

  const { data: departmentData, isLoading, error } = useGetAllDepartment();
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
    cells:[
    { id: item._id, render: () => item.department },
    { render: () => new Date(item.createdAt).toLocaleDateString("en-GB") },
  ]}));
  return (
    <div>
      <DataTable
        headers={headers}
        tableData={tableData}
        isLoading={isLoading}
        // breadCrumbsClass={"w-18 sm:w-20"}
        columnWidths={columnWidths}
        error={error}
        showBreadCrumbs={true}
        menu={menu}
        handleMenuChange={handleMenuChange}
      />
    </div>
  );
};

export default DepartmentTable;
