import { useNavigate } from "react-router-dom";
import { useGetAllEquipment } from "@/store/hooks/EquipmentsHooks";
import { useState } from "react";
import EquipmentTable from "../../_utils/EquipmentTable";
import EquipmentHeader from "../../_utils/EquipmentHeader";
import Pagination from "@/components/pagination/Pagination";

const OfficeEquipment = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const handleAddForm = () => {
    navigate("/admin/addOfficeEquipment");
  };

  const menu = ["view", "edit"];
  const headers = ["Equipment", "brand", "Price", "Date Of Purchase"];

  const { data, isLoading, error } = useGetAllEquipment(
    page,
    limit,
    "Office Equipment"
  );

  const tableData = data?.equipment;

  const handleMenuChange = (value, equipmentId) => {
    switch (value) {
      case "view":
        navigate(`/admin/viewEquipment/${equipmentId}`, {
          state: { pathname: "Office Equipment" },
        });
        break;
      case "edit":
        navigate(`/admin/editEquipment/${equipmentId}`, {
          state: { pathname: "Office Equipment" },
        });
        break;
    }
  };
  return (
    <div className="w-full overflow-y-auto">
      <EquipmentHeader
        title={"Office Equipment"}
        buttonName={"Add Equipment"}
        onClick={handleAddForm}
      />
      <div className="mt-8">
        <EquipmentTable
          data={tableData}
          menu={menu}
          headers={headers}
          isLoading={isLoading}
          error={error}
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

export default OfficeEquipment;
