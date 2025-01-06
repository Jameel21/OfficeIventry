import { FormProvider, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import UiButton from "@/components/form-fields/_utils/Button";
import { toast } from "react-hot-toast";
import { useAddCategory } from "@/store/hooks/MasterHooks";
import { useGetAllBrand } from "@/store/hooks/MasterHooks";
import DropDown from "@/components/form-fields/_utils/DropDown";

const AddCategoryForm = ({ equipmentType }) => {
  const refetch = useQueryClient();

  const methods = useForm({
    defaultValues: {
      equipmentName: "",
      isSerialNumber: "",
      brandIds: [],
    },
  });
  const { handleSubmit, reset } = methods;
  const page = 1;
  const limit = 100;

  const { mutateAsync } = useAddCategory(equipmentType);
  const { data } = useGetAllBrand({ page, limit });
  const brandData = data?.brands;

  const brandOptions =
    brandData?.map((brand) => ({
      label: brand.brand,
      value: brand._id,
    })) || [];

  const serialNumberOptions = [
    {
      label: "true",
      value: true,
    },
    {
      label: "false",
      value: false,
    },
  ];

  const onSubmitForm = async (data) => {
    const formData = {
      equipmentName: data.equipmentName,
      isSerialNumber: data.isSerialNumber,
      brandIds: data.brandIds,
    };
    try {
      const response = await mutateAsync(formData);
      toast.success(
        response?.data?.message || "Category was created successfully"
      );
      reset();
      refetch.refetchQueries({ queryKey: ["AllCategory"] });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Adding Category was failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="flex flex-col gap-1 mt-4">
          <InputWithLabel
            label="Equipment Name"
            type="text"
            id="equipmentName"
            name="equipmentName"
            placeholder="enter a equipment"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
          />
          <DropDown
            name="isSerialNumber"
            labelName="Serial Number"
            options={serialNumberOptions}
            placeholder="select serial number availability"
            dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
          />
          <DropDown
            name="brandIds"
            labelName="Brand"
            options={brandOptions}
            isMultiSelect={true}
            placeholder="select brand"
            dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
          />
          <UiButton
            variant="secondary"
            type="submit"
            buttonName="Save"
            className="w-24 h-8 mt-3 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-80 lg:h-12"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default AddCategoryForm;
