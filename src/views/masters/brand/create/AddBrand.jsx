import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddBrandForm from "../_utils/AddBrandForm";

const AddBrand = () => {
  const navigate = useNavigate();
  const handlePreviousPage = () => {
    navigate("/admin/brand");
  };
  return (
    <div className="flex flex-col w-full h-full lg:items-start lg:justify-start">
    <div>
      <CircleArrowLeft
        className="w-4 h-4 cursor-pointer md:w-5 md:h-5 hover:opacity-90 "
        onClick={handlePreviousPage}
      />
    </div>
    <div className="mt-5">
      <h1 className="text-lg font-medium text-center sm:text-start text-slate-700">
        Add Brand
      </h1>
    </div>
    <AddBrandForm />
  </div>
  )
}

export default AddBrand