import { useNavigate } from "react-router-dom";
import {
  useDeleteEquipment,
  useGetAllEquipment,
} from "@/store/hooks/EquipmentsHooks";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import EquipmentTable from "../../_utils/EquipmentTable";
import EquipmentHeader from "../../_utils/EquipmentHeader";

const EmployeeEquipment = () => {
  const navigate = useNavigate();
  const refetch = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const handleAddForm = () => {
    navigate("/admin/addEmployeeEquipment");
  };

  const menu = ["view", "edit", "delete"];
  const headers = ["Equipment", "brand", "Price", "Date Of Purchase"];

  const { data, isLoading, error } = useGetAllEquipment(
    page,
    limit,
    "Employee Equipment"
  );

  const { mutate: deleteEquipment } = useDeleteEquipment();

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value) || 10;
    setLimit(newLimit);
    setPage(1);
  };

  const handleMenuChange = (value, equipmentId) => {
    switch (value) {
      case "view":
        navigate(`/admin/viewEmployeeEquip/${equipmentId}`);
        break;
      case "edit":
        navigate(`/admin/editEmployeeEquip/${equipmentId}`);
        break;
      case "delete":
        deleteEquipment(equipmentId, {
          onSuccess: () => {
            refetch.refetchQueries(["AllEquipment"]);
            toast.error("Equipment deleted successfully");
          },
          onError: (error) => {
            toast.error(
              `Failed to delete Equipment: ${
                error.response?.data?.message || error.message
              }`
            );
          },
        });
    }
  };
  return (
    <div className="w-full overflow-y-auto">
      <EquipmentHeader 
      title={"Employee Equipment"}
      buttonName={"Add Equipment"}
      onClick={handleAddForm}
      />
      <div className="mt-8">
        <EquipmentTable
          data={data}
          menu={menu}
          headers={headers}
          isLoading={isLoading}
          error={error}
          handleMenuChange={handleMenuChange}
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="items-center hidden gap-2 sm:flex">
          <label htmlFor="itemsPerPage">Items per page:</label>
          <input
            id="itemsPerPage"
            type="number"
            value={limit}
            onChange={handleLimitChange}
            className="w-20 p-2 border"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`p-1 sm:px-2 sm:py-2 text-base sm:text-md text-white ${
              page === 1 ? "bg-gray-400" : "bg-gray-500"
            }`}
          >
            Prev
          </button>
          <span className="text-sm sm:text-md">Page {page}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={data && page >= data.totalPages}
            className={`p-1 sm:px-2 sm:py-2 text-base sm:text-md text-white ${
              data && page >= data.totalPages ? "bg-gray-400" : "bg-gray-500"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeEquipment;
