import { useState } from "react";
import LoadSpinner from "@/components/spinner/LoadSpinner";
import UiTable from "@/components/form-fields/_utils/UiTable";
import { TableCell, TableRow } from "@/components/ui/table";
import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";
import { useGetAllCategory } from "@/store/hooks/MasterHooks";

const EquipmentLog = () => {
  const [selectedCategory, setSelectedCategory] =
    useState("Employee Equipment");

  const headersMapping = {
    "Employee Equipment": [
      "Equipment",
      "Total Quantity",
      "Available",
      "In Use",
    ],
    "Office Equipment": ["Equipment", "Total Quantity"],
  };
  const headers =
    headersMapping[selectedCategory] || headersMapping["Employee Equipment"];
  const mainMenu = ["Employee Equipment", "Office Equipment"];

  const {
    data: categoryData,
    isLoading,
    error,
  } = useGetAllCategory(selectedCategory);

  const handleMainMenuChange = (value) => {
    setSelectedCategory(value);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium text-slate-700">
          {selectedCategory} Log
        </div>
        <div className="mt-2">
          <BreadCrumbs
            className="h-7 w-7"
            data={mainMenu}
            onChange={(value) => handleMainMenuChange(value)}
          />
        </div>
      </div>
      <div className="mt-8">
        <div className="overflow-y-auto h-[500px]">
          <UiTable headers={headers} headerClass={"h-12 text-lg"}>
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
                    {item.equipmentName}
                  </TableCell>
                  <TableCell>{item.totalQuantity}</TableCell>

                  {selectedCategory === "Employee Equipment" && (
                    <>
                      <TableCell>{item.Available}</TableCell>
                      <TableCell>{item.inUse}</TableCell>
                    </>
                  )}
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

export default EquipmentLog;
