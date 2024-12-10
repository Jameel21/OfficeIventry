import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DropDown from "@/components/form-fields/_utils/DropDown";
import UiButton from "@/components/form-fields/_utils/Button";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import DatePickerDemo from "@/components/form-fields/_utils/DayPicker";
import { useGetEquipmentName } from "@/store/hooks/NameHooks";
import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { equipmentSchema } from "@/utils/validationSchema";
import { useAddEquipment } from "@/store/hooks/EquipmentsHooks";
import { format } from "date-fns";
import toast from "react-hot-toast";

const AddEmployeeEquipment = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setFocus
  } = useForm({
    resolver: yupResolver(equipmentSchema),
  });

  const navigate = useNavigate()
  const { data: equipmentNames } = useGetEquipmentName("Employee Equipment");

  const equipmentOptions =
    equipmentNames?.map((item) => ({
      label: item.equipmentName,
      value: item._id,
    })) || [];

  const selectedEquipmentId = watch("equipmentNameId");

  const selectedEquipment = equipmentNames?.find(
    (item) => item._id === selectedEquipmentId
  );

  const isSerialNumber = selectedEquipment?.isSerialNumber || false;

  const filteredBrands = selectedEquipment?.brands.map((brand) => ({
    label: brand.brand,
    value: brand._id,
  })) || [{ label: "none", value: "none" }];

  const addEquipmentMutation = useAddEquipment("Employee Equipment");

  const onSubmitForm = (data) => {
    const formattedData = {
      ...data,
      dateOfPurchase: data.dateOfPurchase
        ? format(new Date(data.dateOfPurchase), "yyyy-MM-dd")
        : "",
    };

    if (!isSerialNumber) {
      delete formattedData.serialNumber;
    }

    if (!data.warrantyPeriod) {
      delete formattedData.warrantyPeriod;
    }
    
    addEquipmentMutation.mutate(formattedData, {
      onSuccess: () => {
        toast.success("Equipment added successfully");
        reset();
        navigate("/admin/employeeEquipment");
      },
      onError: (error) => {
        const errorMessage =
          error.response?.data?.message ||
          "Equipment added failed. please try again";
        toast.error(errorMessage);
        if (error.response?.data?.message?.toLowerCase().includes("serialNumber exists")) {
          setFocus("serialNumber");
        }
      },
    });
    
  };
  const handlePreviousPage = () => {
    navigate("/admin/employeeEquipment");
  };

  return (
    <div>
      <div>
        <div>
          <CircleArrowLeft
            className="fixed cursor-pointer hover:opacity-90"
            onClick={handlePreviousPage}
          />
        </div>
        <div className="ml-8 text-lg font-medium text-slate-700">Add EmployeeEquipment</div>
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmitForm)}>
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
            <InputWithLabel
              type="number"
              name="quantity"
              placeholder="quantity"
              control={control}
              inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 w-52 sm:w-64 md:w-72 lg:w-80"
            />
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
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeEquipment;
