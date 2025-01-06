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
import { getDecodedData } from "@/utils/encryptDecrypt";

const CategoryTable = ({ selectedCategory }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const userData = getDecodedData("userData");
  const role = userData?.userRole

  const refetch = useQueryClient();

  const headers = ["Equipment Name", "Created At"];
  const columnWidths = ["w-[50%]", "w-[50%]"];

  const { data, isLoading, error } = useGetAllCategory(
    page,
    limit,
    selectedCategory
  );

  const categoryData = data?.category;

  const { mutateAsync } = useDeleteCategory();

  const handleMenuChange = async (value, categoryId) => {
    switch (value) {
      case "view":
        navigate(`/admin/viewCategory/${categoryId}`);
        break;
      case "edit":
        navigate(`/admin/editCategory/${categoryId}`);
        break;
      case "delete":
        try {
          const response = await mutateAsync(categoryId);
          refetch.refetchQueries(["AllCategory", selectedCategory]);
          toast.success(
            response?.data?.message || "Category deleted successfully"
          );
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            "Failed to delete category. Please try again";
          toast.error(errorMessage);
        }
    }
  };

  const tableData = categoryData?.map((item) => ({
    cells: [
      { id: item._id, render: () => item.equipmentName },
      { render: () => new Date(item.createdAt).toLocaleDateString("en-GB") },
    ],
    menu: role === "Employee" ? ["view"] : ["view", "edit", "delete"],
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
