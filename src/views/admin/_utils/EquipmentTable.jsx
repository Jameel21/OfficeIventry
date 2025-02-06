import DataTable from "@/components/table/DataTable";
import { useGetAllCategory } from "@/store/hooks/MasterHooks";

const EquipmentTable = () => {

  const page = 1;
  const limit = 7;
  const {
    data,
    isLoading,
    error,
  } = useGetAllCategory(page, limit,"Employee Equipment");

  const headers = [
      "Equipment",
      "Total quantity",
      "In use",
    ]
    const categoryData = data?.category;
    const columnWidths = ["w-[50%]","w-[25%]","w-[20%]",]

    const tableData = categoryData?.map((item) => ({
      cells:[
        {
          id: item._id,
          render: () => item.equipmentName,
        },
        {
          render: () => item.totalQuantity,
        },
        { render: () => item.inUse }
      ]
    }) )
   
  return (
    <div>
    <DataTable
      headers={headers}
      tableData={tableData}
      isLoading={isLoading}
      columnWidths={columnWidths}
      error={error}
      containerClassName={"h-[300px]"}
      showBreadCrumbs={false}
    />
  </div>
  )
}

export default EquipmentTable