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
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";
import { getDecodedData } from "@/utils/encryptDecrypt";

const EquipmentTable = ({ equipmentType , searchTerm , page, setPage}) => {
  const userData = getDecodedData("userData");
      const menuPermission = userData?.menuPermission || [];
  
      const equipmentPermission = menuPermission.find(
        (perm) => perm?.menu?.pageName === "Equipment"
      );
  const navigate = useNavigate();
  const refetch = useQueryClient();
  const [limit, setLimit] = useState(10);

  const headers = ["Equipment", "Brand", "Serial Number", "Price", "Date of purchase"];
  const columnWidths = ["w-[20%]", "w-[20%]", "w-[20%]", "w-[20%]", "w-[20%]"];

  const { data, isLoading, error } = useGetAllEquipment(
    page,
    limit,
    equipmentType,
    searchTerm 
  );

  const equipmentData = data?.equipment;

  const { mutateAsync } = useDeleteEquipment();

  const [showModal, setShowModal] = useState(false);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);

  const handleMenuChange = async (value, equipmentId) => {
    switch (value) {
      case "View":
        navigate(`/admin/viewEquipment/${equipmentId}`, {
          state: { pathname: equipmentType },
        });
        break;
      case "Edit":
        if (!equipmentPermission?.update) {
          toast.error("You don't have permission to perform this action.");
          return;
        }
        navigate(`/admin/editEquipment/${equipmentId}`, {
          state: { pathname: equipmentType },
        });
        break;
      case "Delete":
        setSelectedEquipmentId(equipmentId);
        setShowModal(true);
        break;
    }
  };

  const handleDelete = async () => {
    try {
      const response = await mutateAsync(selectedEquipmentId);
      refetch.refetchQueries(["AllEquipment"]);
      toast.success(response?.data?.message || "Equipment deleted successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to delete equipment. Please try again.";
      toast.error(errorMessage);
    } finally {
      setShowModal(false);
    }
  };

  const tableData = equipmentData?.map((item) => ({
    cells: [
      {
        id: item._id,
        render: () => (
          <div className="flex items-center gap-2">
            <BreadCrumbs
              data={["View", "Edit", "Delete"]}
              onChange={(value) => handleMenuChange(value, item._id)}
            />
            <span>{ item.equipmentNameId.equipmentName}</span>
          </div>
        ),
      },
      { render: () => (item.brandId ? item.brandId.brand : "none") },
      { render: () => (item?.serialNumber || "none") },
      {
        render: () =>
          `₹ ${parseFloat(item.price).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
      },
      {
        render: () => new Date(item.dateOfPurchase).toLocaleDateString("en-GB"),
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
