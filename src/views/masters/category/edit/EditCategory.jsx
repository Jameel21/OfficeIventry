import { useEffect } from "react";
import { CircleArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCategory, useUpdateCategory } from "@/store/hooks/MasterHooks";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import DropDown from "@/components/form-fields/_utils/DropDown";
import UiButton from "@/components/form-fields/_utils/Button";
import { useGetAllBrand } from "@/store/hooks/MasterHooks";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const EditCategory = () => {
  const navigate = useNavigate();
  const refetch = useQueryClient();
  const { id } = useParams();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      brandIds: [],
    },
  });

  const page = 1;
  const limit = 100;

  const { data: categoryData } = useGetCategory(id);
  
  const { mutate: updateCategory } = useUpdateCategory();
  const { data } = useGetAllBrand({ page, limit });
  const brandData = data?.brands;

  useEffect(() => {
    if (categoryData) {
      reset({
        equipmentName: categoryData?.equipmentName,
        totalQuantity: categoryData?.totalQuantity,
        isSerialNumber: categoryData?.isSerialNumber,
        createdAt: new Date(categoryData.createdAt).toLocaleDateString("en-GB"),
      });
    }
  }, [categoryData, reset]);

  const onSubmit = (formData) => {
    const payload = {
      equipmentName: formData.equipmentName,
      brandIds: formData.brandIds,
      isSerialNumber: formData.isSerialNumber
    };

    updateCategory(
      { id, data: payload },
      {
        onSuccess: () => {
          toast.success("Category updated successfully");
          refetch.refetchQueries({ queryKey: ["Category"] });
          navigate("/admin/category");
        },
        onError: (error) => {
          const errorMessage =
            error.response?.data?.message ||
            "Failed to update the category. Please try again.";
          toast.error(errorMessage);
        },
      }
    );
  };

  const handlePreviousPage = () => {
    navigate("/admin/Category");
  };
  
  const serialNumberOptions = [
    {
      label:"true",
      value: true
    },
    {
      label:"false",
      value: false
    }
  ]

  const newBrandOptions =
    brandData?.map((brand) => ({
      label: brand.brand,
      value: brand._id,
    })) || [];

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
      <form
        className="flex flex-col gap-4 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputWithLabel
          label="Equipment Name"
          type="text"
          id="equipmentName"
          control={control}
          name="equipmentName"
          placeholder="equipment name"
          inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
        />
        <DropDown
          control={control}
          name="isSerialNumber"
          labelName="Serial Number"
          options={serialNumberOptions}
          placeholder="select serial num"
          dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14  sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
        />
        <DropDown
          control={control}
          name="brandIds"
          labelName="Add New Brand"
          options={newBrandOptions}
          isMultiSelect={true}
          placeholder="select  a brand"
          dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
        />
        <UiButton
          variant="secondary"
          buttonName="save"
          className="w-20 h-8 mt-4 cursor-default sm:w-24 sm:h-7 md:w-28 md:h-8 lg:w-32 lg:h-10"
        ></UiButton>
      </form>
    </div>
  );
};

export default EditCategory;
