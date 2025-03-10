import UiButton from "@/components/form-fields/_utils/Button";
import UiInput from "@/components/form-fields/_utils/UiInput";
import { getDecodedData } from "@/utils/encryptDecrypt";

const EquipmentHeader = ({ onClick, buttonName, title,searchTerm,handleSearchChange }) => {
  const userData = getDecodedData("userData");
  const menuPermission = userData?.menuPermission || [];

  const equipmentPermission = menuPermission.find(
    (perm) => perm?.menu?.pageName === "Equipment"
  );
  return (
    <div className="flex items-center justify-between">
      <div className="text-base font-normal md:text-lg md:font-medium text-slate-700">
        {title}
      </div>
      <div className="flex items-center gap-2">
        <UiInput
          placeholder={"Search by serial number "}
          inputClassName="h-7 md:h-9 md:w-40 lg:h-11 lg:w-96 hidden sm:flex"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {equipmentPermission?.create && (
          <UiButton
            onClick={onClick}
            className={"w-28 h-7 md:w-40 md:h-11 text-white"}
            variant={"secondary"}
            buttonName={buttonName}
          />
        )}
      </div>
    </div>
  );
};

export default EquipmentHeader;
