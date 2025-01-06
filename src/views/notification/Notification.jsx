import UiButton from "@/components/form-fields/_utils/Button";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDeleteNotifications } from "@/store/hooks/NotificationHooks";
import NotificationTable from "./_utils/NotificationTable";

const Notification = () => {
  const refetch = useQueryClient();

  const { mutateAsync } = useDeleteNotifications();

  const handleClearNotifications = async () => {
    try {
      const response = await mutateAsync();
      refetch.refetchQueries(["allNotifications"]);
      toast.success(
        response?.data?.message || "Notifications cleared successfully"
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to clear notification. Please try again";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full">
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
