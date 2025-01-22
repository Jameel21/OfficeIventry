import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddCategoryForm from "../_utils/AddCategoryForm";
import { useLocation } from "react-router-dom";

const AddCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const equipmentType = location.state?.equipmentType || "Employee Equipment";

  const handlePreviousPage = () => {
    navigate("/admin/category", {
      state: { equipmentType: equipmentType },
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4">
        <CircleArrowLeft
          className="w-4 h-4 mt-1 cursor-pointer md:w-5 md:h-5 hover:opacity-90"
          onClick={handlePreviousPage}
        />
        <h1 className="text-lg font-medium text-center sm:text-start text-slate-700">
          Add {equipmentType} Category
        </h1>
      </div>
      <AddCategoryForm equipmentType={equipmentType}/>
    </div>
  );
};

export default AddCategory;
