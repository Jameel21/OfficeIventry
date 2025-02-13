import DataTable from "@/components/table/DataTable";
import { Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteUser, useUpdateUser } from "@/store/hooks/UserHooks";
import Pagination from "@/components/pagination/Pagination";
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";
import { useState } from "react";
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
   const userDetails = getDecodedData("userData");
    const menuPermission = userDetails?.menuPermission || [];
  
    const userPermission = menuPermission.find(
      (perm) => perm?.menu?.pageName === "User"
    );
  const navigate = useNavigate();
  const refetch = useQueryClient();
 
  const headers = ["Username", "Email", "Id", "Role", "Status"];
  const columnWidths = ["w-[20%]", "w-[30%]", "w-[15%]", "w-[20%]", "w-[15%]"];

  const { mutateAsync } = useDeleteUser();
  const updateUser = useUpdateUser();

  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleMenuChange = async (value, userId) => {
    switch (value) {
      case "View":
        navigate(`/viewUser/${userId}`);
        break;
      case "Edit":
        if (!userPermission?.update) {
          toast.error("You don't have permission to perform this action.");
          return;
        }
        navigate(`/admin/editUser/${userId}`);
        break;
      case "Delete":
        setSelectedUserId(userId);
        setShowModal(true);
        break;
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

  const handleDelete = async () => {
    try {
      const response = await mutateAsync(selectedUserId);
      refetch.refetchQueries(["AllUsers"]);
      toast.success(response?.data?.message || "User deleted successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to delete user. Please try again.";
      toast.error(errorMessage);
    } finally {
      setShowModal(false);
    }
  };

  const tableData = userData?.map((item) => ({
    cells: [
      {
        id: item._id,
        render: () => (
          <div className="flex items-center gap-2">
            <BreadCrumbs
              data={["View", "Edit", "Delete"]}
              onChange={(value) => handleMenuChange(value, item._id)}
            />
            <span>{item.userName}</span>
          </div>
        ),
      },
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
          bodyClassName={"cursor-default"}
        />
      </div>
      <ConfirmationModal
        showModal={showModal}
        title={"Are you sure you want to delete?"}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
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
