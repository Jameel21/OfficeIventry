import UiButton from "@/components/form-fields/_utils/Button";
import UiInput from "@/components/form-fields/_utils/UiInput";
import UiTable from "@/components/form-fields/_utils/UiTable";
import { TableCell, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";
import toast from "react-hot-toast";
import { useDeleteUser, useGetAllUsers } from "@/store/hooks/UserHooks";
import { useQueryClient } from "@tanstack/react-query";
import LoadSpinner from "@/components/spinner/LoadSpinner";
import { useState } from "react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const refetch = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const headers = ["username", "email", "employeeId", "role"];
  const { data, isLoading, error } = useGetAllUsers({ page, limit });
  const userData = data?.users
  const { mutate: deleteUser } = useDeleteUser();
  const menu = ["view", "edit", "delete"];
  
  const handleAddUser = () => {
    navigate("/admin/addUser");
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value) || 10;
    setLimit(newLimit);
    setPage(1); // Reset to first page when changing limit
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
          deleteUser(
             userId ,
            {
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
            }
          );
        }
    }
  return (
    <div className="w-full p-4 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium text-slate-700">Users</div>
        <div className="flex items-center gap-2">
          <UiInput
            placeholder={"Search by keyword"}
            inputClassName="h-11 w-96"
          />
          <UiButton
            onClick={handleAddUser}
            className={"w-40 h-11"}
            variant={"secondary"}
            buttonName={"Create User"}
          />
        </div>
      </div>
      <div className="mt-8">
        <div className="overflow-y-auto h-[500px]">
        <UiTable headers={headers} headerClass={"h-12 text-lg"}>
          {isLoading ? (
            <TableRow className="h-12">
              <TableCell colSpan={headers.length}>
                <div className="flex justify-center h-full">
                  <LoadSpinner/>
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
                  {item.username}
                </TableCell>

                <TableCell>{item.email}</TableCell>
                <TableCell>{item.employee_id}</TableCell>
                <TableCell>{item.role}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={headers.length} className="text-center">No data available</TableCell>
            </TableRow>
          )}
        </UiTable>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
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
              className={`px-2 py-2 text-white ${ page === 1 ? "bg-gray-400" : "bg-gray-500"}`}
            >
              Prev
            </button>
            <span>Page {page}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={data && page >= data.totalPages}
              className={`px-2 py-2 text-white ${
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

export default AdminDashboard;
