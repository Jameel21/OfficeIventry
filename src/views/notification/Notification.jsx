import UiButton from "@/components/form-fields/_utils/Button";
import UiTable from "@/components/form-fields/_utils/UiTable";
import { TableCell, TableRow } from "@/components/ui/table";
import toast from "react-hot-toast";
import LoadSpinner from "@/components/spinner/LoadSpinner";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  useDeleteNotifications,
  useGetAllNotifications,
  useGetNotification,
} from "@/store/hooks/NotificationHooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const navigate = useNavigate();
  const refetch = useQueryClient();
  const [notificationId, setNotificationId] = useState();
  const headers = [""];

  const { data: notificationData, isLoading, error } = useGetAllNotifications();

  const handleView = async (Id, tagId) => {
    try {
      setNotificationId(Id);
      await refetch.refetchQueries({ queryKey: ["allNotifications"] });
      navigate(`/viewRequest/${tagId}`);
    } catch (error) {
      console.error("Failed to fetch notification:", error);
    }
  };

  const { data } = useGetNotification(notificationId);
  useEffect(() => {
    if (data) {
      refetch.refetchQueries(["allNotifications"]);
      navigate(`/viewRequest/${data.tagId._id}`);
    }
  }, [data, navigate,refetch]);
  
const{mutate:deleteNotification} = useDeleteNotifications()

  const handleClearNotifications = () => {
    deleteNotification(undefined,{
      onSuccess: () => {
        refetch.refetchQueries(["allNotifications"]);
        toast.success("Notifications cleared successfully");
      },
      onError: (error) => {
        toast.error(
          `Failed to clear notification: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    })
  };

  return (
    <div className="w-full overflow-y-auto">
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium text-slate-700">Notifications</div>
        <div className="flex items-center gap-2 w-">
          <UiButton
            onClick={handleClearNotifications}
            className={"md:w-24 md:h-9 lg:w-40 lg:h-11 text-white"}
            variant={"secondary"}
            buttonName={"Clear All"}
          />
        </div>
      </div>
      <div className="mt-8">
        <div className="overflow-y-auto h-[440px] sm:h-[500px]">
          <UiTable
            headers={headers}
            headerClass={"h-12 text-sm md:text-base lg:text-lg"}
          >
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
            ) : notificationData && notificationData?.length > 0 ? (
              notificationData.map((item, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleView(item._id, item.tagId._id)}
                  className={`border border-gray-300 h-10 text-lg ${
                    item.read ? "bg-gray-50" : "bg-gray-200"
                  }`}
                >
                  <TableCell className="flex gap-3 ">{item.tag}</TableCell>
                  <TableCell>{item.message}</TableCell>
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
    </div>
  );
};

export default Notification;
