import DataTable from "@/components/table/DataTable";
import { Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteUser, useUpdateUser } from "@/store/hooks/UserHooks";
import Pagination from "@/components/pagination/Pagination";
import { getDecodedData } from "@/utils/encryptDecrypt";

const UserTable = ({
  page,
  limit,
  setPage,
  setLimit,
  userData,
  isLoading,
  error,
  data,
}) => {
  const navigate = useNavigate();
  const refetch = useQueryClient();
  const usersData = getDecodedData("userData");
  const role = usersData?.userRole
  const headers = ["Username", "Email", "Id", "Role", "Status"];
  const columnWidths = ["w-[25%]", "w-[30%]", "w-[10%]", "w-[20%]", "w-[15%]"];

  const { mutateAsync } = useDeleteUser();
  const updateUser = useUpdateUser();

  const handleMenuChange = async (value, userId) => {
    switch (value) {
      case "view":
        navigate(`/viewUser/${userId}`);
        break;
      case "edit":
        navigate(`/admin/editUser/${userId}`);
        break;
      case "delete":
        try {
          const response = await mutateAsync(userId);
          refetch.refetchQueries(["AllUsers"]);
          toast.success(response?.data?.message || "User deleted successfully");
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            "Failed to delete user. Please try again";
          toast.error(errorMessage);
        }
    }
  };

  const handleStatusToggle = async (userId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

    try {
      await updateUser.mutateAsync({ id: userId, data: { status: newStatus } });
      toast.success("Status updated successfully");
      refetch.refetchQueries(["AllUsers"]);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update status. Please try again";
      toast.error(errorMessage);
    }
  };

  const tableData = userData?.map((item) => ({
    cells: [
      { id: item._id, render: () => item.userName },
      { render: () => item.email },
      { render: () => item.employeeId },
      { render: () => item.roleId.role },
      {
        render: () => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleStatusToggle(item._id, item.status)}
              className={`flex items-center justify-between w-24 px-2 py-1 rounded-full ${
                item.status === "Active" ? "bg-green-500" : "bg-red-500"
              } text-white`}
            >
              {item.status === "Active" ? (
                <Check className="order-2 w-4 h-4" />
              ) : (
                <X className="order-1 w-4 h-4" />
              )}
              <span>{item.status}</span>
            </button>
          </div>
        ),
      },
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
        totalItems={data?.totalUsers || 0}
        onPageChange={(newPage) => setPage(newPage)}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />
    </div>
  );
};

export default UserTable;
