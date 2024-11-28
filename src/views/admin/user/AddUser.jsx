import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddUserForm from "./_utils/AddUserForm";

const AddUser = () => {
  const navigate = useNavigate();
  const handlePreviousPage = () => {
    navigate("/admin");
  };
  return (
    <div className="flex w-full h-full">
      <div>
        <CircleArrowLeft
          className="fixed cursor-pointer hover:opacity-90"
          onClick={handlePreviousPage}
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-full md:w-3/4 lg:w-1/2">
          <AddUserForm />
        </div>
      </div>
    </div>
  );
};
export default AddUser;
