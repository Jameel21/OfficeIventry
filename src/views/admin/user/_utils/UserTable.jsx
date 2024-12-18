import DataTable from "@/components/table/DataTable";
import { Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  useDeleteUser,
  useUpdateUser,
} from "@/store/hooks/UserHooks";

const UserTable = ({ page, limit, setPage, setLimit,userData,isLoading,error,data  }) => {
  const navigate = useNavigate();
  const refetch = useQueryClient();

  const headers = ["Username", "Email", "Id", "Role", "Status"];
  const columnWidths = ["w-[25%]", "w-[30%]", "w-[10%]", "w-[20%]", "w-[15%]"];

  
  const { mutate: deleteUser } = useDeleteUser();
  const menu = ["view", "edit", "delete"];

  const updateUser = useUpdateUser();

  const handleMenuChange = (value, userId) => {
    switch (value) {
      case "view":
        navigate(`/viewUser/${userId}`);
        break;
      case "edit":
        navigate(`/admin/editUser/${userId}`);
        break;
      case "delete":
        deleteUser(userId, {
          onSuccess: () => {
            refetch.refetchQueries(["AllUsers"]);
            toast.error("User deleted successfully");
          },
          onError: (error) => {
            toast.error(
              `Failed to delete user: ${
                error.response?.data?.message || error.message
              }`
            );
          },
        });
    }
  };

  const handleStatusToggle = (userId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

    updateUser.mutate(
      { id: userId, data: { status: newStatus } },
      {
        onSuccess: () => {
          toast.success("Status updated successfully");
          refetch.refetchQueries(["AllUsers"]);
        },
        onError: (error) => {
          toast.error(
            `Failed to update status: ${
              error.response?.data?.message || error.message
            }`
          );
        },
      }
    );
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value) || 10;
    setLimit(newLimit);
    setPage(1);
  };

  const tableData = userData?.map((item) => [
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
  ]);

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
          menu={menu}
          handleMenuChange={handleMenuChange}
        />
      </div>

      {/* pgination */}
      <div className="flex items-center justify-between mt-4 w-">
        <div className="items-center hidden gap-2 sm:flex">
          <label htmlFor="itemsPerPage">Items per page:</label>
          <input
            id="itemsPerPage"
            type="number"
            value={limit}
            onChange={handleLimitChange}
            className="w-20 p-2 border"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`p-1 sm:px-2 sm:py-2 text-base sm:text-md text-white ${
              page === 1 ? "bg-gray-400" : "bg-gray-500"
            }`}
          >
            Prev
          </button>
          <span>Page {page}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={data && page >= data.totalPages}
            className={`p-1 sm:px-2 sm:py-2 text-base sm:text-md text-white ${
              data && page >= data.totalPages ? "bg-gray-400" : "bg-gray-500"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
