import Pagination from "@/components/pagination/Pagination";
import DataTable from "@/components/table/DataTable";
import {
  useGetAllNotifications,
  useUpdateNotification,
} from "@/store/hooks/NotificationHooks";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotificationTable = () => {
  const navigate = useNavigate();
  const refetch = useQueryClient();
  const [notificationId, setNotificationId] = useState();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const headers = ["Message", "Date & Time"];
  const columnWidths = ["w-[70%]", "w-[30%]"];

  const { data, isLoading, error } = useGetAllNotifications({ page, limit });
  const notificationData = data?.notifications;

  const handleView = async (rowData) => {
    const { id: _id, tagId, read } = rowData;
    if (read) {
      return;
    }
    try {
      setNotificationId(_id);
      await refetch.refetchQueries({ queryKey: ["allNotifications"] });
      navigate(`/viewRequest/${tagId}`,{ state: { prevPage : "notification" } });
    } catch (error) {
      console.error("Failed to fetch notification:", error);
    }
  };

  const { updatedData } = useUpdateNotification(notificationId);
  useEffect(() => {
    if (updatedData) {
      refetch.refetchQueries(["allNotifications"]);
    }
  }, [updatedData, refetch]);

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
    <div>
      <div>
        <DataTable
          headers={headers}
          tableData={tableData}
          isLoading={isLoading}
          columnWidths={columnWidths}
          error={error}
          showBreadCrumbs={false}
          onRowClick={handleView}
          rowClassName={rowClassName}
        />
        <Pagination
          page={page}
          limit={limit}
          totalItems={data?.totalNotifications || 0}
          onPageChange={(newPage) => setPage(newPage)}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default NotificationTable;
