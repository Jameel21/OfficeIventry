import { useNavigate } from "react-router-dom";
import EquipmentTable from "../../_utils/EquipmentTable";
import EquipmentHeader from "../../_utils/EquipmentHeader";
import { useState } from "react";

const OfficeEquipment = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const handleAddForm = () => {
    navigate("/admin/addOfficeEquipment");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };
  return (
    <div className="w-full">
      <EquipmentHeader
        title={"Office Equipment"}
        buttonName={"Add Equipment"}
        onClick={handleAddForm}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <div className="mt-8">
        <EquipmentTable
          equipmentType={"Office Equipment"}
          searchTerm={searchTerm}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default OfficeEquipment;
