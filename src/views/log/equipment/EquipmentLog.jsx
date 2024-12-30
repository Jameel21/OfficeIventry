import { useState } from "react";
import BreadCrumbs from "@/components/form-fields/_utils/BreadCrumbs";
import EquipmentTable from "./_utils/EquipmentTable";

const EquipmentLog = () => {
  const [selectedCategory, setSelectedCategory] =
    useState("Employee Equipment");

  const mainMenu = ["Employee Equipment", "Office Equipment"];


  const handleMainMenuChange = (value) => {
    setSelectedCategory(value);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mt-2">
        <div className="text-lg font-medium text-slate-700">
          {selectedCategory} Log
        </div>
        <div>
          <BreadCrumbs
            className="h-7 w-7"
            data={mainMenu}
            onChange={(value) => handleMainMenuChange(value)}
          />
        </div>
      </div>
      <div className="mt-10">
       <EquipmentTable selectedCategory={selectedCategory}/>
      </div>
    </div>
  );
};

export default EquipmentLog;
