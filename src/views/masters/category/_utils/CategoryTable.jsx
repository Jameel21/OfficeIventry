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
import { getDecodedData } from "@/utils/encryptDecrypt";

const CategoryTable = ({ selectedCategory }) => {
  const userData = getDecodedData("userData");
      const menuPermission = userData?.menuPermission || [];
  
    const categoryPermission = menuPermission.find(
      (perm) => perm?.menu?.pageName === "Category"
    );
  

  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const refetch = useQueryClient();

  const headers = ["Category Name", "Created Date"];
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
      case "View":
        navigate(`/admin/viewCategory/${categoryId}`,{
          state: { selectedCategory },
        });
        break;
      case "Edit":
        if (!categoryPermission?.update) {
          toast.error("You don't have permission to perform this action.");
          return;
        }
        navigate(`/admin/editCategory/${categoryId}`, {
          state: { selectedCategory },
        });
        break;
      case "Delete":
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
              data={["View", "Edit", "Delete"]}
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
          bodyClassName={"cursor-default"}
        />
      </div>
      <ConfirmationModal
        showModal={showModal}
        title={"Are you sure you want to delete?"}
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
