import { useNavigate } from "react-router-dom";
import { useGetRequest } from "@/store/hooks/EmployeeHooks";

const Employee = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("userName");
  const { refetch } = useGetRequest({ username });

  const handleViewDetails = async () => {
    if (username) {
      try {
         await refetch();
      } catch (error) {
        console.error("Error fetching equipment requests:", error);
      } finally{
        navigate("/viewEmployee");
      }
    }
  };

  const handleAddDetails = () =>{
    navigate("/requestForm");
  }

  return (
    <div>
      <div>Employee Management</div>
      <div  className="flex gap-4 mt-12">
        <div className="flex flex-col items-center justify-center w-40 gap-10 border border-gray-900 rounded-lg shadow-md h-28">
          <h1>Employee Details</h1>
          <button
            className="w-32 h-8 text-gray-200 border-dotted rounded-lg bg-secondary"
            onClick={handleViewDetails}
          >
            Click here
          </button>
        </div>
        <div className="flex flex-col items-center justify-center w-40 gap-10 border border-gray-900 rounded-lg shadow-md h-28">
          <h1>Request Form</h1>
          <button
           className="w-32 h-8 text-gray-200 border-dotted rounded-lg bg-secondary"
            onClick={handleAddDetails}
          >
            Click here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Employee;
