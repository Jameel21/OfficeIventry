import Pagination from "@/components/pagination/Pagination";
import DataTable from "@/components/table/DataTable";
import { useGetCategoryDetails } from "@/store/hooks/MasterHooks";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CategoryDetailsTable = () => {
  const { id } = useParams();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const headers = ["Equipment Name", "Brand", "Available quantity", "Date of purchase"];
  const columnWidths = ["w-[25%]", "w-[25%]", "w-[25%]", "w-[25%]",];
  const { data, isLoading, error } = useGetCategoryDetails({ id, page, limit });
  const categoryData = data?.categories;

  const tableData = categoryData?.map((item) => ({
    cells: [
      { id: item._id, render: () => item.equipmentNameId.equipmentName },
      { render: () => item.brandId?.brand ?? "none" },
      { render: () => item.quantity ?? "none" },
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
          showBreadCrumbs={false}
          bodyClassName={"cursor-default"}
        />
      </div>
      <Pagination
        page={page}
        limit={limit}
        totalItems={data?.totalCategories || 0}
        onPageChange={(newPage) => setPage(newPage)}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />
    </div>
  );
};

export default CategoryDetailsTable;
