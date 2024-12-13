import { useForm } from "react-hook-form";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import UiButton from "@/components/form-fields/_utils/Button";
import DropDown from "@/components/form-fields/_utils/DropDown";
import {
  useGetSingleEquipment,
  useUpdateEquipment,
} from "@/store/hooks/EquipmentsHooks";
import { CircleArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { useGetEquipmentName } from "@/store/hooks/NameHooks";
import DatePickerDemo from "@/components/form-fields/_utils/DayPicker";

const EditOfficeEquipment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: userData, isLoading } = useGetSingleEquipment(id);
  const equipmentId = userData?.equipmentNameId?._id;

  const { data: equipmentNames } = useGetEquipmentName("Office Equipment");

  const selectedEquipment = equipmentNames?.find(
    (equipment) => equipment._id === equipmentId
  );

  const { mutate: updateEquipment } = useUpdateEquipment("Office Equipment");
  const { control, handleSubmit, reset } = useForm({});

  useEffect(() => {
    if (userData) {
      reset({
        ...userData,
        equipmentName: userData?.equipmentNameId?.equipmentName,
        brandId: userData?.brandId?._id,
        serialNumber: userData?.serialNumber,
        price: userData?.price,
        quantity: userData?.quantity,
        currentStatus: userData?.currentStatus,
        dateOfPurchase: userData?.dateOfPurchase,
        createdAt: new Date(userData.createdAt).toLocaleDateString("en-GB"),
      });
    }
  }, [userData, reset]);

  const onSubmit = (formData) => {
    const payload = {
      equipmentNameId: equipmentId,
      brandId:formData.brandId,
      serialNumber: formData.serialNumber,
      price: formData.price,
      quantity: formData.quantity,
      dateOfPurchase: formData.dateOfPurchase
      ? format(new Date(formData.dateOfPurchase), "yyyy-MM-dd")
      : "",
    };

    updateEquipment(
      { id, data: payload },
      {
        onSuccess: () => {
          toast.success("Equipment updated successfully");
          navigate("/admin/officeEquipment");
        },
        onError: (error) => {
          const errorMessage =
            error.response?.data?.message ||
            "Failed to update the equipment. Please try again.";
          toast.error(errorMessage);
        },
      }
    );
  };

  const filteredBrands = selectedEquipment?.brands.map((brand) => ({
    label: brand.brand,
    value: brand._id,
  })) || [{ label: "none", value: "none" }];

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handlePreviousPage = () => {
    navigate("/admin/OfficeEquipment");
  };
  return (
    <div className="w-full">
      <div>
        <div>
          <CircleArrowLeft
            className="fixed cursor-pointer hover:opacity-90"
            onClick={handlePreviousPage}
          />
        </div>
        <div className="ml-8 text-lg font-medium text-slate-700">
          Edit Equipment
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-1 mt-4 lg:gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            <InputWithLabel
              type="text"
              id="equipmentName"
              label="Equipment Name"
              control={control}
              readOnly={true}
              name="equipmentName"
              placeholder="equipment name"
              inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-56 md:w-60 lg:w-96"
            />
            <DropDown
              control={control}
              labelName={"Brand"}
              name="brandId"
              options={filteredBrands}
              defaultValue={userData?.brandId?._id}
              placeholder={userData?.brandId?.brand}
              dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-56 md:w-60 lg:w-96 hover:bg-accent hover:text-accent-foreground"
            />
            {userData?.serialNumber && (
              <InputWithLabel
                type="text"
                id="serialNumber"
                label="Serial Number"
                control={control}
                name="serialNumber"
                placeholder="serial Number"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-56 md:w-60 lg:w-96"
              />
            )}
            <InputWithLabel
              type="text"
              id="price"
              label="Price"
              control={control}
              name="price"
              placeholder="price"
              inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-56 md:w-60 lg:w-96"
            />
            <InputWithLabel
              type="text"
              id="quantity"
              label="Quantity"
              control={control}
              readOnly={true}
              name="quantity"
              placeholder="quantity"
              inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-56 md:w-60 lg:w-96"
            />
            <InputWithLabel
              type="text"
              id="currentStatus"
              label="Current Status"
              control={control}
              name="currentStatus"
              readOnly={true}
              placeholder="current status"
              inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-56 md:w-60 lg:w-96"
            />
            <DatePickerDemo
              control={control}
              label={"Date Of Purchase"}
              name="dateOfPurchase"
              placeholder="Date of Purchase"
              className="h-8 p-2 mt-2 sm:h-10 md:h-12 lg:h-14 sm:w-56 md:w-60 lg:w-96 "
            />
            <UiButton
              variant="secondary"
              type="submit"
              buttonName="Save"
              className="w-24 h-8 mt-10 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-80 lg:h-12"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOfficeEquipment;
