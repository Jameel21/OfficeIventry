import UiButton from "@/components/form-fields/_utils/Button";
import { useState } from "react";
import LoadSpinner from "@/components/spinner/LoadSpinner";
import UiTable from "@/components/form-fields/_utils/UiTable";
import { TableCell, TableRow } from "@/components/ui/table";
import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";
import { useNavigate } from "react-router-dom";
import {
  useDeleteCategory,
  useGetAllCategory,
} from "@/store/hooks/MasterHooks";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const ListAllCategory = () => {
  const navigate = useNavigate();
  const refetch = useQueryClient();

  const [selectedCategory, setSelectedCategory] =
    useState("Employee Equipment");

  const headers = ["Equipment Name", "Created At"];
  const mainMenu = ["Employee Equipment", "Office Equipment"];
  const menu = ["view", "edit", "delete"];

  const {
    data: categoryData,
    isLoading,
    error,
  } = useGetAllCategory(selectedCategory);

  const { mutate: deleteCategory } = useDeleteCategory();

  const handleAddCategory = () => {
    navigate("/admin/addCategory", {
      state: { equipmentType: selectedCategory },
    });
  };

  const handleMainMenuChange = (value) => {
    const selectedEquipmentType =
      value === "Office Equipment" ? "Office Equipment" : "Employee Equipment";
    setSelectedCategory(selectedEquipmentType);
  };

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
  return (
    <div className="w-full">
      <div className="items-center justify-between md:flex">
        <div>
          <div className="text-base font-normal md:text-lg md:font-medium text-slate-700">
            {selectedCategory} Category
          </div>
          <div>
            <BreadCrumbs
              className="h-7 w-7"
              data={mainMenu}
              onChange={(value) => handleMainMenuChange(value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 md:items-center">
          <UiButton
            onClick={handleAddCategory}
            className={"w-28 h-7 md:w-40 md:h-11 text-white"}
            variant={"secondary"}
            buttonName={"Add Category"}
          />
        </div>
      </div>
      <div className="mt-6">
        <div className="overflow-y-auto h-[500px]">
          <UiTable headers={headers} headerClass={"h-12 text-sm md:text-lg"}>
            {isLoading ? (
              <TableRow className="h-12">
                <TableCell colSpan={headers.length}>
                  <div className="flex justify-center h-full">
                    <LoadSpinner />
                  </div>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow className="h-12">
                <TableCell
                  colSpan={headers.length}
                  className="font-medium text-center text-md text-muted-foreground"
                >
                  {error.message}
                </TableCell>
              </TableRow>
            ) : categoryData && categoryData?.length > 0 ? (
              categoryData.map((item, index) => (
                <TableRow
                  key={index}
                  className={`border border-gray-300 hover:bg-red-50 h-10 ${
                    index % 2 === 0 ? "bg-gray-200" : "bg-slate-100"
                  } `}
                >
                  <TableCell className="flex gap-3 ">
                    <BreadCrumbs
                      data={menu}
                      onChange={(value) => handleMenuChange(value, item._id)}
                    />
                    {item.equipmentName}
                  </TableCell>
                  <TableCell>
                    {new Date(item.createdAt).toLocaleDateString("en-GB")}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={headers.length} className="text-center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </UiTable>
        </div>
      </div>
    </div>
  );
};

export default ListAllCategory;
