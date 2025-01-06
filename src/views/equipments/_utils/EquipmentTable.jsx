import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  useDeleteEquipment,
  useGetAllEquipment,
} from "@/store/hooks/EquipmentsHooks";
import DataTable from "@/components/table/DataTable";
import Pagination from "@/components/pagination/Pagination";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getDecodedData } from "@/utils/encryptDecrypt";

const EquipmentTable = ({ equipmentType }) => {
  const navigate = useNavigate();
  const refetch = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const headers = ["Equipment", "brand", "Price", "Date Of Purchase"];
  const columnWidths = ["w-[25%]", "w-[25%]", "w-[25%]", "w-[25%]"];
  const userData = getDecodedData("userData");
  const role = userData?.userRole

  const { data, isLoading, error } = useGetAllEquipment(
    page,
    limit,
    equipmentType
  );

  const equipmentData = data?.equipment;
  const { mutateAsync } = useDeleteEquipment();

  const handleMenuChange = async (value, equipmentId) => {
    switch (value) {
      case "view":
        navigate(`/admin/viewEquipment/${equipmentId}`, {
          state: { pathname: equipmentType },
        });
        break;
      case "edit":
        navigate(`/admin/editEquipment/${equipmentId}`, {
          state: { pathname: equipmentType },
        });
        break;
      case "delete":
        try {
          const response = await mutateAsync(equipmentId);
          refetch.refetchQueries(["AllEquipment"]);
          toast.success(
            response?.data?.message || "Equipment deleted successfully"
          );
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            "Failed to delete the equipment. Please try again";
          toast.error(errorMessage);
        }
    }
  };

  const tableData = equipmentData?.map((item) => ({
    cells: [
      { id: item._id, render: () => item.equipmentNameId.equipmentName },
      { render: () => (item.brandId ? item.brandId.brand : "none") },
      { render: () => item.price },
      {
        render: () => new Date(item.dateOfPurchase).toLocaleDateString("en-GB"),
      },
    ],
    menu: role === "Employee" ? ["view"] : ["view", "edit", "delete"],
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
          showBreadCrumbs={true}
          handleMenuChange={handleMenuChange}
        />
      </div>
      <Pagination
        page={page}
        limit={limit}
        totalItems={data?.totalEquipment || 0}
        onPageChange={(newPage) => setPage(newPage)}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />
    </div>
  );
};

export default EquipmentTable;
