import { useEffect } from "react";
import { CircleArrowLeft } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetCategory, useUpdateCategory } from "@/store/hooks/MasterHooks";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import DropDown from "@/components/form-fields/_utils/DropDown";
import UiButton from "@/components/form-fields/_utils/Button";
import { useGetAllBrand } from "@/store/hooks/MasterHooks";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const EditCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const refetch = useQueryClient();
  const { id } = useParams();

  const methods = useForm({
    defaultValues: {
      brandIds: [],
    },
  });
  const { handleSubmit, reset } = methods;

  const page = 1;
  const limit = 100;

  const { data: categoryData } = useGetCategory(id);

  const { mutateAsync } = useUpdateCategory();
  const { data } = useGetAllBrand({ page, limit });
  const brandData = data?.brands;

  const selectedCategory =
    location.state?.selectedCategory || "Employee Equipment";

  useEffect(() => {
    if (categoryData) {
      const selectedBrands = categoryData?.brands?.map((brand) => 
        brand._id,
      );
      reset({
        equipmentName: categoryData?.equipmentName,
        totalQuantity: categoryData?.totalQuantity,
        isSerialNumber: categoryData?.isSerialNumber,
        brandIds: selectedBrands,
        createdAt: new Date(categoryData.createdAt).toLocaleDateString("en-GB"),
      });
    }
  }, [categoryData, reset]);


  const getDropdownOptions = () => {
    // Extract selected brands from categoryData
    const selectedBrandIds =
      categoryData?.brands?.map((brand) => brand._id) || [];

    // Filter out already selected brands from brandData
    const unselectedBrands =
      brandData?.filter((brand) => !selectedBrandIds.includes(brand._id)) || [];

    // Map both selected and unselected brands into the format required for the dropdown
    const selectedBrands =
      categoryData?.brands?.map((brand) => ({
        label: brand.brand,
        value: brand._id,
        isSelected: true, // Mark as selected
      })) || [];

    const availableBrands = unselectedBrands.map((brand) => ({
      label: brand.brand,
      value: brand._id,
      isSelected: false, // Mark as not selected
    }));

    // Combine selected and available brands, ensuring selected brands appear first
    return [...selectedBrands, ...availableBrands];
  };

  const newBrandOptions = getDropdownOptions();

  const onSubmit = async (formData) => {
    const payload = {
      equipmentName: formData.equipmentName,
      brandIds: formData.brandIds,
      isSerialNumber: formData.isSerialNumber,
    };

    try {
      const response = await mutateAsync({ id, data: payload });
      toast.success(response?.data?.message || "Category updated successfully");
      refetch.refetchQueries({ queryKey: ["Category"] });
      navigate("/admin/Category", {
        state: { equipmentType: selectedCategory },
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update the category. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handlePreviousPage = () => {
    navigate("/admin/Category", {
      state: { equipmentType: selectedCategory },
    });
  };

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

  return (
    <div>
      <div className="flex gap-4">
        <CircleArrowLeft
          className="w-4 h-4 mt-1 cursor-pointer md:w-5 md:h-5 hover:opacity-90"
          onClick={handlePreviousPage}
        />
        <h1 className="text-lg font-medium text-center sm:text-start text-slate-700">
          Edit Category
        </h1>
      </div>

      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputWithLabel
            label="Equipment Name"
            type="text"
            id="equipmentName"
            name="equipmentName"
            placeholder="Equipment name"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
          />
          <DropDown
            name="isSerialNumber"
            labelName="Serial Number"
            options={serialNumberOptions}
            placeholder="Serial number availability"
            dropDownMenuClassName={"sm:w-64 md:w-72 lg:w-80"}
            dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
          />
          <DropDown
            name="brandIds"
            labelName="Add New Brand"
            options={newBrandOptions}
            isMultiSelect={true}
            placeholder="Select a brand"
            dropDownMenuClassName={"sm:w-64 md:w-72 lg:w-80"}
            dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
          />
          <UiButton
            variant="secondary"
            buttonName="save"
            className="w-20 h-8 mt-4 cursor-default sm:w-24 sm:h-7 md:w-28 md:h-8 lg:w-32 lg:h-10"
          ></UiButton>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditCategory;
