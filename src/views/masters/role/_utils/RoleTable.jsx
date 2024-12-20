import DataTable from "@/components/table/DataTable";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteRole, useGetAllRole } from "@/store/hooks/MasterHooks";
import toast from "react-hot-toast";

const RoleTable = () => {
  const navigate = useNavigate();
  const refetch = useQueryClient();

  const headers = ["Role", "Created At"];
  const menu = ["view", "edit", "delete"];
  const columnWidths = ["w-[50%]", "w-[50%]"];

  const { data: roleData, isLoading, error } = useGetAllRole();
  const { mutate: deleteRole } = useDeleteRole();

  const handleMenuChange = (value, roleId) => {
    switch (value) {
      case "view":
        navigate(`/admin/viewRole/${roleId}`);
        break;
      case "edit":
        navigate(`/admin/editRole/${roleId}`);
        break;
      case "delete":
        deleteRole(roleId, {
          onSuccess: () => {
            refetch.refetchQueries(["AllRole"]);
            toast.error("Role deleted successfully");
          },
          onError: (error) => {
            toast.error(
              `Failed to delete role: ${
                error.response?.data?.message || error.message
              }`
            );
          },
        });
    }
  };

  const tableData = roleData?.map((item) => ({
    cells: [
      { id: item._id, render: () => item.role },
      { render: () => new Date(item.createdAt).toLocaleDateString("en-GB") },
    ],
  }));

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

export default RoleTable;
