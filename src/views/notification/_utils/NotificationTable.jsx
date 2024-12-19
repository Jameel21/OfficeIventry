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
  const menu = ["view", "delete"];
  const columnWidths = ["w-[70%]", "w-[30%]"];

  const handleMenuChange = (action, notificationId, tagId, isRead) => {
    switch (action) {
      case "view":
        if (!isRead) {
          navigate(`/viewRequest/${tagId}`);
          refetch.refetchQueries(["allNotifications"]);
        }
        break;

      case "delete":
        deleteNotification(notificationId, {
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

  const tableData = notifications?.map((notification) => [
    {
      id: notification._id,
      render: () => notification.message,
    },
    {
      render: () => new Date(notification.createdAt).toLocaleString("en-GB"),
    },
  ]);

  return (
    <DataTable
      headers={headers}
      tableData={tableData}
      isLoading={isLoading}
      error={error}
      columnWidths={columnWidths}
      menu={menu}
      handleMenuChange={(action, id) =>
        handleMenuChange(
          action,
          id,
          notifications?.find((n) => n._id === id)?.tagId?._id,
          notifications?.find((n) => n._id === id)?.read
        )
      }
    />
  );
};

export default NotificationTable;
