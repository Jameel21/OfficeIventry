import UiButton from "@/components/form-fields/_utils/Button";
import { useState } from "react";
import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";
import { useLocation, useNavigate } from "react-router-dom";
import CategoryTable from "../_utils/CategoryTable";

const ListAllCategory = () => {
  const navigate = useNavigate();
 const location = useLocation();
 const initialCategory =
 location.state?.equipmentType || "Employee Equipment";
  const [selectedCategory, setSelectedCategory] =
    useState(initialCategory);

  const mainMenu = ["Employee Equipment", "Office Equipment"];

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
      <div className="mt-5">
       <CategoryTable selectedCategory={selectedCategory}/>
      </div>
    </div>
  );
};

export default ListAllCategory;
