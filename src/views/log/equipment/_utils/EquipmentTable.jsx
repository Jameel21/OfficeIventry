import DataTable from "@/components/table/DataTable";
import { useGetAllCategory } from "@/store/hooks/MasterHooks";

const EquipmentTable = ({selectedCategory}) => {

  const headersMapping = {
    "Employee Equipment": [
      "Equipment",
      "Total Quantity",
      "Available",
      "In Use",
    ],
    "Office Equipment": ["Equipment", "Total Quantity"],
  };

  const columnWidthsMapping = {
    "Employee Equipment": ["w-[30%]", "w-[20%]", "w-[20%]", "w-[20%]"],
    "Office Equipment": ["w-[50%]", "w-[50%]"],
  };

  const headers =
    headersMapping[selectedCategory] || headersMapping["Employee Equipment"];
  const columnWidths =
    columnWidthsMapping[selectedCategory] ||
    columnWidthsMapping["Employee Equipment"];

  const {
    data: categoryData,
    isLoading,
    error,
  } = useGetAllCategory(selectedCategory);

  const tableData = categoryData?.map((item) => {
    const baseData = [
      {
        id: item._id,
        render: () => item.equipmentName,
      },
      {
        render: () => item.totalQuantity,
      },
    ];

    // Add additional columns for "Employee Equipment"
    if (selectedCategory === "Employee Equipment") {
      baseData.push(
        { render: () => item.Available },
        { render: () => item.inUse }
      );
    }

    return baseData;
  });
  return (
    <div>
      <DataTable
        headers={headers}
        tableData={tableData}
        isLoading={isLoading}
        columnWidths={columnWidths}
        error={error}
        showBreadCrumbs={false}
      />
    </div>
  )
}

export default EquipmentTable