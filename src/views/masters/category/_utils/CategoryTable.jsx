import DataTable from "@/components/table/DataTable";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  useDeleteCategory,
  useGetAllCategory,
} from "@/store/hooks/MasterHooks";
import toast from "react-hot-toast";

const CategoryTable = ({selectedCategory}) => {

  const navigate = useNavigate();
  const refetch = useQueryClient(selectedCategory);


  const headers = ["Equipment Name", "Created At"];
  const menu = ["view", "edit", "delete"];
  const columnWidths = ["w-[50%]", "w-[50%]"];

  const {
    data: categoryData,
    isLoading,
    error,
  } = useGetAllCategory(selectedCategory);

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
            refetch.refetchQueries(["AllCategory"]);
            toast.error("Category deleted successfully");
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
    cells:[
    { id: item._id, render: () => item.equipmentName },
    { render: () => new Date(item.createdAt).toLocaleDateString("en-GB") },
  ]}));

  return (
    <div>
    <DataTable
      headers={headers}
      tableData={tableData}
      isLoading={isLoading}
      // breadCrumbsClass={"w-18 sm:w-20"}
      columnWidths={columnWidths}
      error={error}
      showBreadCrumbs={true}
      menu={menu}
      handleMenuChange={handleMenuChange}
    />
  </div>
  )
}

export default CategoryTable