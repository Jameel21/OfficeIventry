import { useNavigate } from "react-router-dom";
import EquipmentTable from "../../_utils/EquipmentTable";
import EquipmentHeader from "../../_utils/EquipmentHeader";

const OfficeEquipment = () => {
  const navigate = useNavigate();
  const handleAddForm = () => {
    navigate("/admin/addOfficeEquipment");
  };
  return (
    <div className="w-full">
      <EquipmentHeader
        title={"Office Equipment"}
        buttonName={"Add Equipment"}
        onClick={handleAddForm}
      />
      <div className="mt-8">
        <EquipmentTable equipmentType={"Office Equipment"} />
      </div>
    </div>
  );
};

export default OfficeEquipment;
