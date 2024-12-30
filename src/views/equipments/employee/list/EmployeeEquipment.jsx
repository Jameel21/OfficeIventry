import { useNavigate } from "react-router-dom";
import EquipmentTable from "../../_utils/EquipmentTable";
import EquipmentHeader from "../../_utils/EquipmentHeader";

const EmployeeEquipment = () => {
  const navigate = useNavigate();
  const handleAddForm = () => {
    navigate("/admin/addEmployeeEquipment");
  };

  return (
    <div className="w-full">
    <EquipmentHeader
      title={"Employee Equipment"}
      buttonName={"Add Equipment"}
      onClick={handleAddForm}
    />
    <div className="mt-8">
      <EquipmentTable equipmentType={"Employee Equipment"}/>
    </div>
  </div>
  );
};

export default EmployeeEquipment;
