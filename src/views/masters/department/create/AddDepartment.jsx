import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddDepartmentForm from "../_utils/AddDepartmentForm"


const AddDepartment = () => {
  const navigate = useNavigate();
  const handlePreviousPage = () => {
    navigate("/admin/department");
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
        Add Department
      </h1>
    </div>
    <AddDepartmentForm />
  </div>
  )
}

export default AddDepartment