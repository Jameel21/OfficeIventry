import Pagination from "@/components/pagination/Pagination";
import DataTable from "@/components/table/DataTable";
import { useGetAllCategory } from "@/store/hooks/MasterHooks";
import { useState } from "react";

const EquipmentTable = ({ selectedCategory }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
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

  const { data, isLoading, error } = useGetAllCategory(
    page,
    limit,
    selectedCategory
  );

  const categoryData = data?.category;

  const tableData = categoryData?.map((item) => {
    const baseData = {
      cells: [
        {
          id: item._id,
          render: () => item.equipmentName,
        },
        {
          render: () => item.totalQuantity,
        },
      ],
    };

    // Add additional columns for "Employee Equipment"
    if (selectedCategory === "Employee Equipment") {
      baseData.cells.push(
        { render: () => item.Available },
        { render: () => item.inUse }
      );
    }

    return baseData;
  });
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
        />
      </div>
      <Pagination
        page={page}
        limit={limit}
        totalItems={data?.totalCategry || 0}
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
