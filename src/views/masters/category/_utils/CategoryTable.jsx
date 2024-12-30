import DataTable from "@/components/table/DataTable";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  useDeleteCategory,
  useGetAllCategory,
} from "@/store/hooks/MasterHooks";
import toast from "react-hot-toast";
import { useState } from "react";
import Pagination from "@/components/pagination/Pagination";

const CategoryTable = ({ selectedCategory }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const refetch = useQueryClient();

  const headers = ["Equipment Name", "Created At"];
  const columnWidths = ["w-[50%]", "w-[50%]"];

  const { data, isLoading, error } = useGetAllCategory(
    page,
    limit,
    selectedCategory
  );

  const categoryData = data?.category;

  const { mutate: deleteCategory } = useDeleteCategory();

  const handleMenuChange = (value, categoryId) => {
    switch (value) {
      case "view":
        navigate(`/admin/viewCategory/${categoryId}`);
        break;
      case "edit":
        navigate(`/admin/editCategory/${categoryId}`);
        break;
      case "delete":
        deleteCategory(categoryId, {
          onSuccess: () => {
            refetch.refetchQueries(["AllCategory", selectedCategory]);
            toast.success("Category deleted successfully");
          },
          onError: (error) => {
            toast.error(
              `Failed to delete category: ${
                error.response?.data?.message || error.message
              }`
            );
          },
        });
    }
  };

  const tableData = categoryData?.map((item) => ({
    cells: [
      { id: item._id, render: () => item.equipmentName },
      { render: () => new Date(item.createdAt).toLocaleDateString("en-GB") },
    ],
    menu : ["view", "edit", "delete"]
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
          showBreadCrumbs={true}
          handleMenuChange={handleMenuChange}
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

export default CategoryTable;
