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
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";

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

  const { mutateAsync } = useDeleteCategory();

  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleMenuChange = async (value, categoryId) => {
    switch (value) {
      case "view":
        navigate(`/admin/viewCategory/${categoryId}`,{
          state: { selectedCategory },
        });
        break;
      case "edit":
        navigate(`/admin/editCategory/${categoryId}`, {
          state: { selectedCategory },
        });
        break;
      case "delete":
        setSelectedCategoryId(categoryId);
        setShowModal(true);
        break;
    }
  };

  const handleDelete = async () => {
    try {
      const response = await mutateAsync(selectedCategoryId);
      refetch.refetchQueries(["AllCategory"]);
      toast.success(response?.data?.message || "Category deleted successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to delete category. Please try again.";
      toast.error(errorMessage);
    } finally {
      setShowModal(false);
    }
  };

  const tableData = categoryData?.map((item) => ({
    cells: [
      {
        id: item._id,
        render: () => (
          <div className="flex items-center gap-2">
            <BreadCrumbs
              data={["view", "edit", "delete"]}
              onChange={(value) => handleMenuChange(value, item._id)}
            />
            <span>{item.equipmentName}</span>
          </div>
        ),
      },
      { render: () => new Date(item.createdAt).toLocaleDateString("en-GB") },
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
        />
      </div>
      <ConfirmationModal
        showModal={showModal}
        title={"Are you sure you want to delete ?"}
        onClose={() => setShowModal(false)} 
        onConfirm={handleDelete} 
      />
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
