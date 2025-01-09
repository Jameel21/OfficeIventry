import DataTable from "@/components/table/DataTable";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteRole, useGetAllRole } from "@/store/hooks/MasterHooks";
import toast from "react-hot-toast";
import Pagination from "@/components/pagination/Pagination";
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";
import { useState } from "react";

const RoleTable = ({ page, limit, setPage, setLimit }) => {
  const navigate = useNavigate();
  const refetch = useQueryClient();

  const headers = ["Role", "Created At"];
  const columnWidths = ["w-[50%]", "w-[50%]"];

  const { data, isLoading, error } = useGetAllRole({ page, limit });
  const roleData = data?.roles;

  const { mutateAsync } = useDeleteRole();

  const [showModal, setShowModal] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);

  const handleMenuChange = async (value, roleId) => {
    switch (value) {
      case "view":
        navigate(`/admin/viewRole/${roleId}`);
        break;
      case "edit":
        navigate(`/admin/editRole/${roleId}`);
        break;
      case "delete":
        setSelectedRoleId(roleId);
        setShowModal(true);
        break;
    }
  };

  const handleDelete = async () => {
    try {
      const response = await mutateAsync(selectedRoleId);
      refetch.refetchQueries(["AllRole"]);
      toast.success(response?.data?.message || "Role deleted successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to delete role. Please try again.";
      toast.error(errorMessage);
    } finally {
      setShowModal(false);
    }
  };

  const tableData = roleData?.map((item) => ({
    cells: [
      {
        id: item._id,
        render: () => (
          <div className="flex items-center gap-2">
            <BreadCrumbs
              data={["view", "edit", "delete"]}
              onChange={(value) => handleMenuChange(value, item._id)}
            />
            <span>{item.role}</span>
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
        title={"Are you sure you want to delete ?"}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
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
