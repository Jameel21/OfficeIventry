import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import { useGetCategory } from "@/store/hooks/MasterHooks";

const ViewCategory = () => {
  const { id } = useParams();
  const location = useLocation();
  const methods = useForm();
  const { reset } = methods;
  const navigate = useNavigate();

  const { data: categoryData } = useGetCategory(id);

  useEffect(() => {
    if (categoryData) {
      reset({
        equipmentName: categoryData?.equipmentName,
        totalQuantity: categoryData?.totalQuantity,
        isSerialNumber: categoryData?.isSerialNumber,
        brands:categoryData?.brands?.map((brand) => 
          brand.brand,
         ),
        createdAt: new Date(categoryData.createdAt).toLocaleDateString("en-GB"),
      });
    }
  }, [categoryData, reset]);

  const handlePreviousPage = () => {
    const selectedCategory =
      location.state?.selectedCategory || "Employee Equipment";
    navigate("/admin/category", {
      state: { equipmentType: selectedCategory },
    });
  };

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

      <FormProvider {...methods}>
        <form className="mt-4">
          <InputWithLabel
            label="Equipment Name"
            type="text"
            id="equipmentName"
            name="equipmentName"
            placeholder="equipment name"
            readOnly={true}
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
          />
          <InputWithLabel
            label="Total Quantity"
            type="text"
            id="totalQuantity"
            name="totalQuantity"
            placeholder="total quantity"
            readOnly={true}
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
          />
          <InputWithLabel
            label="Serial Number Availability"
            type="text"
            id="isSerialNumber"
            name="isSerialNumber"
            placeholder="serial number availability"
            readOnly={true}
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
          />
          <InputWithLabel
            label="Created At"
            type="text"
            id="createdAt"
            name="createdAt"
            placeholder="created at"
            readOnly={true}
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
          />
          <InputWithLabel
            label="Brand"
            type="text"
            id="createdAt"
            name="brands"
            placeholder="created at"
            readOnly={true}
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default ViewCategory;
