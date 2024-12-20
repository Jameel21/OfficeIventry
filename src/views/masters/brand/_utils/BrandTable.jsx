import DataTable from "@/components/table/DataTable";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteBrand, useGetAllBrand } from "@/store/hooks/MasterHooks";
import toast from "react-hot-toast";

const BrandTable = () => {
  const navigate = useNavigate();
  const refetch = useQueryClient();

  const headers = ["Brand", "Created At"];
  const menu = ["view", "edit", "delete"];
  const columnWidths = ["w-[50%]", "w-[50%]"];

  const { data: brandData, isLoading, error } = useGetAllBrand();
  const { mutate: deleteBrand } = useDeleteBrand();

  const handleMenuChange = (value, brandId) => {
    switch (value) {
      case "view":
        navigate(`/admin/viewBrand/${brandId}`);
        break;
      case "edit":
        navigate(`/admin/editBrand/${brandId}`);
        break;
      case "delete":
        deleteBrand(brandId, {
          onSuccess: () => {
            refetch.refetchQueries(["AllBrand"]);
            toast.error("Brand deleted successfully");
          },
          onError: (error) => {
            toast.error(
              `Failed to delete brand: ${
                error.response?.data?.message || error.message
              }`
            );
          },
        });
    }
  };

  const tableData = brandData?.map((item) => ({
    cells: [
      { id: item._id, render: () => item.brand },
      { render: () => new Date(item.createdAt).toLocaleDateString("en-GB") },
    ],
  }));

  return (
    <div>
      <DataTable
        headers={headers}
        tableData={tableData}
        isLoading={isLoading}
        columnWidths={columnWidths}
        error={error}
        showBreadCrumbs={true}
        menu={menu}
        handleMenuChange={handleMenuChange}
      />
    </div>
  );
};

export default BrandTable;
