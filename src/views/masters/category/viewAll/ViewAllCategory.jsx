import { CircleArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import CategoryDetailsTable from "../_utils/CategoryDetailsTable";

const ViewAllCategory = () => {
   const navigate = useNavigate();
   const location = useLocation()
   const selectedCategory =
   location.state?.selectedCategory || "Employee Equipment";

    const handlePreviousPage = () => {
      navigate("/admin/equipmentLog", {
        state: { equipmentType: selectedCategory },
      });
    };
  return (
    <div>
      <div className="flex gap-4">
        <CircleArrowLeft
          className="w-4 h-4 mt-1 cursor-pointer md:w-5 md:h-5 hover:opacity-90"
          onClick={handlePreviousPage}
        />
        <h1 className="text-lg font-medium text-center sm:text-start text-slate-700">
          Equipment Details
        </h1>
      </div>
      <div className="mt-12">
        <CategoryDetailsTable/>
      </div>
    </div>
  )
}

export default ViewAllCategory