import DataTable from "@/components/table/DataTable";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteBrand, useGetAllBrand } from "@/store/hooks/MasterHooks";
import toast from "react-hot-toast";
import Pagination from "@/components/pagination/Pagination";
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";
import { useState } from "react";
import { getDecodedData } from "@/utils/encryptDecrypt";

const BrandTable = ({ page, limit, setPage, setLimit }) => {
   const userData = getDecodedData("userData");
    const menuPermission = userData?.menuPermission || [];
  
    const brandPermission = menuPermission.find(
      (perm) => perm?.menu?.pageName === "Brand"
    );

  const navigate = useNavigate();
  const refetch = useQueryClient();

  const headers = ["Brand", "Created Date"];
  const columnWidths = ["w-[50%]", "w-[50%]"];

  const { data, isLoading, error } = useGetAllBrand({ page, limit });
  const brandData = data?.brands;

  const { mutateAsync } = useDeleteBrand();

  const [showModal, setShowModal] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState(null);

  const handleMenuChange = async (value, brandId) => {
    switch (value) {
      case "View":
        navigate(`/admin/viewBrand/${brandId}`);
        break;
      case "Edit":
        if (!brandPermission?.update) {
          toast.error("You don't have permission to perform this action.");
          return;
        }
        navigate(`/admin/editBrand/${brandId}`);
        break;
      case "Delete":
        setSelectedBrandId(brandId); 
        setShowModal(true); 
        break;
    }
  };

  const handleDelete = async () => {
    try {
      const response = await mutateAsync(selectedBrandId);
      refetch.refetchQueries(["AllBrand"]);
      toast.success(response?.data?.message || "Brand deleted successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to delete brand. Please try again.";
      toast.error(errorMessage);
    } finally {
      setShowModal(false); 
    }
  };

  // const sortData = brandData?.sort((a,b) =>
  //   a.brand.localeCompare(b.brand));

  const tableData = brandData?.map((item) => ({
    cells: [
      {
        id: item._id,
        render: () => (
          <div className="flex items-center gap-2">
            <BreadCrumbs
              data={["View", "Edit", "Delete"]}
              onChange={(value) => handleMenuChange(value, item._id)}
            />
            <span>{item.brand}</span>
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
