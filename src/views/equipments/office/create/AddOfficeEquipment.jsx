import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetEquipmentName } from "@/store/hooks/NameHooks";
import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { equipmentSchema } from "@/utils/validationSchema";
import { useAddEquipment } from "@/store/hooks/EquipmentsHooks";
import { format } from "date-fns";
import toast from "react-hot-toast";
import EquipmentForm from "../../_utils/EquipmentForm";

const AddOfficeEquipment = () => {
  const { control, handleSubmit, reset, watch, setFocus } = useForm({
    resolver: yupResolver(equipmentSchema),
  });

  const navigate = useNavigate();
  const { data: equipmentNames } = useGetEquipmentName("Office Equipment");
  console.log("officeEquipmentNames", equipmentNames);

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

  const addEquipmentMutation = useAddEquipment("Office Equipment");

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
        navigate("/admin/officeEquipment");
      },
      onError: (error) => {
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
      },
    });
  };
  const handlePreviousPage = () => {
    navigate("/admin/officeEquipment");
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
          Add OfficeEquipment
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <EquipmentForm
            equipmentOptions={equipmentOptions}
            filteredBrands={filteredBrands}
            isSerialNumber={isSerialNumber}
            control={control}
          />
        </form>
      </div>
    </div>
  );
};

export default AddOfficeEquipment;
