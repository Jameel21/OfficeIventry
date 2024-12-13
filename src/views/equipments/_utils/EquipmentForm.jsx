import DropDown from "@/components/form-fields/_utils/DropDown";
import UiButton from "@/components/form-fields/_utils/Button";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import DatePickerDemo from "@/components/form-fields/_utils/DayPicker";

const EquipmentForm = ({
  equipmentOptions,
  filteredBrands,
  isSerialNumber,
  control,
}) => {
  return (
    <div className="grid grid-cols-1 gap-1 mt-4 lg:gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      <DropDown
        control={control}
        name="equipmentNameId"
        options={equipmentOptions}
        placeholder="Select a equipment"
        dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
      />

      <DropDown
        control={control}
        name="brandId"
        options={filteredBrands}
        placeholder={"Select a brand"}
        dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
      />

      {isSerialNumber && (
        <InputWithLabel
          type="text"
          name="serialNumber"
          placeholder="Serial number"
          control={control}
          inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80"
        />
      )}
      {!isSerialNumber && (
        <InputWithLabel
          type="number"
          name="quantity"
          placeholder="quantity"
          control={control}
          inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80"
        />
      )}
      <InputWithLabel
        type="text"
        name="price"
        placeholder="price"
        control={control}
        inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80"
      />
      <DatePickerDemo
        control={control}
        name="dateOfPurchase"
        placeholder="date of purchase"
        className="h-8 p-2 mt-2 w-52 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 "
      />
      <InputWithLabel
        type="text"
        name="warrantyPeriod"
        placeholder="warranty period"
        control={control}
        inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80"
      />
      <UiButton
        variant="secondary"
        type="submit"
        buttonName="Save"
        className="w-24 h-8 mt-3 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-80 lg:h-12"
      />
    </div>
  );
};

export default EquipmentForm;
