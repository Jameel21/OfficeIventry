import UiButton from "@/components/form-fields/_utils/Button";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDeleteNotifications } from "@/store/hooks/NotificationHooks";
import NotificationTable from "./_utils/NotificationTable";

const Notification = () => {
  const refetch = useQueryClient();

  const { mutate: deleteNotification } = useDeleteNotifications();

  const handleClearNotifications = () => {
    deleteNotification(undefined, {
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
      },
    });
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
        <NotificationTable />
      </div>
    </div>
  );
};

export default Notification;
