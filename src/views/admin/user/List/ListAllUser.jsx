import UiButton from "@/components/form-fields/_utils/Button";
import UiInput from "@/components/form-fields/_utils/UiInput";
import UiTable from "@/components/form-fields/_utils/UiTable";
import { TableCell, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";
import toast from "react-hot-toast";
import { useDeleteUser, useGetAllUsers, useUpdateUser } from "@/store/hooks/UserHooks";
import { useQueryClient } from "@tanstack/react-query";
import LoadSpinner from "@/components/spinner/LoadSpinner";
import { useState } from "react";
import { Check, X } from "lucide-react";

const ListAllUser = () => {
  const navigate = useNavigate();
  const refetch = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const headers = ["Username", "Email", "Id", "Role", "Status"];
  const { data, isLoading, error } = useGetAllUsers({ page, limit });
  const userData = data?.users;
  const { mutate: deleteUser } = useDeleteUser();
  const menu = ["view", "edit", "delete"];

  const updateUser = useUpdateUser();
  const handleAddUser = () => {
    navigate("/admin/addUser");
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value) || 10;
    setLimit(newLimit);
    setPage(1);
  };

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
    const newStatus = currentStatus === "active" ? "inactive" : "active";

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

  return (
    <div className="w-full overflow-y-auto">
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium text-slate-700">Users</div>
        <div className="flex items-center gap-2 w-">
          <UiInput
            placeholder={"Search by keyword"}
            inputClassName="md:h-9 md:w-40 lg:h-11 lg:w-96 hidden sm:flex"
          />
          <UiButton
            onClick={handleAddUser}
            className={"md:w-24 md:h-9 lg:w-40 lg:h-11 text-white"}
            variant={"secondary"}
            buttonName={"Create User"}
          />
        </div>
      </div>
      <div className="mt-8">
        <div className="overflow-y-auto h-[440px] sm:h-[500px]">
          <UiTable headers={headers} headerClass={"h-12 text-sm md:text-base lg:text-lg"}>
            {isLoading ? (
              <TableRow className="h-12">
                <TableCell colSpan={headers.length}>
                  <div className="flex justify-center h-full">
                    <LoadSpinner />
                  </div>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow className="h-12">
                <TableCell
                  colSpan={headers.length}
                  className="font-medium text-center text-md text-muted-foreground"
                >
                  {error.message}
                </TableCell>
              </TableRow>
            ) : userData && userData?.length > 0 ? (
              userData.map((item, index) => (
                <TableRow
                  key={index}
                  className={`border border-gray-300 hover:bg-red-50 h-10 ${
                    index % 2 === 0 ? "bg-gray-200" : "bg-slate-100"
                  } `}
                >
                  <TableCell className="flex gap-3 ">
                    <BreadCrumbs
                      data={menu}
                      onChange={(value) => handleMenuChange(value, item._id)}
                    />
                    {item.userName}
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.employeeId}</TableCell>
                  <TableCell>{item.roleId.role}</TableCell>
                  <TableCell>
                  <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusToggle(item._id, item.status)}
                    className={`flex items-center justify-between w-24 px-2 py-1 rounded-full ${
                      item.status === "active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    } text-white`}
                  >
                    {item.status === "active" ? (
                      <Check className="order-2 w-4 h-4" />
                    ) : (
                      <X className="order-1 w-4 h-4" />
                    )}
                    <span>{item.status}</span>
                  </button>
                </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={headers.length} className="text-center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </UiTable>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
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

export default ListAllUser;
