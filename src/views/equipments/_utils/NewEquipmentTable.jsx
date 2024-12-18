import DataTable from "@/components/table/DataTable";
import { useNavigate } from "react-router-dom";

const NewEquipmentTable = ({
  headers,
  menu,
  data,
  isLoading,
  error,
  columnWidths = ["w-[25%]", "w-[25%]", "w-[25%]", "w-[25%]"],
}) => {

  const navigate = useNavigate();

  const tableData = data?.map((item) => [
    { id: item._id, render: () => item.equipmentNameId.equipmentName },
    { render: () => item.brandId ? item.brandId.brand : "none" },
    { render: () => item.price },
    { render: () => new Date(item.dateOfPurchase).toLocaleDateString("en-GB") },
  ]);
  
  const handleMenuChange = (value, equipmentId) => {
    switch (value) {
      case "view":
        navigate(`/admin/viewEquipment/${equipmentId}`);;
        break;
      case "edit":
        navigate(`/admin/editEmployeeEquip/${equipmentId}`);
        break;
    }
  };


  return (
    <div>
    <DataTable
      headers={headers}
      tableData={tableData}
      isLoading={isLoading}
      columnWidths={columnWidths}
      error={error}
      showBreadCrumbs={true}
      menu={menu}
      handleMenuChange={handleMenuChange}
    />
  </div>
  )
}

export default NewEquipmentTable