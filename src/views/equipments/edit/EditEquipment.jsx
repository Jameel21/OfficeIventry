import { FormProvider, useForm } from "react-hook-form";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import UiButton from "@/components/form-fields/_utils/Button";
import DropDown from "@/components/form-fields/_utils/DropDown";
import {
  useGetSingleEquipment,
  useUpdateEquipment,
} from "@/store/hooks/EquipmentsHooks";
import { CircleArrowLeft } from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { useGetEquipmentName } from "@/store/hooks/NameHooks";
import DatePickerDemo from "@/components/form-fields/_utils/DayPicker";

const EditEquipmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location.state || {};

  const equipmentType = pathname.includes("Office Equipment")
    ? "Office Equipment"
    : "Employee Equipment";

  const { data: userData } = useGetSingleEquipment(id);
  const { data: equipmentNames } = useGetEquipmentName(equipmentType);
  const { mutateAsync } = useUpdateEquipment(equipmentType);

  const methods = useForm();
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (userData) {
      reset({
        ...userData,
        equipmentName: userData?.equipmentNameId?.equipmentName,
        brandId: userData?.brandId?._id,
        serialNumber: userData?.serialNumber,
        price: userData?.price ? parseFloat(userData?.price).toFixed(2) : "",
        quantity: userData?.quantity,
        currentStatus: userData?.currentStatus,
        dateOfPurchase: userData?.dateOfPurchase,
        createdAt: new Date(userData.createdAt).toLocaleDateString("en-GB"),
      });
    }
  }, [userData, reset]);

  const onSubmit = async (formData) => {
    const formattedPrice = formData.price
      ? parseInt(formData.price).toString()
      : "";
    console.log("formattedPrice", formattedPrice);
    const payload = {
      equipmentNameId: userData?.equipmentNameId?._id,
      brandId: formData.brandId,
      serialNumber: formData.serialNumber,
      price: formattedPrice,
      quantity: formData.quantity,
      dateOfPurchase: formData.dateOfPurchase
        ? format(new Date(formData.dateOfPurchase), "yyyy-MM-dd")
        : "",
    };

    try {
      const response = await mutateAsync({ id, data: payload });
      toast.success(
        response?.data?.message || "Equipment updated successfully"
      );
      navigate(`/admin/${equipmentType.replace(" ", "").toLowerCase()}`);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update equipment.";
      toast.error(errorMessage);
    }
  };

  const filteredBrands = equipmentNames
    ?.find((e) => e._id === userData?.equipmentNameId?._id)
    ?.brands.map((brand) => ({ label: brand.brand, value: brand._id })) || [
    { label: "none", value: "none" },
  ];

  return (
    <div className="w-full">
      <CircleArrowLeft
        className="fixed cursor-pointer hover:opacity-90"
        onClick={() =>
          navigate(`/admin/${equipmentType.replace(" ", "").toLowerCase()}`)
        }
      />
      <div className="ml-8 text-lg font-medium text-slate-700">
        Edit {equipmentType}
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-1 mt-4 lg:gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            <InputWithLabel
              type="text"
              id="equipmentName"
              label="Equipment"
              readOnly={true}
              name="equipmentName"
              placeholder="Equipment name"
              inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
            />
            <DropDown
              labelName={"Brand"}
              name="brandId"
              options={filteredBrands}
              placeholder={userData?.brandId?.brand}
              dropDownMenuClassName={"sm:w-64 md:w-72 lg:w-80"}
              dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
            />
            {userData?.serialNumber && (
              <InputWithLabel
                type="text"
                id="serialNumber"
                label="Serial number"
                name="serialNumber"
                placeholder="Serial Number"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
              />
            )}
            <InputWithLabel
              type="number"
              id="price"
              label="Price"
              name="price"
              placeholder="Price"
              inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
            />
            {userData && (
              <InputWithLabel
                type="text"
                id="quantity"
                label="Quantity"
                readOnly={!!userData?.serialNumber}
                name="quantity"
                placeholder="Quantity"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
              />
            )}
            <InputWithLabel
              type="text"
              id="currentStatus"
              label="Current status"
              name="currentStatus"
              readOnly={true}
              placeholder="Current status"
              inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
            />
            <DatePickerDemo
              label="Date of purchase"
              name="dateOfPurchase"
              placeholder="Date of Purchase"
              disableAfterToday
              className="h-8 p-2 mt-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 "
            />
            <UiButton
              variant="secondary"
              type="submit"
              buttonName="Save"
              className="w-24 h-8 mt-10 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-80 lg:h-12"
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditEquipmentForm;
