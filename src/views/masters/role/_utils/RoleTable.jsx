import DataTable from "@/components/table/DataTable";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteRole, useGetAllRole } from "@/store/hooks/MasterHooks";
import toast from "react-hot-toast";
import Pagination from "@/components/pagination/Pagination";
import { getDecodedData } from "@/utils/encryptDecrypt";

const RoleTable = ({ page, limit, setPage, setLimit }) => {
  const navigate = useNavigate();
  const refetch = useQueryClient();

  const headers = ["Role", "Created At"];
  const columnWidths = ["w-[50%]", "w-[50%]"];
  const userData = getDecodedData("userData");
  const role = userData?.userRole

  const { data, isLoading, error } = useGetAllRole({ page, limit });
  const roleData = data?.roles;

  const { mutateAsync } = useDeleteRole();

  const handleMenuChange = async (value, roleId) => {
    switch (value) {
      case "view":
        navigate(`/admin/viewRole/${roleId}`);
        break;
      case "edit":
        navigate(`/admin/editRole/${roleId}`);
        break;
      case "delete":
        try {
          const response = await mutateAsync(roleId);
          refetch.refetchQueries(["AllRole"]);
          toast.success(response?.data?.message || "Role deleted successfully");
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            "Failed deleting role. Please try again";
          toast.error(errorMessage);
        }
    }
  };

  const tableData = roleData?.map((item) => ({
    cells: [
      { id: item._id, render: () => item.role },
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
