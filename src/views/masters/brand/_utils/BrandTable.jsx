import DataTable from "@/components/table/DataTable";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteBrand, useGetAllBrand } from "@/store/hooks/MasterHooks";
import toast from "react-hot-toast";
import Pagination from "@/components/pagination/Pagination";

const BrandTable = ({ page, limit, setPage, setLimit }) => {
  const navigate = useNavigate();
  const refetch = useQueryClient();

  const headers = ["Brand", "Created At"];
  const columnWidths = ["w-[50%]", "w-[50%]"];

  const { data, isLoading, error } = useGetAllBrand({ page, limit });
  const brandData = data?.brands;

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
    menu: ["view", "edit", "delete"],
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
        totalItems={data?.totalBrands || 0}
        onPageChange={(newPage) => setPage(newPage)}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />
    </div>
  );
};

export default BrandTable;
