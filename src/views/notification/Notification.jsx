import UiButton from "@/components/form-fields/_utils/Button";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDeleteNotifications, useGetAllNotifications, useUpdateNotification } from "@/store/hooks/NotificationHooks";
import DataTable from "@/components/table/DataTable";

const Notification = () => {
  const navigate = useNavigate();
  const refetch = useQueryClient();
  const [notificationId, setNotificationId] = useState();
  const headers = ["Message", "Date & Time"];
  const menu = ["view"];
  const columnWidths = ["w-[70%]", "w-[30%]"];

  const { data: notificationData, isLoading, error } = useGetAllNotifications();

  const handleView = async (rowData) => {
    console.log("rowData", rowData)
    const { id: _id, tagId, read } = rowData;
    
    if (read) {
      return; 
    }
    try {
      setNotificationId(_id);
      await refetch.refetchQueries({ queryKey: ["allNotifications"] });
      navigate(`/viewRequest/${tagId}`);
    } catch (error) {
      console.error("Failed to fetch notification:", error);
    }
  };

  const { data } = useUpdateNotification(notificationId);
  
  useEffect(() => {
    if (data) {
      refetch.refetchQueries(["allNotifications"]);
    }
  }, [data,refetch]);

  const { mutate: deleteNotification } = useDeleteNotifications();

  const handleClearNotifications = () => {
    deleteNotification(undefined, {
      onSuccess: () => {
        refetch.refetchQueries(["allNotifications"]);
        toast.success("Notifications cleared successfully");
      },
      onError: (error) => {
        toast.error(
          `Failed to clear notification: ${error.response?.data?.message || error.message}`
        );
      },
    });
  };

  const tableData = notificationData?.map((item) => ({
    id: item._id,
    tagId: item.tagId?._id, 
    read: item.read,
    cells: [
      { render: () => item.message },
      { render: () => new Date(item.createdAt).toLocaleString() },
    ],
  }));

  const rowClassName = (rows) => {
    return rows.read ? "bg-gray-50" : "bg-gray-200";
  };

  return (
    <div className="w-full overflow-y-auto">
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium text-slate-700">Notifications</div>
        <div className="flex items-center gap-2">
          <UiButton
            onClick={handleClearNotifications}
            className={"md:w-24 md:h-9 lg:w-40 lg:h-11 text-white"}
            variant={"secondary"}
            buttonName={"Clear All"}
          />
        </div>
      </div>
      <div className="mt-8">
          <DataTable
            headers={headers}
            tableData={tableData}
            isLoading={isLoading}
            columnWidths={columnWidths}
            error={error}
            showBreadCrumbs={false}
            menu={menu}
            onRowClick={handleView}
            rowClassName={rowClassName} // Pass handleView to onRowClick
          />
      </div>
    </div>
  );
};

export default Notification;