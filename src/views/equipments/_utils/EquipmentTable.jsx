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

const EquipmentTable = ({ equipmentType }) => {
  const navigate = useNavigate();
  const refetch = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const headers = ["Equipment", "brand", "Price", "Date Of Purchase"];
  const columnWidths = ["w-[25%]", "w-[25%]", "w-[25%]", "w-[25%]"];

  const { data, isLoading, error } = useGetAllEquipment(
    page,
    limit,
    equipmentType
  );

  const equipmentData = data?.equipment;
  const { mutateAsync } = useDeleteEquipment();

  const [showModal, setShowModal] = useState(false);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);

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
              data={["view", "edit", "delete"]}
              onChange={(value) => handleMenuChange(value, item._id)}
            />
            <span>{ item.equipmentNameId.equipmentName}</span>
          </div>
        ),
      },
      { render: () => (item.brandId ? item.brandId.brand : "none") },
      { render: () => item.price },
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
        />
      </div>
      <ConfirmationModal
        showModal={showModal}
        title={"Are you sure you want to delete ?"}
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
