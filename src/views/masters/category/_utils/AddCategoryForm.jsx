import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import UiButton from "@/components/form-fields/_utils/Button";
import { toast } from "react-hot-toast";
import { useAddCategory } from "@/store/hooks/MasterHooks";
import { useGetAllBrand } from "@/store/hooks/MasterHooks";
import DropDown from "@/components/form-fields/_utils/DropDown";
import { categorySchema } from "@/utils/validationSchema";
import { useNavigate } from "react-router-dom";

const AddCategoryForm = ({ equipmentType }) => {
  const refetch = useQueryClient();
  const navigate = useNavigate()
  const methods = useForm({
    defaultValues: {
      equipmentName: "",
      isSerialNumber: "",
      brandIds: [],
    },
    resolver: yupResolver(categorySchema),
  });
  const { handleSubmit, reset, formState: { isSubmitting }, } = methods;
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
      label: "Yes",
      value: true,
    },
    {
      label: "No",
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
      refetch.refetchQueries({ queryKey: ["AllCategory"] });
      navigate("/admin/category",{ state: { equipmentType } });
      reset();
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
        <div className="flex flex-col gap-4 mt-4">
          <InputWithLabel
            label="Equipment Name"
            type="text"
            id="equipmentName"
            name="equipmentName"
            placeholder="Enter the equipment name"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
          />
          <DropDown
            name="isSerialNumber"
            labelName="Serial Number"
            options={serialNumberOptions}
            placeholder="Select serial number availability"
            dropDownMenuClassName={"sm:w-64 md:w-72 lg:w-80"}
            dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
          />
          <DropDown
            name="brandIds"
            labelName="Brand"
            options={brandOptions}
            isMultiSelect={true}
            placeholder="Select brand"
            dropDownMenuClassName={"sm:w-64 md:w-72 lg:w-80"}
            dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
          />
          <UiButton
            variant="secondary"
            type="submit"
            buttonName="Save"
            isSubmitting={isSubmitting}
            className="w-24 h-8 mt-3 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-80 lg:h-12"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default AddCategoryForm;
