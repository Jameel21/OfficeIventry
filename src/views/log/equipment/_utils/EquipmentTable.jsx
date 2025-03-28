import Pagination from "@/components/pagination/Pagination";
import DataTable from "@/components/table/DataTable";
import { useGetAllCategory } from "@/store/hooks/MasterHooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EquipmentTable = ({ selectedCategory }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const headersMapping = {
    "Employee Equipment": [
      "Equipment",
      "Total Quantity",
      "Available",
      "Not Working",
      "In Use",
    ],
    "Office Equipment": [
      "Equipment",
      "Total Quantity",
      "Available",
      "Not Working",
    ],
  };

  const columnWidthsMapping = {
    "Employee Equipment": [
      "w-[20%]",
      "w-[20%]",
      "w-[20%]",
      "w-[20%]",
      "w-[20%]",
    ],
    "Office Equipment": ["w-[25%]", "w-[25%]", "w-[25%]", "w-[25%]"],
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
        { render: () => item.Available },
        { render: () => item.notWorking || "0" },
      ],
    };

    // Add additional columns for "Employee Equipment"
    if (selectedCategory === "Employee Equipment") {
      baseData.cells.push({ render: () => item.inUse });
    }

    return baseData;
  });
  const handleView = (row) => {
    const categoryId = row.cells[0].id;
    navigate(`/admin/categoryDetails/${categoryId}`, {
      state: { selectedCategory },
    });
  };
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
          onRowClick={(row) => handleView(row)}
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
