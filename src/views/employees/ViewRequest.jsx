import UiButton from "@/components/form-fields/_utils/Button";
import EmployeeTable from "./_utils/EmployeeTable";
import { useNavigate } from "react-router-dom";

const ViewRequest = () => {
  const navigate = useNavigate()
  const handleRequest = () => {
    navigate('/requestForm')
  }
  return (
    <div>
      <div className="flex justify-between mt-2">
        <h1 className="text-lg font-medium text-slate-700">Details</h1>
        <UiButton buttonName={"Create Request"} onClick={handleRequest}/>
      </div>
      <div className="mt-6">
        <EmployeeTable />
      </div>
    </div>
  );
};

export default ViewRequest;
