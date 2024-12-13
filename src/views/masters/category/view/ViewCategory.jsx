import { useNavigate, useParams } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import { useGetCategory } from "@/store/hooks/MasterHooks";
import DropDown from "@/components/form-fields/_utils/DropDown";

const ViewCategory = () => {
  const { id } = useParams();
  const { control, reset } = useForm({});
  const navigate = useNavigate();

  const { data: categoryData } = useGetCategory(id);

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

  const handlePreviousPage = () => {
    navigate("/admin/category");
  };

  const brandOptions = categoryData?.brands?.map((brand) => ({
    label: brand.brand,
    value: brand._id,
  }));

  return (
    <div>
      <div className="flex gap-4">
        <CircleArrowLeft
          className="w-4 h-4 mt-1 cursor-pointer md:w-5 md:h-5 hover:opacity-90"
          onClick={handlePreviousPage}
        />
        <h1 className="text-lg font-medium text-center sm:text-start text-slate-700">
          View Category
        </h1>
      </div>
      <form className="mt-4">
        <InputWithLabel
          label="Equipment Name"
          type="text"
          id="equipmentName"
          control={control}
          name="equipmentName"
          placeholder="equipment name"
          readOnly={true}
          inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
        />
        <InputWithLabel
          label="Total Quantity"
          type="text"
          id="totalQuantity"
          control={control}
          name="totalQuantity"
          placeholder="total quantity"
          readOnly={true}
          inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
        />
        <InputWithLabel
          label="Serial Number Availability"
          type="text"
          id="isSerialNumber"
          control={control}
          name="isSerialNumber"
          placeholder="serial number availability"
          readOnly={true}
          inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
        />
        <InputWithLabel
          label="Created At"
          type="text"
          id="createdAt"
          control={control}
          name="createdAt"
          placeholder="created at"
          readOnly={true}
          inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
        />
        <DropDown
          control={control}
          name="brands"
          labelName="Brand"
          options={brandOptions}
          isReadOnly={true}
          placeholder="Available Brand"
          dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
        />
      </form>
    </div>
  );
};

export default ViewCategory;
