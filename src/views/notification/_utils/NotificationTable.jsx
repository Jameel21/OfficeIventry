import DataTable from "@/components/table/DataTable";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const NotificationTable = ({
  notifications,
  isLoading,
  error,
  deleteNotification,
  refetch,
}) => {
  const navigate = useNavigate();
  const headers = ["Message", "Date"];
  const columnWidths = ["w-[70%]", "w-[30%]"];

  const handleAction = (action, id) => {
    const notification = notifications?.find((n) => n._id === id);
    const { tagId, read } = notification || {};

    switch (action) {
      case "view":
        if (!read) {
          navigate(`/viewRequest/${tagId?._id}`);
          refetch.refetchQueries(["allNotifications"]);
        }
        break;

      case "delete":
        deleteNotification(id, {
          onSuccess: () => {
            refetch.refetchQueries(["allNotifications"]);
            toast.success("Notification deleted successfully");
          },
          onError: (error) => {
            toast.error(
              `Failed to delete notification: ${
                error.response?.data?.message || error.message
              }`
            );
          },
        });
        break;

      default:
        break;
    }
  };

  const tableData = notifications?.map((notification) => ({
    id: notification._id,
    cells: [
      { content: notification.message },
      {
        content: new Date(notification.createdAt).toLocaleString("en-GB"),
      },
    ],
  }));

  return (
    <DataTable
      headers={headers}
      data={tableData}
      isLoading={isLoading}
      error={error}
      columnWidths={columnWidths}
      actions={[
        { name: "View", key: "view" },
        { name: "Delete", key: "delete" },
      ]}
      onAction={handleAction}
    />
  );
};

export default NotificationTable;
