import RequestForm from "../_utils/RequestForm";
import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddRequest = () => {
  const navigate = useNavigate();
  const handlePreviousPage = () => {
    navigate("/viewMyRequest")
  };
  return (
    <div className="flex flex-col w-full h-full lg:items-start lg:justify-start">
       <div>
        <CircleArrowLeft
          className="cursor-pointer hover:opacity-90"
          onClick={handlePreviousPage}
        />
      </div>
      <div className="mt-5">
        <h1 className="text-lg font-medium text-slate-700">
          Request Equipment
        </h1>
      </div>
      <RequestForm />
    </div>
  );
};

export default AddRequest;
