import DataTable from "@/components/table/DataTable";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteRole, useGetAllRole } from "@/store/hooks/MasterHooks";
import toast from "react-hot-toast";
import Pagination from "@/components/pagination/Pagination";

const RoleTable = ({ page, limit, setPage, setLimit }) => {
  const navigate = useNavigate();
  const refetch = useQueryClient();

  const headers = ["Role", "Created At"];
  const columnWidths = ["w-[50%]", "w-[50%]"];

  const { data, isLoading, error } = useGetAllRole({ page, limit });
  const roleData = data?.roles;

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
        totalItems={data?.totalRoles || 0}
        onPageChange={(newPage) => setPage(newPage)}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />
    </div>
  );
};

export default RoleTable;
