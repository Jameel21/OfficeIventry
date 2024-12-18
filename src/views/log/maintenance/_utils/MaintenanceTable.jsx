import DataTable from "@/components/table/DataTable";

const MaintenanceTable = () => {
  const headers = ["Equipment", "Price", "Date of service"];
  const columnWidths = ["w-[30%]", "w-[30%]", "w-[30%]"];

  const data = [
    {
      equipmentName: "AC",
      price: "65000",
      dateOfService: "03/30/2025",
    },
    {
      equipmentName: "Water Purifier",
      price: "2000",
      dateOfService: "01/30/2025",
    },
  ];

  const tableData = data?.map((item) => [
    {
      // id: item._id,
      render: () => item.equipmentName
    },
    { render: () => item.price },
    { render: () => new Date(item.dateOfService).toLocaleDateString("en-GB") },
  ]);

  return (
    <div>
    <DataTable
      headers={headers}
      tableData={tableData}
      // isLoading={isLoading}
      columnWidths={columnWidths}
      // error={error}
      showBreadCrumbs={false}
    />
  </div>
  )
};

export default MaintenanceTable;
