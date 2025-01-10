import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetEquipmentName } from "@/store/hooks/NameHooks";
import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { equipmentSchema } from "@/utils/validationSchema";
import { useAddEquipment } from "@/store/hooks/EquipmentsHooks";
import { format } from "date-fns";
import toast from "react-hot-toast";
import EquipmentForm from "../../_utils/EquipmentForm";

const AddEmployeeEquipment = () => {
  const methods = useForm({
    resolver: yupResolver(equipmentSchema),
  });
  const { handleSubmit, reset, watch, setFocus,formState: { isSubmitting }, } = methods;

  const navigate = useNavigate();
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

  const { mutateAsync } = useAddEquipment("Employee Equipment");

  const onSubmitForm = async (data) => {
    const formattedData = {
      ...data,
      dateOfPurchase: data.dateOfPurchase
        ? format(new Date(data.dateOfPurchase), "yyyy-MM-dd")
        : "",
    };
    if (!isSerialNumber) {
      delete formattedData.serialNumber;
    }
    if (!data.quantity) {
      delete formattedData.quantity;
    }
    if (!data.warrantyPeriod) {
      delete formattedData.warrantyPeriod;
    }

    try {
      const response = await mutateAsync(formattedData);
      toast.success(response?.data?.message || "Equipment added successfully");
      reset();
      navigate("/admin/employeeEquipment");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Equipment added failed. please try again";
      toast.error(errorMessage);
      if (
        error.response?.data?.message
          ?.toLowerCase()
          .includes("serialNumber exists")
      ) {
        setFocus("serialNumber");
      }
    }
  };
  const handlePreviousPage = () => {
    navigate("/admin/employeeequipment");
  };

  return (
    <div>
      <div>
        <div>
          <CircleArrowLeft
            className="fixed cursor-pointer hover:opacity-90 w-"
            onClick={handlePreviousPage}
          />
        </div>
        <div className="ml-8 text-lg font-medium text-slate-700">
          Add EmployeeEquipment
        </div>
      </div>

      <div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <EquipmentForm
              equipmentOptions={equipmentOptions}
              filteredBrands={filteredBrands}
              isSerialNumber={isSerialNumber}
              isSubmitting={isSubmitting}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddEmployeeEquipment;
