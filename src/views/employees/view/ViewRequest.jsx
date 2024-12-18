import UiButton from "@/components/form-fields/_utils/Button";
import EmployeeTable from "../_utils/EmployeeTable";
import { useNavigate } from "react-router-dom";

const ViewRequest = () => {
  const navigate = useNavigate()
  const handleRequest = () => {
    navigate('/addRequest')
  }
  return (
    <div>
      <div className="flex justify-between mt-2">
        <h1 className="text-lg font-medium text-slate-700">Add Request</h1>
        <UiButton className="text-white md:w-24 md:h-9 lg:w-40 lg:h-11" variant={"secondary"} buttonName={"Add Request"} onClick={handleRequest}/>
      </div>
      <div className="mt-6">
        <EmployeeTable />
      </div>
    </div>
  );
};

export default ViewRequest;
